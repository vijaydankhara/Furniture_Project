import ReviewServices from "../../services/review.service";
import { Request, Response } from 'express'; 

const reviewService = new ReviewServices();

export const getAllReview = async (req: Request, res: Response) => {
    try {
        let review = await reviewService.getAllReview({isDelete: false});
        if (!review) {
            return res.status(404).json({ message: `Review Not Found....`});
        }
        res.status(200).json(review);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error...${console.error()}`});
    }
};

export const deleteReview = async (req: Request, res: Response) => {
    try {
        let review = await reviewService.getReviewById(req.query.reviewId);
        if (!review) {
            return res.status(404).json({ message: ` This Review does not exist!` });
        }
        review = await reviewService.updateReview(review._id,{ isDelete: true});
        res.status(200).json({message:`The product review has been deleted successfully.`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error...${console.error()}`});
    }
};