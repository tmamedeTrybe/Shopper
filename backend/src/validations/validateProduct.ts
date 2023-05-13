import Product from "../database/models/Products"

const productExist = async (code: number) => {
    const product = await Product.findOne({ where: { code } });
    if (!product) return { erro: "Código de produto não existe" }

    return product;
};

export {
    productExist,
}