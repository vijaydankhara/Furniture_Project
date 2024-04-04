import userModel from "../model/user_model";
 
export default class UserService{
    // add user 
    addNewUser = async (body:any) => {
        return await userModel.create(body);
    }
    // get  Spesific user 
    getUser = async (body:any) => {
        return await userModel.findOne(body);
    }

    // Get All User
    getAllUser = async (body:any) =>{
        return await userModel.find(body);
    }

     // GET Spesific BY ID
     getUserById = async (body:any) => {
        return await userModel.findById(body);
    }

    // Update User
    updateUser = async (id:string , body:any) => {
        return await userModel.findByIdAndUpdate(id, {$set: body}, {new: true});
    }

    // Delete User
    deleteUser = async (id:string) => {
        return await userModel.findByIdAndDelete(id);
    }

}
