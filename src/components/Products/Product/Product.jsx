import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './styles';

const Product = ({ product, onAddToCart }) => {
const classes = useStyles();

const handleAddToCart = () => onAddToCart(product.id, 1);

  return (
    <div>
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.image ? product.image.url : ''} title={product.name}/>
        
            <CardContent>
                <div className={classes.CardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                    {product.price.formatted_with_symbol}
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{ __html: product.description}} 
                variant="body2" color="textSecondary"/>
            </CardContent>
<CardActions disableSpacing className={classes.CardActions}>
<IconButton aria-label="Add to Cart" onClick={handleAddToCart}>
    <AddShoppingCart />
</IconButton>
</CardActions>
        </Card>
    </div>
  );
};

export default Product;