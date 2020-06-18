package com.example.demo.controller;

import java.util.List;

import com.example.demo.mapper.KeywordMapper;
import com.example.demo.vo.KeywordVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/keyword")
public class KeywordController {
    @Autowired
    KeywordMapper keywordMapper;;

    @GetMapping("/cat-id/{cat_id}")
    public List<KeywordVO> keywordListByCat_id(@PathVariable String cat_id) {
        return keywordMapper.keywordListByCat_id(cat_id);
    }

    @GetMapping("/key-id/{key_id}")
    public List<KeywordVO> keywordListBykey_id(@PathVariable String key_id) {
        return keywordMapper.keywordListBykey_id(key_id);
    }
}