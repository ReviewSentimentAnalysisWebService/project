package com.example.demo.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SentimentalVO {

    String nv_mid;
    int review_id;
    String sentence_number;
    int key_id;
    String sentence;
    double senti_score;
    double quality_score;

}