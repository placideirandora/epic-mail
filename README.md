# EPIC MAIL
EPIC Mail helps people exchange messages/information over the internet.

[![Build Status](https://travis-ci.org/placideirandora/epic-mail.svg?branch=develop)](https://travis-ci.org/placideirandora/epic-mail)  [![Coverage Status](https://coveralls.io/repos/github/placideirandora/epic-mail/badge.svg?branch=develop)](https://coveralls.io/github/placideirandora/epic-mail?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/ffeae9beea9202ff160f/maintainability)](https://codeclimate.com/github/placideirandora/epic-mail/maintainability)





## TOOLS USED

### Programming Language

```
JavaScript
```

### Server Environment

```
NodeJS
```

### Test Framework And Assertion Library

```
Mocha and Chai
```

### Continuous Integration Testing

```
Travis-CI
```

### Continuous Integration Test Coverage

```
Coveralls
```

### Continuous Integration Code Quality

```
Code Climate
```

### API 

```
Representational State Transfer, REST 
```

### Data Structure

```
Array 
```

### Data Transfer and Storage Format

```
JavaScript Object Notation, JSON
```

### Deployment

```
Heroku 
```

```
URL: http://epic-mail-ch2.herokuapp.com
```


## GETTING STARTED

### Install Required Dependencies

```
$ npm install
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

| METHOD | ROUTE | DESCRIPTION |
|--------|----------------|-------------|
|  POST  | api/v1/auth/signup | User Registration |
|  POST  | api/v1/auth/login  | User Login |
|  POST   | api/v1/messages | Send Email |
|  GET   | api/v1/messages | Retrieve Received Emails | 
|  GET   | api/v1/messages | Retrieve A Specific Email |
|  DELETE | api/v1/messages | Delete A Specific Email |
|  GET   | api/v1/messages/sent | Retrieve Sent Emails |
|  GET   | api/v1/messages/sent | Retrieve Read Emails |


## REQUEST AND RESPONSE SAMPLE

### POST auth/signup/

```
{
    "status": 201,
    "success": "user registered",
    "data": [
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjo2LCJpYXQiOjE1NTE5MTU2MDF9.XGnpZtUlTgJ_4Q3B-3JwsG_wNARh1YFKW9Mtj99K0ec",
            "user": {
                "id": 6,
                "firstname": "Emmanuel",
                "lastname": "CYUBAHIRO",
                "email": "emmanuelcyubahiro@gmail.com",
                "password": "$2a$10$1OWYPqDkencaQbiaNQOo.e.xwpuav5GFLTARxiSDOqA3gGwPyvhr6"
            }
        }
    ]
}
```

### POST auth/login/

```
{
    "status": 200,
    "success": "logged in",
    "data": [
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJmaXJzdG5hbWUiOiJFbW1hbnVlbCIsImxhc3RuYW1lIjoiQ1lVQkFISVJPIiwiZW1haWwiOiJlbW1hbnVlbGN5dWJhaGlyb0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRjNHgucDdLZ0czRWFhOWZHN0xVZVJPSGduLkdVUXY0QkdiZUx5SHp6MnlnQjB3d3hhODRwaSJ9LCJpYXQiOjE1NTE5MTU2ODIsImV4cCI6MTU1MTkxOTI4Mn0.tBE20pXWsTCYFeAPJf7EOh_7TGbmU6W7Gd5mBfrUNRc",
            "firstname": "Emmanuel",
            "lastname": "CYUBAHIRO",
            "email": "emmanuelcyubahiro@gmail.com"
        }
    ]
}
```

### POST messages/

```
{
    "status": 201,
    "success": "email sent",
    "data": [
        {
            "id": 4,
            "createdOn": "March 7, 2019",
            "subject": "Hello World",
            "message": "The first program in every programming language",
            "senderId": 2,
            "receiverId": 3,
            "parentMessageId": "4",
            "status": "sent"
        }
    ]
}
```

### GET messages/

```
{
    "status": 200,
    "success": "received emails retrieved",
    "data": [
        {
            "id": 1,
            "createdOn": "February 20, 2019",
            "subject": "Hello",
            "message": "How have you been?",
            "senderId": 2,
            "receiverId": 1,
            "parentMessageId": 1,
            "status": "sent"
        },
        {
            "id": 2,
            "createdOn": "February 24, 2019",
            "subject": "Hi",
            "message": "Have a good time!",
            "senderId": 3,
            "receiverId": 2,
            "parentMessageId": 2,
            "status": "draft"
        },
        {
            "id": 3,
            "createdOn": "February 28, 2019",
            "subject": "Greetings",
            "message": "You are invited to the party",
            "senderId": 1,
            "receiverId": 3,
            "parentMessageId": 3,
            "status": "read"
        },
        {
            "id": 4,
            "createdOn": "March 7, 2019",
            "subject": "Hello World",
            "message": "The first program in every programming language",
            "senderId": 2,
            "receiverId": 3,
            "parentMessageId": "4",
            "status": "sent"
        }
    ]
}
```

### GET messages/2

```
{
    "status": 200,
    "success": "email retrieved",
    "data": [
        {
            "id": 2,
            "createdOn": "February 24, 2019",
            "subject": "Hi",
            "message": "Have a good time!",
            "senderId": 3,
            "receiverId": 2,
            "parentMessageId": 2,
            "status": "draft"
        }
    ]
}
```

### DELETE messages/3

```
{
    "status": 200,
    "success": "email deleted"
}
```

### GET messages/sent

```
{
    "status": 200,
    "success": "sent emails retrieved",
    "data": [
        [
            {
                "id": 1,
                "createdOn": "February 20, 2019",
                "subject": "Hello",
                "message": "How have you been?",
                "senderId": 2,
                "receiverId": 1,
                "parentMessageId": 1,
                "status": "sent"
            },
            {
                "id": 4,
                "createdOn": "March 7, 2019",
                "subject": "Hello World",
                "message": "The first program in every programming language",
                "senderId": 2,
                "receiverId": 3,
                "parentMessageId": "4",
                "status": "sent"
            }
        ]
    ]
}
```

### GET messages/read

```
{
    "status": 400,
    "success": "no read emails found"
}
```


## DEVELOPER

Placide IRANDORA

## COPYRIGHT

&copy; 2019 Placide IRANDORA
