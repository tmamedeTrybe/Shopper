import { INTEGER, DECIMAL, STRING } from 'sequelize';
import { Model } from 'sequelize';
import pack from '../../interfaces/pack';
import db from '.';

class Pack extends Model implements pack {
	id!: number;
	pack_id!: number;
	product_id!: number;
	qty!: number;
};

Pack.init({
	id: { type: INTEGER, allowNull: false, primaryKey: true },
	pack_id: { type: INTEGER, allowNull: false },
	product_id: { type: INTEGER, allowNull: false },
	qty: { type: INTEGER, allowNull: false },
},
{
	sequelize: db,
	modelName: 'packs',
	timestamps: false,
	underscored: true,
});

export default Pack;