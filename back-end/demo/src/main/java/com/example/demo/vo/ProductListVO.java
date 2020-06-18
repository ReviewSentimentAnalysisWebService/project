package com.example.demo.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductListVO {

    String nv_mid; // 상품인식번호
    String cat_id; // 카테고리번호
    String name; // 이름
    String date; // 날짜
    String img_url; // 이미지
    String price; // 가격
}