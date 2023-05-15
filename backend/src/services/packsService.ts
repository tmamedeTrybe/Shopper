import Pack from '../database/models/Pack';
import Product from '../database/models/Product';

class PacksService {
  constructor(private packsModel: typeof Pack ) {}

  async getPackbyProduct(productId: number) {
    const pack = await this.packsModel.findAll({ where: { product_id: productId } });
    if (!pack) {
      return;
    } else {
      return pack.map((pack) => ({ product: pack.pack_id, qty: pack.qty }));
    };
  };

  async getPackbyCode(code: number) {
    const pack = await this.packsModel.findAll({ 
      where: { pack_id: code },
      include:
      [
        { model: Product, as: 'products', attributes: ['code'] },
      ],
      },
    );

    if (pack) {
      const productsByPack = pack.map((pack) => ({ productByPack: pack.product_id, qtyByProduct: pack.qty }));
      return productsByPack;
    } return;
  };
};

export default PacksService;