import React from "react";
import ProductCard from "./ProductCard";
import { Grid } from "@material-ui/core";
import productList from "./constants";
//ProductList.js와는 다른거다 헷깔리지말자!

const Content = () => {
  const getProductList = (object) => {
    //const { title, price, description, avatarSrc, imgSrc } = object;
    return (
      <Grid item xs={12} sm={4}>
        <ProductCard {...object} />
      </Grid>
    );
  };

  return (
    <Grid container spacing={4}>
      {productList.map((object) => getProductList(object))}
    </Grid>
  );
};

/*
const Content = () => {
  const getProductList = (object) => {
    const { title, price, description, avatarSrc, imgSrc } = object;
    return (
      <Grid item xs={12} sm={4}>
        <ProductCard {...object} />
      </Grid>
    );
  };

  return (
    <Grid container spacing={4}>
      {productList.map((object) => getProductList(object))}
    </Grid>
  );
};
*/
export default Content;
