import { Router } from 'express';
import BookController from '../controllers/book.controller';
import validationMiddleware from '../middleware/validation.middleware';
import authMiddleware from '../middleware/auth.middleware';
import BookDto from '../dto/book.dto';
// import FundAccountDto from '../dto/fund.dto';
// import TransferDto from '../dto/transaction.dto';


const router = Router()

router.post('/', authMiddleware, validationMiddleware(BookDto), BookController.createBook);
router.get('/', BookController.getBooks);
router.get('/:bookId', BookController.getBook);
router.put('/:bookId', authMiddleware, validationMiddleware(BookDto), BookController.updateBook);
router.delete('/:bookId', authMiddleware, BookController.deleteBook);

export default router