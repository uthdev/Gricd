import { Request, Response, NextFunction } from "express";

import NotFoundException from "../exceptions/NotFoundException";
import { Category } from "../models";
import BookService from "../services/book.service";

class CategoryController {
  static async getCategories(request: Request, response: Response, next: NextFunction) {
    try {
      const categories = await Category.find();
      return response.status(200).json({
        status: 200,
        data: categories
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCategory(request: Request, response: Response, next: NextFunction) {
    try {
      const category = await Category.findById(request.params.categoryId);
      if(!category)
        next(new NotFoundException('Category not found'));
      return response.status(200).json({
        status: 200,
        data: category
      });
    } catch (error) {
      next(error);
    }
  }

  static async createCategory(request: Request, response: Response, next: NextFunction) {
    try {
      const newCategory = new Category(request.body);
      const category = await newCategory.save();
      return response.status(201).json({
        status: 201,
        message: "category successfully created",
        data: category
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateCategory(request: Request, response: Response, next: NextFunction) {
    try {
      const category = await Category.findByIdAndUpdate(
        request.params.categoryId,
        request.body,
        {
          new: true,
          runValidators: true
        }
      );
      if(!category)
        next(new NotFoundException('Category not found'));
      return response.status(200).json({
        status: 200,
        message: "category successfully updated",
        data: category
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(request: Request, response: Response, next: NextFunction) {
    try {
      const category = await Category.findByIdAndDelete(request.params.categoryId);
      if(category == null) {
        return next(new NotFoundException("category not found"));
      }
      return response.status(200).json({
        status: 200,
        message: "category successfully deleted",
        data: category
      });
    } catch (error) {
      next(error);
    }
  }

  static async getBooksByCategory(request: Request, response: Response, next: NextFunction) {
    try {
      const { books, count} = await BookService.getBooksByCategory(request.params.categoryId);
      return response.status(200).json({
        status: 200,
        data: {books, count}
      });
    } catch (error) {
      next(error);
    }
  }
}

export default CategoryController;