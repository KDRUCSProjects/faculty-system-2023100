const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/config');
const { Token, TempToken } = require('../models');
const { tokenTypes } = require('../config/tokens');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

/**
 * find temp token by value
 * @param {Number} token
 * @returns {Promise<Object>}
*/
const findTempTokenByValue = (token) => {
  return TempToken.findOne({ where: { token } });
};

/**
 * generate six digits pin
 * @returns {Promise<Number>}
*/
const generatePin = () => {
  const pin = Math.ceil(Math.random() * 1000000);
  if (pin.toString().length < 6 || pin.toString().length > 6) {
    return generatePin();
  }
  return pin
};


/**
 * create temporary token
 * @returns {Promise<Object>}
*/
const createTemporaryToken = async () => {
  const pin = generatePin();
  const date = moment().add(3, 'hours');
  const databaseToken = await findTempTokenByValue(pin);
  if (databaseToken) {
    return createTemporaryToken();
  }
  return TempToken.create({ token: pin, expiresIn: date });
};

/**
 * delete temporary token by value
 * @param {Object} token
 * @returns {Promise<Object>}
 */
const deleteTemporaryToken = (token) => {
  if (token instanceof TempToken) return token.destroy();
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong try again');
};


/**
 * get Temp Token
 * @param {Number} userToken
 * @returns {Promise<Object>}
 */
const getTempToken = async (userToken) => {
  const token = await findTempTokenByValue(userToken);
  if (!token) throw new ApiError(httpStatus.NOT_FOUND, 'Token Not Found');
  if (moment() >= token.expiresIn) {
    await deleteTemporaryToken(token)
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Token is Expired');
  }
  return token;
};



/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);

  const tokenDoc = await Token.findOne({ where: { token, type, user: payload.sub, blacklisted: false } });
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);
  await saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

module.exports = {
  saveToken,
  verifyToken,
  getTempToken,
  generateToken,
  generateAuthTokens,
  createTemporaryToken,
  deleteTemporaryToken,
};
