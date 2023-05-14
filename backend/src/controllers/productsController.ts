import Product from "../database/models/Products";
import ProductsService from "../services/productsService";
import { Request, Response } from 'express';

class ProductsControllers {
    constructor(private productsService = new ProductsService(Product) ) {}

    getProducts = async (req: Request, res: Response) => {
        const products = await this.productsService.getProducts();
        return res.status(products.code).json(products.products);
    };

    validateProducts = async (req: Request, res: Response) => {
        const products = await this.productsService.validateProducts(req.body);
        return res.status(products.code).json(products.products);
    }
};

export default ProductsControllers;