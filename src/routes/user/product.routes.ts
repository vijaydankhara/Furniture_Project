import Express  from "express";
import  {
    getAllProduct,
    getProduct,
} from "../../controller/user/product.controller"

const productRoutes = Express.Router();

productRoutes.get('/get-products', getAllProduct);
productRoutes.get('/get-product', getProduct);

export default productRoutes