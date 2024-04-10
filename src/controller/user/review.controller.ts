import ReviewServices from "../../services/review.service";
import { Request, Response } from 'express'; 
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
        res.status(500).json({ message: `Internal Server Error...${console.error()}`});
    }
};

// GET ALL REVIEW
export const getAllReview = async(req: Request,res: Response) => {
    try {
        let review = await reviewService.getAllReview(req.query);
        res.status(200).json(review);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error...${console.error()}`});
    }
};


// Get Review by ID
export const getReview = async(req: Request,res: Response) => {
    try {
        let review = await reviewService.getReviewById(req.query.Id);
        if (!review) {
            return res.status(404).json({ message: `Review ID not found!` });
        }
        res.status(200).json(review);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error...${console.error()}`});
    }
};

// Update Review
export const updateReview = async(req: Request,res: Response) => {
    try {
        let review = await reviewService.getReviewById(req.query.Id);
        if (!review) {
            return res.status(404).json({ message: ` This Review does not exist!` });
        }
        review = await reviewService.updateReview(review._id, { ...req.body});
        res.status(200).json({review, message: ` Product Review Update Successfully....`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error...${console.error()}`});
    }
};

// DELETE REVIEW
export const deleteReview = async(req: Request,res: Response) => {
    try {
        let review = await reviewService.getReviewById(req.query.Id);
        if(!review){
            return res.status(404).json({Message: `Review is not found`});
        }
        review = await reviewService.updateReview(review._id , {isDelete: true});
        res.status(202).json({review , Message: `Review is Delete....`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error...${console.error()}`});
    }
}