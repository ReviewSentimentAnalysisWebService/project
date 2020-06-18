package com.example.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.vo.ProductReviewVO;

@Mapper
public interface ProductReviewMapper {
    List<ProductReviewVO> productReview(String nv_mid);
}