# EPIC MAIL (EXPRESS & VANILLA JAVASCRIPT)

A full-stack web application that helps people exchange information over the internet.

![Build](https://github.com/placideirandora/epic-mail-with-express-and-vanilla-js/actions/workflows/node.js.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/placiderapson/epic-mail-with-express-and-vanilla-js/badge.svg?branch=develop)](https://coveralls.io/github/placiderapson/epic-mail-with-express-and-vanilla-js?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/a61f7603ea417e3c497a/maintainability)](https://codeclimate.com/github/placideirandora/epic-mail-with-express-and-vanilla-js/maintainability)

## SOFTWARE TECHNOLOGIES

- **HTML + CSS + JS** - UI

- **NodeJS** - JavaScript Run-time Environment
- **ExpressJS** - Web Framework

- **Mocha and Chai** - Test Framework And Assertion Library

- **Travis-CI** - Continuous Integration Testing

- **Coveralls** - Continuous Integration Test Coverage

- **Code Climate** - Continuous Integration Code Quality

- **Heroku** - Deployment. [Visit The App](https://epic-mail-ch3.herokuapp.com/)

- **GitHub Pages** - Front-End UI Hosting. [Visit The App](https://placideirandora.github.io/epic-mail/)

- **SQL** - Database Data Processing Language

- **PostgreSQL** - Database System. [Download And Install It](https://www.postgresql.org/)

## GETTING STARTED

### Clone The Project

`git clone https://github.com/placiderapson/epic-mail-with-express-and-vanilla-js`

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

## REQUEST AND RESPONSE SAMPLE

### POST auth/signup

```
{
    "status": 201,
    "success": "user registered",
    "data": [
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNwb25zZSI6eyJpZCI6NDI1LCJmaXJzdG5hbWUiOiJzb21lb25lIiwibGFzdG5hbWUiOiJzb21lb25lIiwidXNlcm5hbWUiOiJzb21lb25lIiwiZW1haWwiOiJzb21lb25lQGVwaWNtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJDNleFVENUtnUDJza3J0MzloYTdPQS5CdVZVa1E1alQvbk9na1hjeE4uNk04MFB6cXBSVUFlIiwiaXNhZG1pbiI6ZmFsc2UsInJlZ2lzdGVyZWQiOiIyMDE5LTA0LTAxVDIyOjAwOjAwLjAwMFoifSwiaWF0IjoxNTU0MjM1NjczfQ.VHgTeFNx4FRbNPENp0JY2Q6lK5cT5QaBZ-RMIH6kIag",
            "user": {
                "id": 425,
                "firstname": "someone",
                "lastname": "someone",
                "username": "someone",
                "email": "someone@epicmail.com",
                "isadmin": false,
                "registered": "2019-04-01T22:00:00.000Z"
            }
        }
    ]
}
```

### POST auth/login

```
{
    "status": 200,
    "success": "logged in",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNwb25zZSI6eyJpZCI6NDI1LCJmaXJzdG5hbWUiOiJzb21lb25lIiwibGFzdG5hbWUiOiJzb21lb25lIiwidXNlcm5hbWUiOiJzb21lb25lIiwiZW1haWwiOiJzb21lb25lQGVwaWNtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJDNleFVENUtnUDJza3J0MzloYTdPQS5CdVZVa1E1alQvbk9na1hjeE4uNk04MFB6cXBSVUFlIiwiaXNhZG1pbiI6ZmFsc2UsInJlZ2lzdGVyZWQiOiIyMDE5LTA0LTAxVDIyOjAwOjAwLjAwMFoifSwiaWF0IjoxNTU0MjM1NzI5LCJleHAiOjE1NTQyNDY1Mjl9.tE3In1DmIvG8V4x7qePcSEAlKLCUIdlCaqKCzI5XaoY",
    "data": [
        {
            "id": 425,
            "firstname": "someone",
            "lastname": "someone",
            "username": "someone",
            "email": "someone@epicmail.com",
            "isadmin": false,
            "registered": "2019-04-01T22:00:00.000Z"
        }
    ]
}
```

### POST messages

```
{
    "status": 201,
    "success": "email sent",
    "data": [
        {
            "id": 8,
            "subject": "Hello World",
            "message": "The first program in every programming language",
            "parentmessageid": 1,
            "senderemail": "someone@epicmail.com",
            "receiveremail": "fredmanzi@epicmail.com",
            "status": "sent",
            "createdon": "2019-04-01T22:00:00.000Z"
        }
    ]
}
```

### GET messages | fredmanzi@epicmail.com

```
{
    "status": 200,
    "success": "received emails retrieved",
    "data": [
        {
            "id": 2,
            "subject": "WHAT'S UP!",
            "message": "How did you do it man?!",
            "parentmessageid": 1,
            "senderemail": "emmanuelcyubahiro@epicmail.com",
            "receiveremail": "fredmanzi@epicmail.com",
            "status": "read",
            "createdon": "2019-03-26T22:00:00.000Z"
        },
        {
            "id": 8,
            "subject": "Hello World",
            "message": "The first program in every programming language",
            "parentmessageid": 1,
            "senderemail": "someone@epicmail.com",
            "receiveremail": "fredmanzi@epicmail.com",
            "status": "unread",
            "createdon": "2019-04-01T22:00:00.000Z"
        }
    ]
}
```

### GET messages/unread | fredmanzi@epicmail.com

```
{
    "status": 200,
    "success": "your unread emails retrieved",
    "data": [
        {
            "id": 8,
            "subject": "Hello World",
            "message": "The first program in every programming language",
            "parentmessageid": 1,
            "senderemail": "someone@epicmail.com",
            "receiveremail": "fredmanzi@epicmail.com",
            "status": "unread",
            "createdon": "2019-04-01T22:00:00.000Z"
        }
    ]
}
```

### GET messages/8 | fredmanzi@epicmail.com

```
{
    "status": 200,
    "success": "email retrieved",
    "data": [
        {
            "id": 8,
            "subject": "Hello World",
            "message": "The first program in every programming language",
            "parentmessageid": 1,
            "senderemail": "someone@epicmail.com",
            "receiveremail": "fredmanzi@epicmail.com",
            "status": "read",
            "createdon": "2019-04-01T22:00:00.000Z"
        }
    ]
}
```

### GET messages/sent | someone@epicmail.com

```
{
    "status": 200,
    "success": "your sent emails retrieved",
    "data": [
        {
            "id": 8,
            "subject": "Hello World",
            "message": "The first program in every programming language",
            "parentmessageid": 1,
            "senderemail": "someone@epicmail.com",
            "receiveremail": "fredmanzi@epicmail.com",
            "status": "sent",
            "createdon": "2019-04-01T22:00:00.000Z"
        }
    ]
}
```

### POST groups

```
{
    "status": 201,
    "success": "group created",
    "data": [
        {
            "id": 5,
            "name": "Developers",
            "role": "Coding"
        }
    ]
}
```

### GET groups

```
{
    "status": 200,
    "success": "groups retrieved",
    "data": [
        {
            "id": 5,
            "name": "Developers",
            "role": "Coding",
            "owner": "someone@epicmail.com"
        }
    ]
}
```

### POST groups/3/users

```
{
    "status": 201,
    "success": "group member registered",
    "data": [
        {
            "id": 3,
            "username": "fredmanzi",
            "email": "fredmanzi@epicmail.com",
            "groupid": 5
        }
    ]
}
```

### POST groups/3/messages

```
{
    "status": 201,
    "success": "group email sent",
    "data": [
        {
            "id": 3,
            "subject": "CODING",
            "message": "It is a process of telling a computer what to do.",
            "parentmessageid": 1,
            "groupid": 5,
            "createdon": "2019-04-01T22:00:00.000Z"
        }
    ]
}
```
