import { Router } from "express";
import ProductsControllers from "../controllers/productsController";
import Product from "../database/models/Products";
import ProductsService from "../services/productsService";

const productsRoutes = Router();

const productsController = new ProductsControllers(new ProductsService(Product));

productsRoutes.get('/products', productsController.getProducts);
productsRoutes.post('/reprice', productsController.validateProducts);
productsRoutes.patch('/reprice', productsController.updatePrices);

export default productsRoutes;