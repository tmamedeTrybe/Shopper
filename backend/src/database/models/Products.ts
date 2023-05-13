import { INTEGER, DECIMAL, STRING } from "sequelize";
import { Model } from "sequelize";
import product from "../../interfaces/product";
import db from '.';

class Product extends Model implements product {
    code!: number;
    name!: string;
    cost_price!: number;
    sales_price!: number;
}

Product.init({
    code: { type: INTEGER, allowNull: false, primaryKey: true },
    name: { type: STRING, allowNull: false },
    cost_price: { type: DECIMAL, allowNull: false },
    sales_price: { type: DECIMAL, allowNull: false },
},
{
    sequelize: db,
    modelName: 'products',
    timestamps: false,
    underscored: true,
})

export default Product;