import PropTypes from 'prop-types';
import styles from '../modules/ProductCard.module.css';

function ProductCard ({ product }) {

    const { erro } = product;
    return (
        <div className={ styles.container }>
            <section>
            <h3>{`Nome ${product.name}`}</h3>
            <p>{`Codigo ${product.code}`}</p>
            <p>{`Preço atual ${product.sales_price}`}</p>
            <p>{`Novo preço ${product.new_price}`}</p>
            </section>
            
            {erro && <section className={ styles.erro }><p>Erro</p><p>{`${product.erro}`}</p> </section>}
        </div>
    )
};

ProductCard.propTypes = {
    product: PropTypes.shape({
      code: PropTypes.number,
      name: PropTypes.string,
      sales_price: PropTypes.number,
      new_price: PropTypes.number,
    }).isRequired,
  };

export default ProductCard;