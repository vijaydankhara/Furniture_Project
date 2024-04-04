import express from 'express';
import adminRoute from './admin.routes';

const adminsRoutes = express.Router();

adminsRoutes.use('/user-admin', adminRoute);

export  default adminsRoutes