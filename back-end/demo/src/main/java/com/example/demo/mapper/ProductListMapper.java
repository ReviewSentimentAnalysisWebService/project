package com.example.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.vo.ProductListVO;

@Mapper
public interface ProductListMapper {

    List<ProductListVO> productList();

    List<ProductListVO> fetchProductListByID(String cat_id);

}