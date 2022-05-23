import React from "react";
import { Grid } from "@material-ui/core";

import Product from './Product/Product';
import useStyles from './styles';



const products = [
    {id: 1, name: "shoes", description: "running shoes", price:"$5", image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/a50d62bd-5802-47cd-8952-31e746332ecc/react-miler-2-road-running-shoes-HzpXdn.png'},
    {id: 2, name: "Macbook", description: "Apple macbook", price:"$10", image: 'https://www.iwant.cz/pic/1HPJ000101-600-600.jpg'},
];

const Products = () => {
    const classes = useStyles();
    return(
<main className={classes.content}>
    <div className={classes.toolbar}/>
    <Grid cointainer justify="center" spacing={4}>
        {products.map((product) => (<Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product}/> 
        </Grid>))}
    </Grid>
</main>)
}

export default Products;