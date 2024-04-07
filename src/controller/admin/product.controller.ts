import { Request, Response } from "express";
import ProductService from "../../services/product.service";

const productService = new ProductService();

declare global {
    namespace Express {
        interface Request {
            product?: any;
        }
    }
}

// ADD NEW PRODUCT
export const addNewProduct = async (req: Request, res: Response) => {
    try {
        let product : object | null = await productService.getProduct({ title: req.body.title, isDelete: false });
        if (product) {
            return res.status(400).json({ message: 'Product already exists' });
        }
        product = await productService.addNewProduct({ ...req.body });
        res.status(201).json({ product, message: 'Product Added' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// GET ALL PRODUCT
export const getAllProduct = async (req: Request, res: Response) => {
    try {
        let products = await productService.getAllProduct(req.query);
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



// GET PRODUCT
export const getProduct = async (req: Request, res: Response) => {
    try {
        
        let product = await productService.getProductById(req.query.productId);
        // if (!product)     // two if condition right
        if (product === undefined || product === null)      
        {

            return res.status(404).json({ message: 'Product is not found' });
        }
        res.status(200).json (product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



// UPDATE PRODUCT
export const updateProduct = async (req: Request, res: Response) => {
    try {
        let product = await productService.getProductById(req.query.productId);
        if (!product) {
            return res.status(404).json({ message: 'Product is not found' });
        }
        product = await productService.updateProduct(product._id, { ...req.body });
        res.status(202).json({ product, message: 'Product is updated' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// DELETE PRODUCT
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        let product = await productService.getProductById(req.query.productId);
        if (!product) {
            return res.status(404).json({ message: 'Product is not found' });
        }
        product = await productService.updateProduct(product._id, { isDelete: true });
        res.status(200).json({ product, message: 'Product is Deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server Error' })
    }
};