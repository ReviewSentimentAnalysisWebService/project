import React from "react";
import { Grid } from "@material-ui/core";

import ProductCard from "components/Card/ProductCard";
import productList from "dbComponent/ProductList";
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

export default Content;
