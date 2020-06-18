package com.example.demo.controller;

import java.util.List;

import com.example.demo.mapper.ProductReviewMapper;
import com.example.demo.vo.ProductReviewVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/productreview")
public class ProductReviewController {
    @Autowired
    ProductReviewMapper productReviewMapper;

    @GetMapping("/{nv_mid}")
    public List<ProductReviewVO> productReview(@PathVariable String nv_mid) {
        return productReviewMapper.productReview(nv_mid);

    }

}