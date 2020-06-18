package com.example.demo.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SentimentalReviewVO {
    String nv_mid;
    int review_id;
    String keywordGroup;
    String total_sentence;
    double avg_senti_score;
    double avg_quality_score;
    int count_review_id; // 문장개수
    int count_key_id; // 언급 키워드 개수 중복제거한거

}