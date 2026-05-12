import { Router } from 'express';
import { categoryController, categoryValidators } from '../controllers/categoryController';

const router = Router();

router.get('/', categoryController.getAll);
router.post('/', ...categoryValidators.create, categoryController.create);
router.put('/:id', ...categoryValidators.update, categoryController.update);
router.delete('/:id', categoryController.delete);

export default router;
