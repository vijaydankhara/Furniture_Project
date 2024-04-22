import productModel from "../model/product_model";
import { Request, Response } from 'express'; 
export default class productService{

    // add new product
    addNewProduct = async (body: any) => {
        return await productModel.create(body);
    }
    
    // get product
    getProduct = async (body: object) => {
        return await productModel.findOne(body);
    }
    
    
    // Get All PRODUCT
    getAllProduct = async (body:any) =>{
        return await productModel.find(body);
    }
    // GET SPECIFIC BY ID
    getProductById = async (body:any) => {
    return await productModel.findById(body);
}

    // Update Product
    updateProduct = async (id:string , body:any) => {
        return await productModel.findByIdAndUpdate(id, {$set: body}, {new: true});
    }

    // Delete Product
    deleteProduct = async (id:string) => {
        return await productModel.findByIdAndDelete(id);
    }
    
}

