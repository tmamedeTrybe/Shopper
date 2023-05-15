import Product from '../database/models/Product';
import ProductsService from '../services/productsService';
import { Request, Response } from 'express';
import PacksService from '../services/packsService';
import Pack from '../database/models/Pack';

class ProductsControllers {
	constructor(private productsService = new ProductsService(Product, new PacksService(Pack)) ) {}

	getProducts = async (req: Request, res: Response) => {
		const products = await this.productsService.getProducts();
		return res.status(products.code).json(products.products);
	};

	validateProducts = async (req: Request, res: Response) => {
		const products = await this.productsService.validateProducts(req.body);
		return res.status(products.code).json(products.products);
	};

	updatePrices = async (req: Request, res: Response) => {
		const pricesUpdated =  await this.productsService.updatePrices(req.body);
		return res.status(pricesUpdated.code).json(pricesUpdated.message);
	};

};

export default ProductsControllers;