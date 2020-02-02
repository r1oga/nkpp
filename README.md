# Test driven development of a RESTFul API with authentication
## Stack
- koa
- node.js
- postgresql
- Mocha
- Chai
- Redis

## Getting started
1. Install dependencies `npm i`
2. Spin up server on port 1337: `npm start`

## Run Tests
`npm test`

## Routes
### API
|URL|HTTP Verb|Action|Authenticated
|--|--|--|--|
|/api/v1/movies|GET|Return all movies
|/api/v1/movies/:id|GET|Return one movie
|/api/v1/movies|POST|Add one movie
|/api/v1/movies/:id|PUT|Update one movie
|/api/v1/movies/:id|DELETE|Delete one movie|
|||||
|/auth/register|GET|Render registration view|No
|/auth/register|POST|Register new user|No
|/auth/login|GET|Render login view|No
|/auth/login|POST|Log user|No
|/auth/status|GET|Render status page|Yes
|/auth/logout|GET|Logout user|Yes

## Resources
From [this](https://mherman.org/blog/user-authentication-with-passport-and-koa/) tutorial from [Michael Herman](https://github.com/mjhea0).
