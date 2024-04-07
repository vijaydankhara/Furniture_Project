import express  from "express";
import { userVerifyToken } from '../../helpers/userVerifyToken';
import { addToFavorite,
     getAllFavorite,
     deleteFavorite 
    } from '../../controller/user/favorite.controller';

const favoriteRoutes = express.Router();

favoriteRoutes.post('/add-To-Favorite', userVerifyToken, addToFavorite);
favoriteRoutes.get('/get-All-Favorites', userVerifyToken, getAllFavorite);
favoriteRoutes.delete('/delete-Favorite', userVerifyToken, deleteFavorite);

export default favoriteRoutes;
