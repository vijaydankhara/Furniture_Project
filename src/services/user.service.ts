import userModel from "../model/user_model";
 
export default class UserService{
    // add user 
    addNewUser = async (body:any) => {
        return await userModel.findOne(body);
    }
}