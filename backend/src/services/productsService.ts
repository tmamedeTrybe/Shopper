import Product from "../database/models/Products";
import repriceInfo from "../interfaces/repriceInfo";
import validateInfo from "../validations/validateInfo";

class ProductsService {
    constructor(private productsModel: typeof Product) {}

    public getProducts = async () => {
        const products = await this.productsModel.findAll();

        return { code: 200, products }
    }

    public validateProducts = async (repriceList: Array<repriceInfo>) => {
        const repriceInfoChecked = repriceList.map((reprice) => {
            const { error } = validateInfo(reprice);
            if (error) return { ...reprice, erro: error.message }
            return { ...reprice }
        });

        return { code: 200, products: repriceInfoChecked }

    };
}

export default ProductsService;