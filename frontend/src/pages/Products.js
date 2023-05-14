function Products() {

    const changeHandler = (event) => {
        console.log(event.target.files[0])
      };

    return (
        <div>
            <h1> Produtos </h1>
            <section>
                <h2> Atualizar preços</h2>
                <form id="myForm">
                    <input
                        type="file"
                        id="csvFile"
                        accept=".csv"
                        onChange={changeHandler}
                    />
                    <button type="submit">Validar</button>
                </form>
            </section>
        </div>
    );
}

export default Products;