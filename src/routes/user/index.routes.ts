import express, { Router } from 'express';
import userRoutes from '../../routes/user/user.routes';
import productRoutes from '../../routes/user/product.routes';
import cartRoutes from '../../routes/user/cart.routes';
// import orderRoutes from '../../routes/user/order.routes';
import favoriteRoutes from '../../routes/user/favorite.routes';
// import reviewRoutes from '../../routes/user/review.routes';
const usersRoutes: Router = express.Router();

usersRoutes.use('/users', userRoutes);
usersRoutes.use('/product', productRoutes);
usersRoutes.use('/cart', cartRoutes);
// usersRoutes.use('/order',orderRoutes);
usersRoutes.use('/favorite', favoriteRoutes);
// usersRoutes.use('/review', reviewRoutes);

export default usersRoutes;


