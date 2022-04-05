# Gricd

A book API

---

## Features

- User can Sign Up.
- User can Sign in.
- User can create a book.
- User can get books.
- User can read a book.
- User can update a book.
- User can delete a book.
- User can get books by category.
- User can create category.
- User can get categories.
- User can update category.
- User can delete category.
- User can get category.

---

---

## Backend

The api is hosted on [Heroku](https://uthdev-gricd.herokuapp.com/)

---

## Documentation

The api is documented with [Postman](https://documenter.getpostman.com/view/6265858/UVkjwyJB)

---

## Technologies Used

- Node.js
- Express.js
- Mongodb
- ESLint
- Mongoose
- Heroku
- Typescript

---

---

## API Information

The API is hosted on [https://uthdev-gricd.herokuapp.com/](https://uthdev-gricd.herokuapp.com/)

<!-- METHOD |  RESOURCE   |     DESCRIPTION                | ENDPOINTS
-------|-------------|--------------------------------|-----------
GET    | ----        | Home page                      |`/`
POST   |             | Create a books                 |`/books  s`
GET    | books       | Get all books  s               |`/books  s/`
GET    | books       | Get pending books              |`/books  s?status=pending`
GET    | books       | Get completed books            |`/books  s?status=completed`
PATCH  | books       | Update a books                 |`/books  s/:id`
GET    | books       | Get a single books             |`/books  s/:id`
DELETE | fixture     | Delete a product               |`/fixtures/:id`
GET    | Team        | Get teams                      |`/teams`
GET    | Team        | Get a teams                    |`/teams/:id`
PATCH  | Team        | edit a team                    |`/teams/:id`
POST   | Team        | Create a team                  |`/teams`
DELETE | Team        | Delete a team                  |`/teams/:id`
POST   | User/Admin  | User signup                    |`/auth/signup`
POST   | User/Admin  | User signin                    |`/auth/login`
GET    | -----       | Search teams and fixtures      |`/search?q=`

--- -->

#### Clone

- Clone this repo to your local machine using `https://github.com/uthdev/Gricd`

#### Setup

- Installing the project's dependencies:

> run the command below

```shell
npm install
```

> Then create a .env file in the root directory of the project

```shell
touch .env
```

> Then copy the content of the .env-example file in the root directory into .env file and fill in th required parameters

> To start the server, run the command below

```shell
npm start
```

---

---

## Author

Adeleke Gbolahan Uthman
