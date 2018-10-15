# Movie Search Engine

The Movie Search Engine (MSE) App is a full stack web app developed with [Node.js](https://nodejs.org/en/download/). It is currently deployed to as a [Heroku app](https://dry-wildwood-46109.herokuapp.com/), please create an account and try it out for yourself. The MSE provides user accounts and keeps a record of user searches. Cookies are encrypted as well as user passwords with [cryptr](https://www.npmjs.com/package/cryptr) and [bcrypt.js](https://www.npmjs.com/package/cryptr), respectively.

## Getting Started

First time setup:
```bash
npm install
npm run db:create
npm run db:reset
npm run start
```
Navigate to ```https://localhost:3000/``` to view the application.

### Prerequisites

The MSE requires a SQL database and was built with [postgresql](https://www.postgresql.org/). Please ensure you have a running SQL service.

In addition, the client needs to be running a browser that supports [fetch](https://caniuse.com/#search=fetch) as this is the method for preforming calls to the webserver.

## Running the tests

If you wish to run the testing suite, run the following:

```bash
npm install
npm run test:db:create
npm run test:db:reset
npm run start:dev
```

Once the server is up and running, you can run all tests, just the database queries tests or just the app functionality tests:

```bash
npm run test
npm run test:queries
npm run test:app
```

## Deployment

If you wish to deploy this application to Heroku, be sure to have your own DATABASE_URL in place in your own .env file.

## Built With

* [Node.js](https://nodejs.org/en/download/) - Javascript runtime engine
* [NPM](https://www.npmjs.com/) - Dependency Management
* [Postgresql](https://www.postgresql.org/) - Database service
* [bcryptjs](https://www.npmjs.com/package/cryptr) - Password hashing encryption
* [cryptr](https://www.npmjs.com/package/cryptr) - Cookie encryption
* [Bootstrap](https://getbootstrap.com/docs/4.0/getting-started/introduction/) - Front end framework
* [Express.js](http://expressjs.com/) - Back end web framework
* [Mocha / Chai](http://www.chaijs.com/) - Testing framework

## Authors

* **Ben Bracamonte** - *Initial work* - [brac](https://github.com/brac)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thanks to my wife, family and my friends for their unending support.