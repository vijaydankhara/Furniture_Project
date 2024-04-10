import ReviewServices from "../../services/review.service";
import { Request, Response } from "express";
const reviewService = new ReviewServices();


// ADD REVIEW
export const addReview = async (req: Request,res: Response) => {
    try {
        let review = await reviewService.getReview({
            user: (req.user as any )._id,
            product:req.query.productId,
            isDelete: false
        });
        if(review) {
            return res.status(400).json({ Message: 'Review is alredy exist' });
        }
        review = await reviewService.addNewReview({ ...req.body, user: (req.user as any )._id });
        res.status(201).json({review, Message: 'Review is Added...' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ Message: 'Internal server Error' });
    }
};