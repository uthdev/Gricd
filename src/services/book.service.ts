import { Book } from '../models'

class BookService {
  //create a static method getbooksbycategory
  static async getBooksByCategory(categoryId: string) {
    const books = await Book.find({
      category: categoryId
    })
    return {  //return the books and the count
      books,  //books
      count: books.length  //count
    }
  }

  //create a static method getBooksByAuthor
  static async getBooksByAuthor(author: string) {
    const books = await Book.find({
      author
    })

    return {
      books,
      count: books.length
    }
  }
}

export default BookService;