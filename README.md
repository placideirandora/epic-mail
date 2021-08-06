# EPIC MAIL (EXPRESS & VANILLA JAVASCRIPT)

A full-stack web application that helps people exchange information over the internet.

![Build](https://github.com/placideirandora/epic-mail-with-express-and-vanilla-js/actions/workflows/node.js.yml/badge.svg)
[![codecov](https://codecov.io/gh/placideirandora/epic-mail-with-express-and-vanilla-js/branch/develop/graph/badge.svg?token=M98J3H0ZI9)](https://codecov.io/gh/placideirandora/epic-mail-with-express-and-vanilla-js)
[![Maintainability](https://api.codeclimate.com/v1/badges/a61f7603ea417e3c497a/maintainability)](https://codeclimate.com/github/placideirandora/epic-mail-with-express-and-vanilla-js/maintainability)

## SOFTWARE TECHNOLOGIES

- **HTML + CSS + JS** - UI

- **NodeJS** - JavaScript Run-time Environment
- **ExpressJS** - Web Framework

- **Mocha and Chai** - Test Framework And Assertion Library

- **GitHub Actions** - Continuous Integration and Delivery

- **Codecov** - Test Coverage

- **Code Climate** - Code Quality

- **Heroku** - Production Deployment

- **GitHub Pages** - UI Hosting

- **SQL** - Database Query Language

- **PostgreSQL** - Relational Database

## GETTING STARTED

### Clone The Project

`git clone https://github.com/placideirandora/epic-mail-with-express-and-vanilla-js`

### Install Required Dependencies

`npm install`

### Download And Install A Database Management System

`PostgreSQL`

### PostgreSQL Databases

`Create a PostgreSQL database called 'epic-mail' for development`

`Create a PostgreSQL database called 'epic-mail-test' for testing`

### Create A .env File In The Project Folder And Save The Following Credentials Inside

`DB_HOST = "localhost"`

`DB_USER = "postgres"`

`DB_PASSWORD = "xxxxxxxxxx"`

`DB_NAME = "epic-mail"`

`DB_NAME_TEST = "epic-mail-test"`

`DB_PORT = 5000 (custom) or 5432 (default)`

`ADMIN_FIRSTNAME = "someone"`

`ADMIN_LASTNAME = "someone"`

`ADMIN_USERNAME = "someone"`

`ADMIN_EMAIL = "someone@epicmail.com"`

`ADMIN_PASSWORD = "xxxxxxxxxx"`

`IS_ADMIN = "true"`

`SECRET_KEY = "xxxxxxxxxxx"`

### Start The Server

`npm start`

### Run Tests

`npm test`

## API ENDPOINT ROUTES

| METHOD | ROUTE                                    | DESCRIPTION                              | ACCESS  |
| ------ | ---------------------------------------- | ---------------------------------------- | ------- |
| POST   | api/v2/auth/signup                       | User Registration                        | Public  |
| POST   | api/v2/auth/login                        | User Login                               | Public  |
| GET    | api/v2/users                             | Retrieve Registered Users                | Private |
| GET    | api/v2/users/{userId}                    | Retrieve A Specific Registered User      | Private |
| DELETE | api/v2/users/{userId}                    | Delete A Specific Registered User        | Private |
| POST   | api/v2/auth/reset                        | User Password Reset                      | Public  |
| GET    | api/v2/auth/reset                        | Retrieve Users Who Reset Their Passwords | Private |
| POST   | api/v2/messages                          | Send Email                               | Private |
| GET    | api/v2/messages                          | Retrieve Received Emails                 | Private |
| GET    | api/v2/messages/{messageId}              | Retrieve A Specific Email                | Private |
| DELETE | api/v2/messages/{messageId}              | Delete A Specific Email                  | Private |
| GET    | api/v2/messages/sent                     | Retrieve Sent Emails                     | Private |
| GET    | api/v2/messages/sent/{messageId}         | Retrieve A Specific Sent Email           | Private |
| DELETE | api/v2/messages/sent/{messageId}         | Delete A Specific Sent Email             | Private |
| GET    | api/v2/messages/read                     | Retrieve Read Emails                     | Private |
| GET    | api/v2/messages/unread                   | Retrieve Unread Emails                   | Private |
| GET    | api/v2/messages/draft                    | Retrieve Draft Emails                    | Private |
| GET    | api/v2/messages/draft/{messageId}        | Retrieve A Specific Draft Email          | Private |
| DELETE | api/v2/messages/draft/{messageId}        | Delete A Specific Draft Email            | Private |
| POST   | api/v2/groups                            | Create A Group                           | Private |
| GET    | api/v2/groups                            | Retrieve Groups                          | Private |
| GET    | api/v2/groups/{groupId}                  | Retrieve A Specific Group                | Private |
| DELETE | api/v2/groups/{groupId}                  | Delete A Specific Group                  | Private |
| PATCH  | api/v2/groups/{groupId}/name             | Change A Group Name                      | Private |
| POST   | api/v2/groups/{groupId}/users            | Add A Group Member                       | Private |
| GET    | api/v2/groups/{groupId}/users            | Retrieve Group Members                   | Private |
| GET    | api/v2/groups/{groupId}/users/{memberId} | Retrieve A Specific Group Member         | Private |
| DELETE | api/v2/groups/{groupId}/users/{memberId} | Delete A Specific Group Member           | Private |
| POST   | api/v2/groups/{groupId}/messages         | Send A Group Message                     | Private |
| GET    | api/v2/groups/{groupId}/messages         | Retrieve Group Messages                  | Private |
