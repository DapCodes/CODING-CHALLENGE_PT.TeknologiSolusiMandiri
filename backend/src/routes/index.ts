import { Router } from 'express';
import todoRoutes from './todoRoutes';
import categoryRoutes from './categoryRoutes';

const router = Router();

router.use('/todos', todoRoutes);
router.use('/categories', categoryRoutes);

router.get('/health', (_, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
