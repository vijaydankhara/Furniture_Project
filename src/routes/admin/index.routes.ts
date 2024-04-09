import express from 'express';
import adminRoute from './admin.routes';
import productRoutes from '../../routes/admin/product.routes';
import cartRoutes from '../../routes/admin/cart.routes';
// import reviewRoutes from '../../routes/admin/review.routes';

const adminsRoutes = express.Router();

adminsRoutes.use('/user-admin', adminRoute);
adminsRoutes.use('/product', productRoutes);
adminsRoutes.use('/cart',cartRoutes);
// adminsRoutes.use('/review', reviewRoutes);

export  default adminsRoutes
