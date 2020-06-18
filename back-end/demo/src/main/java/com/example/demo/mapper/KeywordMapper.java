package com.example.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.vo.KeywordVO;

@Mapper
public interface KeywordMapper {
    List<KeywordVO> keywordListByCat_id(String cat_id);

    List<KeywordVO> keywordListBykey_id(String key_id);
}