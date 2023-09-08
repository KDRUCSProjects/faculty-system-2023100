const express = require('express');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const { reportValidation } = require('../validations');
const { reportController } = require('../controllers');

const router = express.Router();

router.get('/conversion', validate(reportValidation.createConversionReport), reportController.getConversionReport);

router.get('/dbBackup', auth(), reportController.createBackup);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Report
 *   description: Get taajil, reentry reports
 */

/**
 * @swagger
 * /report/conversion:
 *   get:
 *     summary: create report excel file.
 *     description: create taajil, reentry files in excel.
 *     tags: [Report]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: semesterId
 *         required: true
 *         schema:
 *           type: string
 *         description: semesterId
 *       - in: query
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [taajil, reentry, present]
 *         description: conversion type
 *     responses:
 *       "200":
 *         description: NO CONTENT AND FILE WILL BE DOWNLOADED
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /report/dbBackup:
 *   get:
 *     summary: create database backup .
 *     description: Manual and auto database backup.  On Thursday, database will be automatically backed up.
 *     tags: [Report]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: NO CONTENT AND FILE WILL BE SAVED AT HOME-DOUCMENTS-FACULTY MS
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
