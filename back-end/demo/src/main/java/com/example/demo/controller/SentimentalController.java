package com.example.demo.controller;

import java.util.List;

import com.example.demo.mapper.SentimentalMapper;
import com.example.demo.vo.SentimentalVO;
import com.example.demo.vo.SentimentalReviewVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/sentimental")
public class SentimentalController {
    @Autowired
    SentimentalMapper sentimentalMapper;

    @GetMapping("/{nv_mid}")
    public List<SentimentalVO> sentimentalReview(@PathVariable String nv_mid) {
        return sentimentalMapper.sentimentalReview(nv_mid);
    }

    @GetMapping("/sentence/{review_id}")
    public List<SentimentalVO> sentimentalReviewSentence(@PathVariable int review_id) {
        return sentimentalMapper.sentimentalReviewSentence(review_id);
    }

    @GetMapping("/avg/{nv_mid}")
    public List<SentimentalReviewVO> sentimental(@PathVariable String nv_mid) {
        return sentimentalMapper.sentimental(nv_mid);
    }
}