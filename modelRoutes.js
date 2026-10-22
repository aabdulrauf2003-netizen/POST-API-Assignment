import { Router } from 'express';
import addAdmin from '../controllers/add_admin.js';
import addCategory from '../controllers/add_category.js';
import addOrder from '../controllers/add_order.js';
import addPasswordReset from '../controllers/add_password_reset.js';
import addProduct from '../controllers/add_product.js';
import addUser from '../controllers/add_user.js';

const router = Router();
router.post('/admins', addAdmin);
router.post('/categories', addCategory);
router.post('/orders', addOrder);
router.post('/password-resets', addPasswordReset);
router.post('/products', addProduct);
router.post('/users', addUser);

export default router;
