import { Request, Response } from 'express';
import FavoriteService from '../../services/favorite.service';

const favoriteService = new FavoriteService();

declare global {
    namespace Express {
        interface Request {
            // user?: any;
            user?: object | undefined;
        }
    }
}

export const addToFavorite = async (req: Request, res: Response) => {
    try {
        let favorite = await favoriteService.getFavorite({
            product: req.body.product,
            user: (req.user as any)._id, 
            isDelete: false
        });
        // console.log(favorite);
        if (favorite) {
            return res.status(400).json({ message: `Product already in your favorite list.` });
        }
        favorite = await favoriteService.addToFavorite({
            ...req.body,
            user: (req.user as any)._id, 
        });
        return res.status(201).json({ favorite, message: `Product added to your favorite list successfully` });
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: `Internal Server Error... ${console.error()}`});
    }
};


// GET ALL FAVORITE

export const getAllFavorite = async (req: Request, res: Response) => {
    try {
        let favorite = await favoriteService.getAllFavorite(req.query);
        res.status(200).json(favorite);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error ${console.error()}`});
    }
};


//  DELETE FAVORITE
export const deleteFavorite = async (req: Request, res: Response) => {
    try {
        let favorite = await favoriteService.getFavorite(req.query.Id);
        if(!favorite){
            return res.status(404).json({message:"Favorite not found."});
        }
        console.log(favorite);
        favorite = await favoriteService.updateFavorite(favorite._id, {isDelete: true});
        res.status(201).json({ favorite, message: `Favorite Item is Deleted Successfully..`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error ${console.error()}`});
    }
};
