package com.example.demo.controller;

import java.util.List;

import com.example.demo.mapper.ProductMapper;
import com.example.demo.vo.ProductVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    ProductMapper productMapper;

    @GetMapping
    public List<ProductVO> productList() {
        System.out.println(productMapper.productList());
        return productMapper.productList();
    }

    @PostMapping
    void insertProduct(@RequestBody ProductVO product) {
        productMapper.insertProduct(product);
        System.out.println("db저장 성공");
    }

    @GetMapping("/{id}")
    public ProductVO fetchProductByID(@PathVariable String id) {
        ProductVO fetchProduct = productMapper.fetchProductByID(id);
        return fetchProduct;
    }

    @PutMapping("/{id}")
    public void updateProduct(@PathVariable String id, @RequestBody ProductVO product) {

        ProductVO updateProduct = product;

        updateProduct.setId(product.getId());
        updateProduct.setTitle(product.getTitle());
        updateProduct.setSubtitle(product.getSubtitle());

        productMapper.updateProduct(updateProduct);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable String id) {
        productMapper.deleteProduct(id);
        System.out.println("삭제 성공");
    }

}