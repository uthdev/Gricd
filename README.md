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

METHOD |  RESOURCE   |     DESCRIPTION                | ENDPOINTS
-------|-------------|--------------------------------|-----------
GET    | ----        | Home page                      |`/`
POST   | books       | Create a books                 |`/books`
GET    | books       | Get all books                  |`/books`
PUT    | books       | Update a books                 |`/books/:bookId`
GET    | books       | Get a single books             |`/books/:bookId`
DELETE | books       | Delete a product               |`/books/:bookId`
POST   | category    | Create a category              |`/categories`
GET    | category    | Get categories                 |`/categories`
GET    | category    | Get a category                 |`/categories/:categoryId`
GET    | category    | Get category books             |`/categories/:categoryId/books`
PATCH  | category    | edit a category                |`/categories/:categoryId`
DELETE | category    | Delete a category              |`/categories/:categoryId`
POST   | User        | User signup                    |`/auth/signup`
POST   | User        | User signin                    |`/auth/login`

---

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

#### Assumptions

- I assumed that a book belongs to only one category
- I assumed that a category has many books

## Author

Adeleke Gbolahan Uthman
