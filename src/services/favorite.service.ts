import FavoriteModel from '../../src/model/favoutite_model';

export default class FavoriteServices {
    // Add To Favorite
    async addToFavorite(body: any) {
        try {
            return await FavoriteModel.create(body);
        } catch (error: any) {
            console.log(error);
            return error.message;
        }
    };

    // Get all favorite
    async getAllFavorite(query: any) {
        try {
            let find = [
                { $match: { isDelete: false } }
            ];
            let result = await FavoriteModel.aggregate(find);
            return result;
        } catch (error: any) {
            console.log(error);
            return error.message;
        }
    };

    // Get favorite
    async getFavorite(body: any) {
        try {
            return await FavoriteModel.findOne(body);
        } catch (error: any){
            console.log(error);
            return error.message;
        }
    };

    async getFavoriteById(id: string) {
        try {
            return await FavoriteModel.findById(id);
        } catch (error: any) {
            console.log(error);
            return error.message;
        }
    };

    async updateFavorite(id: string, body: any) {
        try {
            return await FavoriteModel.findByIdAndUpdate(id, { $set: body }, { new: true });
        } catch (error: any) {
            console.log(error);
            return error.message;
        }
    }
}
