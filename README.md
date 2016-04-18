# Node.js User API
An API to manage a user persistence layer

## Implementation

* The API exposes a user model with the following properties: id, email, forename, surname, date created
* The following endpoints are exposed: create, read, update, delete
* Can be consumed using Google Chrome's Postman. **See repo for .postman_collection file, which can be imported by Postman**
* Industry standard data exchange format (json)
* Input is validated and sanitised
* Input validation is partially covered by unit tests (using Mocha with should.js)

## Installation

1. App dependencies - these haven't been included in the repository, but are defined in the package.json file. They can therefore be restored using NPM (npm install).
2. [MongoDB](https://www.mongodb.org/) - to allow user data to be persisted the app requires a connection to an instance of MongoDB. The local connection string is specified in the config.js file.

## Usage
To get the Node.js server running you should only need to:

1. Start the MongoDB database engine (mongod)
2. Start the Node.js server (node server.js)

Unit tests can run using 'npm test'.
