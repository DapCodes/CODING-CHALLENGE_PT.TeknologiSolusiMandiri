import { Router } from 'express';
import { todoController, todoValidators } from '../controllers/todoController';

const router = Router();

router.get('/', todoController.getAll);
router.get('/:id', todoController.getById);
router.post('/', ...todoValidators.create, todoController.create);
router.put('/:id', ...todoValidators.update, todoController.update);
router.patch('/:id/complete', todoController.toggleComplete);
router.delete('/:id', todoController.delete);

export default router;
