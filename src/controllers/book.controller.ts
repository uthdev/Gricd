import { Response, NextFunction } from "express";
import NotFoundException from "../exceptions/NotFoundException";

import RequestWithUser from "../interfaces/requestWithUser.interface";
import { Book, Category } from "../models";

class BookController {

  //create method createBook
  static async createBook (request: RequestWithUser, response: Response, next: NextFunction) {
    try {
      //check if category exists in database
      const category = await Category.findById(request.body.category);
      if(!category)
        next(new NotFoundException('Category not found'));
      const newBook = new Book(request.body);
      const book = await newBook.save();
      return response.status(201).json({
        status: 201,
        message: "book successfully added",
        data: book
      });
    } catch (error) {
      next(error);
    }
    
  }
  //create static method getBooks
  static async getBooks (request: RequestWithUser, response: Response, next: NextFunction) {
    try {
      const books = await Book.find();
      return response.status(200).json({
        status: 200,
        data: books
      });
    } catch (error) {
      next(error);
    }
  }

  //create static method getBook
  static async getBook (request: RequestWithUser, response: Response, next: NextFunction) {
    try {
      const book = await Book.findById(request.params.bookId);
      if(!book) 
        next(new NotFoundException("book not found"));
      return response.status(200).json({
        status: 200,
        data: book
      });
    } catch (error) {
      next(error);
    }
  }

  //create static method updateBook
  static async updateBook (request: RequestWithUser, response: Response, next: NextFunction) {
    try {
      const book = await Book.findByIdAndUpdate(request.params.bookId, request.body, {
        new: true,
        runValidators: true
      });
      if(!book) 
        next(new NotFoundException("book not found"));
      return response.status(200).json({
        status: 200,
        message: "book successfully updated",
        data: book
      });
    } catch (error) {
      next(error);
    }
  }

  //create static method deleteBook
  static async deleteBook (request: RequestWithUser, response: Response, next: NextFunction) {
    try {
      const book = await Book.findByIdAndDelete(request.params.bookId);
      if(book == null) {
        return next(new NotFoundException("book not found"));
      }
      return response.status(200).json({
        status: 200,
        message: "Book successfully deleted",
        data: book
      });
    } catch (error) {
      next(error);
    }
  }

  //create static method get books by category
  static async getBooksByCategory (request: RequestWithUser, response: Response, next: NextFunction) {
    try {
      const books = await Book.find({
        category: request.params.categoryId
      });
      return response.status(200).json({
        status: 200,
        data: books
      });
    } catch (error) {
      next(error);
    }
  }
}


export default BookController;
