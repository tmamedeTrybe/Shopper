import Product from "../database/models/Products";

class ProductsService {
    constructor(private productsModel: typeof Product) {}

    public getProducts = async () => {
        const products = await this.productsModel.findAll();

        return { code: 200, products }
    }
}

export default ProductsService;