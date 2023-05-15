import Papa from 'papaparse';
import { useEffect, useState } from "react";
import ProductCard from '../components/ProductCard';
import styles from '../modules/Products.module.css';

function Products() {
    const [productsValidated, setProductsValidated] = useState([]);
    const [enableButton, setEnableButton] = useState(true);
    const [file, setFile] = useState();
    const [message, setMessage] = useState();

    useEffect(() => {
        const enableButton = () => {
            const existErro = productsValidated.some((product) => Object.keys(product).includes('erro'));
            return existErro
        }
        setEnableButton(enableButton());
    }, [productsValidated])

    const changeHandler = async (event) => {
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: async function (results) {
                console.log(results.data, 'csv lido');
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
        console.log(productsData, 'RESPOSTA DA API');
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
        
    }
   
    return (
        <div className={ styles.container } >
            <h1> Produtos </h1>
            <section>
                <h2> Atualizar preços</h2>
                <form id="myForm" onSubmit={ onSubmit }>
                    <input
                        type="file"
                        id="csvFile"
                        accept=".csv"
                        onChange={changeHandler}
                    />
                    <button type="submit">Validar</button>
                </form>
            </section>
            {
                productsValidated.length > 0 &&
                <section className={ styles.products }>
                    {productsValidated.map((product, i) => 
                    <ProductCard product={product} />
                )}
                </section>
            }
            <section>
                <button
                    disabled={ enableButton }
                    onClick={ updatePrices }
                >Atualizar
                </button>
                {
                    message && <p>{ message }</p>
                }
            </section>
        </div>
    );
}

export default Products;