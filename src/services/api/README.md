# Faculty Management System - Kandahar University

## Commands

Running in development:

```bash
npm run dev
```

Running in production:

```bash
npm run start
```

Docker:

````bash
# run docker container in development mode
npm run docker:dev

# run docker container in production mode
npm run docker:start


Linting:

```bash
# run ESLint
npx lint

# fix ESLint errors
npx lint:fix

# run prettier
npx prettier

# fix prettier errors
npx prettier:fix
````

## Environment Variables

The environment variables can be found and modified in the `.env` file.
To checkout environment variables examples take a look at `.env.example` file at the root directory.

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--middlewares\    # Custom express middlewares
 |--models\         # Sequelize models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # App entry point
```

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:4000/docs` in your browser. This documentation page is automatically generated using the [swagger](https://swagger.io/) definitions written as comments in the route files.

## License

[MIT](LICENSE)
