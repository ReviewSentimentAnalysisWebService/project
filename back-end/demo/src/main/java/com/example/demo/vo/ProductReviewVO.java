package com.example.demo.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductReviewVO {
    int review_id;
    String nv_mid;
    String review;
    int Score;
    String date;
}