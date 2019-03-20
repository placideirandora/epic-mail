# EPIC MAIL
EPIC Mail helps people exchange messages/information over the internet.

[![Build Status](https://travis-ci.org/placideirandora/epic-mail.svg?branch=develop)](https://travis-ci.org/placideirandora/epic-mail)  [![Coverage Status](https://coveralls.io/repos/github/placideirandora/epic-mail/badge.svg?branch=develop)](https://coveralls.io/github/placideirandora/epic-mail?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/ffeae9beea9202ff160f/maintainability)](https://codeclimate.com/github/placideirandora/epic-mail/maintainability)





## TOOLS USED


- **JavaScript** - Programming Language

- **NodeJS** - Server Environment

- **Mocha and Chai** - Test Framework And Assertion Library

- **Travis-CI** - Continuous Integration Testing

- **Coveralls** - Continuous Integration Test Coverage

- **Code Climate** - Continuous Integration Code Quality

- **Heroku** - Deployment. [Visit The App](https://epic-mail-ch3.herokuapp.com/)

- **GIT** - Version Control System

- **GitHub Pages** - Front-End UI Hosting. [Visit The App](https://placideirandora.github.io/epic-mail/)

- **SQL** - Database Data Processing Language

- **PostgreSQL** - Database System. [Download And Install It](https://www.postgresql.org/)



## GETTING STARTED

### Clone The Project

```
$ git clone https://github.com/placideirandora/epic-mail.git
```

### Install Required Dependencies

```
$ npm install
```

### Download And Install A Database Management System

```
$ PostgreSQL 
```

### PostgreSQL Databases

```
$ Create a PostgreSQL database called 'epic-mail' for development
```

```
$ Create a PostgreSQL database called 'epic-mail-test' for testing
```

### Create A .env File In The Project Folder And Save The Following Credentials Inside

```
$ DB_HOST = "localhost"
```

```
$ DB_USER = "postgres"
```

```
$ DB_NAME = "epic-mail"
```

```
$ DB_NAME_TEST = "epic-mail-test"
```

```
$ DB_PORT = 5000 (custom) or 5432 (default)
```

```
$ DB_HOST = "localhost"
```

```
$ ADMIN_FIRSTNAME = "someone"
```

```
$ ADMIN_LASTNAME = "someone" 
```

```
$ ADMIN_EMAIL = "someone@epicmail.com" 
```

```
$ ADMIN_PASSWORD = "*xxxxxxxxxx"  
```

```
$ IS_ADMIN = "true"
```

```
$ SECRET_KEY = "xxxxxxxxxxx"
```

### Start The Server

```
$ npm start
```

### Run Tests

```
$ npm test
```

## API ENDPOINT ROUTES

| METHOD | ROUTE | DESCRIPTION | ACCESS |
|--------|----------------|-------------|-----------------|
|  POST  | api/v2/auth/signup | User Registration | Public |
|  POST  | api/v2/auth/login  | User Login | Public |
|  GET  | api/v2/users | Retrieve Registered Users | Private |
|  GET  | api/v2/users/{userId}  | Retrieve A Specific Registered User | Private |
|  DELETE  | api/v2/users/{userId}  | Delete A Specific Registered User | Private |
|  POST  | api/v2/auth/reset | User Password Reset | Public |
|  GET  | api/v2/auth/reset  | Retrieve Users Who Reset Their Passwords | Private |
|  POST   | api/v2/messages | Send Email | Private |
|  GET   | api/v2/messages | Retrieve Received Emails | Private |
|  GET   | api/v2/messages/{messageId} | Retrieve A Specific Email | Private |
|  DELETE | api/v2/messages/{messageId} | Delete A Specific Email | Private |
|  GET   | api/v2/messages/sent | Retrieve Sent Emails | Private |
|  GET   | api/v2/messages/read | Retrieve Read Emails | Private |
|  GET   | api/v2/messages/unread | Retrieve Unread Emails | Private |
|  GET   | api/v2/messages/draft | Retrieve Draft Emails | Private |
|  POST   | api/v2/groups | Create A Group | Private |
|  GET   | api/v2/groups | Retrieve Groups | Private |
|  GET   | api/v2/groups/{groupId} | Retrieve A Specific Group | Private |
|  DELETE   | api/v2/groups/{groupId} | Delete A Specific Group | Private |
|  PATCH   | api/v2/groups/{groupId}/name | Change A Group Name | Private |
|  POST   | api/v2/groups/{groupId}/users | Add A Group Member | Private |
|  GET   | api/v2/groups/{groupId}/users | Retrieve Group Members | Private |
|  GET   | api/v2/groups/{groupId}/users/{memberId} | Retrieve A Specific Group Member | Private |
|  DELETE   | api/v2/groups/{groupId}/users/{memberId} | Delete A Specific Group Member | Private |
|  POST   | api/v2/groups/{groupId}/messages | Send A Group Message | Private |
|  GET   | api/v2/groups/{groupId}/messages | Retrieve Group Messages | Private |



## REQUEST AND RESPONSE SAMPLE

### POST auth/signup

```
{
  "status": 201,
  "success": "user registered",
  "data": [
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNwb25zZSI6eyJpZCI6MTgsImZpcnN0bmFtZSI6InNvbWVvbmVsc2UiLCJsYXN0bmFtZSI6InNvbWVvbmVsc2UiLCJlbWFpbCI6InNvbWVvbmVsc2VAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkZ3pmU2pHQ3JBWldNcXp2VnV0V1hjdW1SWmRyajNBbTBNbHhWQ0dxcno5WGkzOUVsR0tQNDYiLCJpc2FkbWluIjpmYWxzZSwicmVnaXN0ZXJlZCI6IjIwMTktMDMtMTlUMDA6MDA6MDAuMDAwWiJ9LCJpYXQiOjE1NTMwMDQ4Nzd9.AcQCo1E10_ASqKEKruchDEK3tRIVwC9drZVDgMh6jRc",
      "user": {
        "id": 18,
        "firstname": "someonelse",
        "lastname": "someonelse",
        "email": "someonelse@gmail.com",
        "isadmin": false,
        "registered": "2019-03-19T00:00:00.000Z"
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
  "data": [
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNwb25zZSI6eyJpZCI6MTgsImZpcnN0bmFtZSI6InNvbWVvbmVsc2UiLCJsYXN0bmFtZSI6InNvbWVvbmVsc2UiLCJlbWFpbCI6InNvbWVvbmVsc2VAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkZ3pmU2pHQ3JBWldNcXp2VnV0V1hjdW1SWmRyajNBbTBNbHhWQ0dxcno5WGkzOUVsR0tQNDYiLCJpc2FkbWluIjpmYWxzZSwicmVnaXN0ZXJlZCI6IjIwMTktMDMtMTlUMDA6MDA6MDAuMDAwWiJ9LCJpYXQiOjE1NTMwMDQ5NzYsImV4cCI6MTU1MzAxNTc3Nn0._kSiN_cAXacgafWZhv65gL7a9HIZai_abWnBCZaXzNQ",
      "data": {
        "id": 18,
        "firstname": "someonelse",
        "lastname": "someonelse",
        "email": "someonelse@gmail.com",
        "isadmin": false,
        "registered": "2019-03-19T00:00:00.000Z"
      }
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
      "id": 2,
      "subject": "Hello World",
      "message": "The first program in every programming language",
      "parentmessageid": 1,
      "senderid": 18,
      "receiverid": 2,
      "status": "read",
      "createdon": "2019-03-19T00:00:00.000Z"
    }
  ]
}
```

### GET messages

```
{
  "status": 200,
  "success": "emails retrieved",
  "data": [
    {
      "id": 2,
      "subject": "Hello World",
      "message": "The first program in every programming language",
      "parentmessageid": 1,
      "senderid": 18,
      "receiverid": 2,
      "status": "read",
      "createdon": "2019-03-19T00:00:00.000Z"
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
      "id": 3,
      "name": "Group 1",
      "role": "Studying Computer Programming"
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
      "id": 3,
      "name": "Group 1",
      "role": "Studying Computer Programming",
      "owner": 18
    }
  ]
}
```

### PATCH groups/3/name

```
{
  "status": 200,
  "success": "group name changed",
  "data": {
    "id": 3,
    "name": "Group One",
    "role": "Studying Computer Programming"
  }
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
      "firstname": "ibelongtosomeone",
      "lastname": "ibelongtosomeone",
      "role": "programming",
      "groupid": 3
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
      "id": 2,
      "subject": "CODING",
      "message": "It is a process of telling a computer what to do.",
      "parentmessageid": 1,
      "status": "sent",
      "groupid": 3,
      "createdon": "2019-03-19T00:00:00.000Z"
    }
  ]
}
```


## DEVELOPER

Placide IRANDORA

## COPYRIGHT

&copy; 2019 Placide IRANDORA
