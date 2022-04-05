import { Router } from 'express';
import CategoryController from '../controllers/category.controller';
import validationMiddleware from '../middleware/validation.middleware';
import authMiddleware from '../middleware/auth.middleware';
import CategoryDto from '../dto/category.dto';
// import FundAccountDto from '../dto/fund.dto';
// import TransferDto from '../dto/transaction.dto';


const router = Router()

router.post('/', authMiddleware, validationMiddleware(CategoryDto), CategoryController.createCategory);
router.get('/', CategoryController.getCategories);
router.get('/:categoryId', CategoryController.getCategory);
router.get('/:categoryId/books', CategoryController.getBooksByCategory);
router.put('/:categoryId', authMiddleware, validationMiddleware(CategoryDto), CategoryController.updateCategory);
router.delete('/:categoryId', authMiddleware, CategoryController.deleteCategory);

export default router