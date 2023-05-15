import { Router } from 'express';
import ProductsControllers from '../controllers/productsController';
import Pack from '../database/models/Pack';
import Product from '../database/models/Product';
import PacksService from '../services/packsService';
import ProductsService from '../services/productsService';

const productsRoutes = Router();

const productsController = new ProductsControllers(new ProductsService(Product, new PacksService(Pack)));

productsRoutes.get('/products', productsController.getProducts);
productsRoutes.post('/reprice', productsController.validateProducts);
productsRoutes.patch('/reprice', productsController.updatePrices);

export default productsRoutes;