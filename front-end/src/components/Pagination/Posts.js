import React from 'react';
import { Grid } from "@material-ui/core";
import ProductCard from "components/Card/ProductCard";
const Posts = ({ posts, loading }) => {
  const getProductList = (object) => {
    // const { nv_mid } = object;
    return (
      <Grid item xs={12} sm={4}>
        <ProductCard {...object} />
      </Grid>
    )
  }

  return (

    <Grid container spacing={4}>
      {posts.map(post => (
        getProductList(post)
      ))}
    </Grid>
  );
};

export default Posts;
