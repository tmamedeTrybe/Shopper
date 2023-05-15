import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import styles from '../modules/Products.module.css';

function Products() {
  const [productsValidated, setProductsValidated] = useState([]);
  const [enableButton, setEnableButton] = useState();
  const [file, setFile] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    setEnableButton(true);
    const enableButton = () => {
      const existErro = productsValidated.some((product) => Object.keys(product).includes('erro'));
      return existErro;
    };
    setEnableButton(enableButton());
    }, [productsValidated]
  );

  const changeHandler = async (event) => {
    Papa.parse(event.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: async function (results) {
            setFile(results.data);
        },
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3001/reprice', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(file),
    });
    const productsData = await response.json();
    setProductsValidated(productsData);
    console.log(productsValidated);
  };

  const updatePrices = async () => {
    const response = await fetch('http://localhost:3001/reprice', {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(productsValidated),
    });
    const updateData = await response.json();
    setProductsValidated([]);
    setMessage(updateData);
  };

  const cleanMain = () => {
    setMessage('');
    setProductsValidated([]);
  };
   
  return (
    <div className={ styles.container } >
        <h1> Produtos </h1>
        <section className={ styles.upload } >
          <h2> Atualizar preços </h2>
          <form className={ styles.upload } id="myForm" onSubmit={ onSubmit }>
            <input
                type="file"
                id="csvFile"
                accept=".csv"
                onChange={ changeHandler }
                onClick={ cleanMain }
            />
            <button type="submit">Validar</button>
          </form>
          
        </section>
        {
          productsValidated.length > 0 &&
          <main className={ styles.main } >
            <section className={ styles.products }>
                {productsValidated.map((product, i) => 
                <ProductCard product={ product } />
                )}
            </section>
            <section>
              <button
                  disabled={ enableButton }
                  onClick={ updatePrices }
              >Atualizar
              </button>
            </section>
          </main>
        }
        <section className={ styles.message }>
          {
            message && <p>{ message }</p>
          }
        </section>
    </div>
  );
};

export default Products;