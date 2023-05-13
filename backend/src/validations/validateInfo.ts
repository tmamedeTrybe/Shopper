import repriceInfo from "../interfaces/repriceInfo";

const Joi = require('joi');

const validateInfo = (repriceInfo: repriceInfo) => 
    Joi.object({
        product_code: Joi.number().required().messages({
				'number.required': 'Código do produto não informado'
			}),
		new_price: Joi.number().required().messages({
				'number.required': 'Novo preço não informado'
			}),
		}).validate(repriceInfo);


export default validateInfo;