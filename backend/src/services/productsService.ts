import Product from "../database/models/Products";
import repriceInfo from "../interfaces/repriceInfo";
import responseProducts from "../interfaces/responseProducts";
// import validateInfo from "../validations/validateInfo";

class ProductsService {
    constructor(private productsModel: typeof Product) {}

    public getProducts = async () => {
        const products = await this.productsModel.findAll();

        return { code: 200, products }
    }

    async validateProducts(repriceList: Array<repriceInfo>)  {

            const repriceInfoChecked = await Promise.all(
                repriceList.map(async (reprice) => {
                    if (!reprice.product_code) {
                        const repriceChecked:responseProducts = {
                            code: "Erro",
                            name: "Erro",
                            sales_price: "Erro",
                            new_price: reprice.new_price,
                            erro: "Código do produto não preenchido"
                        }
                        return repriceChecked;
                    } else {
                        const product = await this.productsModel.findOne({ where: { code: reprice.product_code} });
                        if (!product) {
                            const repriceChecked:responseProducts = {
                                code: reprice.product_code,
                                name: "Erro",
                                sales_price: "Erro",
                                new_price: reprice.new_price,
                                erro: "Produto não encontrado"
                            }
                            return repriceChecked;
                        } else {
                            if (!reprice.new_price) {
                                const repriceChecked:responseProducts = {
                                    code: reprice.product_code,
                                    name: product.name,
                                    sales_price: product.sales_price,
                                    new_price: "Erro",
                                    erro: "Novo preço do produto não preenchido"
                                }
                                return repriceChecked;
                            } else if (Number(reprice.new_price) < Number(product.cost_price)) {
                                const repriceChecked:responseProducts = {
                                    code: reprice.product_code,
                                    name: product.name,
                                    sales_price: product.sales_price,
                                    new_price: reprice.new_price,
                                    erro: "Novo preço do produto não pode ser menor do que o preço de custo"
                                }
                                return repriceChecked;
                            } else if (Number(reprice.new_price) > (Number(product.sales_price) + Number(product.sales_price/10))) {
                                const repriceChecked:responseProducts = {
                                    code: reprice.product_code,
                                    name: product.name,
                                    sales_price: product.sales_price,
                                    new_price: reprice.new_price,
                                    erro: "Novo preço do produto não pode ser maior em 10%"
                                }
                                return repriceChecked;
                            } else {
                                const repriceChecked:responseProducts = {
                                    code: reprice.product_code,
                                    name: product.name,
                                    sales_price: product.sales_price,
                                    new_price: reprice.new_price,
                                }
                                return repriceChecked;
                            }
                        }
                    };
            
                })
            );
            
            
        console.log(repriceInfoChecked, "FORA DO FOREACH");

       return { code: 200, products: repriceInfoChecked }

    };

    async updatePrices(productsValidated:responseProducts[]) {
            productsValidated.forEach(async (product) => {
                await this.productsModel.update(
                    { sales_price: product.new_price },
                    { where: { code: product.code } }
                    )
            });
    
        return {code: 200, message: "Preços atualizados"}
    }

}

export default ProductsService;