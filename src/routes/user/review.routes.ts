import express from 'express';
import { userVerifyToken } from '../../helpers/userVerifyToken';

import {
     addReview,
     getAllReview
     } from '../../controller/user/review.controller';

const reviewRoutes = express.Router();

reviewRoutes.post('/add-Review', userVerifyToken ,addReview);
reviewRoutes.get('/get-All-Review', userVerifyToken ,getAllReview);
export default reviewRoutes;