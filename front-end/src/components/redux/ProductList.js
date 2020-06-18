import React, { useState, useEffect } from 'react';
import { Grid } from "@material-ui/core";
import ProductCard from "components/Card/ProductCard";

const ProductList = ({ category, list, click }) => {
    const getProductList = (object) => {
        const { id, title, subtitle, avatarSrc, imgSrc, description } = object;
        return (
            <Grid item xs={12} sm={4}>
                <ProductCard {...object} click={click} />
            </Grid>
        )
    }
    //console.log(">>>." + JSON.stringify(list));
    //container에서 넘어온 객체를 표현해주는 곳
    return (
        <div>
            <Grid container spacing={4}>
                {list.map((products) => getProductList(products))}
            </Grid>
        </div>

    );
};

export default ProductList;

