import Product from '../database/models/Product';
import repriceInfo from '../interfaces/repriceInfo';
import responseProducts from '../interfaces/responseProducts';
import PacksService from './packsService';

class ProductsService {
    constructor(private productsModel: typeof Product, private packService: PacksService) {}

    async getProducts() {
      const products = await this.productsModel.findAll();
      return { code: 200, products };
    };

    async validateProducts(repriceList: Array<repriceInfo>) {
      const repriceInfoChecked = await Promise.all(
        repriceList.map(async (reprice) => {
            if (!reprice.product_code) {
                const repriceChecked:responseProducts = {
                    code: "Erro",
                    name: "Erro",
                    sales_price: "Erro",
                    new_price: reprice.new_price,
                    erro: "Código do produto não preenchido"
                };
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
                    };
                    return repriceChecked;
                } else {
                    if (!reprice.new_price) {
                        const repriceChecked:responseProducts = {
                            code: reprice.product_code,
                            name: product.name,
                            sales_price: product.sales_price,
                            new_price: "Erro",
                            erro: "Novo preço do produto não preenchido"
                        };
                        return repriceChecked;
                    } else if (Number(reprice.new_price) < Number(product.cost_price)) {
                        const repriceChecked:responseProducts = {
                            code: reprice.product_code,
                            name: product.name,
                            sales_price: product.sales_price,
                            new_price: reprice.new_price,
                            erro: "Novo preço do produto não pode ser menor do que o preço de custo"
                        };
                        return repriceChecked;
                    } else if (Number(reprice.new_price) > (Number(product.sales_price) + Number(product.sales_price/10))) {
                        const repriceChecked:responseProducts = {
                            code: reprice.product_code,
                            name: product.name,
                            sales_price: product.sales_price,
                            new_price: reprice.new_price,
                            erro: "Novo preço do produto não pode ser maior em 10%"
                        };
                        return repriceChecked;
                    } else {
                        const repriceChecked:responseProducts = {
                            code: reprice.product_code,
                            name: product.name,
                            sales_price: product.sales_price,
                            new_price: reprice.new_price,
                        };
                        return repriceChecked;
                      };
                };
            };
        })
      );

      return { code: 200, products: repriceInfoChecked };

    };

    async updatePrices(productsValidated:responseProducts[]) {
      productsValidated.forEach(async (product) => {
          const isPack = await this.packService.getPackbyCode(Number(product.code));
          if (isPack?.length) {
              await this.productsModel.update(
                  { sales_price: product.new_price },
                  { where: { code: product.code } }
              );
              isPack.forEach(async (productByPack) => {
                  await this.productsModel.update(
                      { sales_price: (Number(product.new_price) / productByPack.qtyByProduct) },
                      { where: { code: productByPack.productByPack } }
                  );
              });
          } else {
              await this.productsModel.update(
                  { sales_price: product.new_price },
                  { where: { code: product.code } }
              );
              const pack = await this.packService.getPackbyProduct(Number(product.code));
              if (pack) {
                  pack.forEach(async (pac) => {
                      const sales_price_total =+ Number(product.new_price) * pac.qty;
                      await this.productsModel.update(
                          { sales_price: sales_price_total  },
                          { where: { code: pac.product } }
                      );
                  });
              };
            };
      });

      return {code: 200, message: "Preços atualizados!"}
    };
};

export default ProductsService;