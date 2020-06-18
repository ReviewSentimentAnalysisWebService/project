package com.example.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.vo.CategoryVO;

@Mapper
public interface CategoryMapper {

    List<CategoryVO> categoryList();

    // 카테고리는 조회만 하니까
}