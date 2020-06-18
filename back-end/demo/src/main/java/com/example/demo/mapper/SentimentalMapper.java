package com.example.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.vo.SentimentalVO;
import com.example.demo.vo.SentimentalReviewVO;

@Mapper
public interface SentimentalMapper {
    List<SentimentalVO> sentimentalReview(String nv_mid);

    List<SentimentalVO> sentimentalReviewSentence(int review_id);

    List<SentimentalReviewVO> sentimental(String nv_mid);

}