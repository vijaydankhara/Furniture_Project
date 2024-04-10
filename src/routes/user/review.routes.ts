import express from 'express';
import { userVerifyToken } from '../../helpers/userVerifyToken';

import {
     addReview,
     } from '../../controller/user/review.controller';

const reviewRoutes = express.Router();

reviewRoutes.post('/add-Review', userVerifyToken ,addReview);

export default reviewRoutes;
