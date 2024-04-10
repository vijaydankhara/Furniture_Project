import express from 'express';
import { userVerifyToken } from '../../helpers/userVerifyToken';

import {
     addReview,
     getAllReview,
     getReview,
     updateReview,
     deleteReview
     } from '../../controller/user/review.controller';

const reviewRoutes = express.Router();

reviewRoutes.post('/add-Review', userVerifyToken ,addReview);
reviewRoutes.get('/get-All-Review', userVerifyToken ,getAllReview);
reviewRoutes.get('/get-Review', userVerifyToken, getReview);
reviewRoutes.put('/update-Review', userVerifyToken, updateReview);
reviewRoutes.delete('/delete-Review', userVerifyToken, deleteReview);

export default reviewRoutes;