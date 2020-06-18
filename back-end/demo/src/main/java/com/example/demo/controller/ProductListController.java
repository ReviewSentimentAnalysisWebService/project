package com.example.demo.controller;

import java.util.List;

import com.example.demo.mapper.ProductListMapper;
import com.example.demo.vo.ProductListVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/productlist")
public class ProductListController {
    @Autowired
    ProductListMapper productListMapper;

    @GetMapping
    public List<ProductListVO> productList() {
        return productListMapper.productList();
    }

    @GetMapping("/{cat_id}")
    public List<ProductListVO> fetchProductListById(@PathVariable String cat_id) {
        return productListMapper.fetchProductListByID(cat_id);

    }
}