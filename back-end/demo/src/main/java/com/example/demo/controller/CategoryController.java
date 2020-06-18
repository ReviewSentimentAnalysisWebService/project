package com.example.demo.controller;

import java.util.List;

import com.example.demo.mapper.CategoryMapper;
import com.example.demo.vo.CategoryVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/category")
public class CategoryController {
    @Autowired
    CategoryMapper categoryMapper;

    @GetMapping
    public List<CategoryVO> categoryList() {
        return categoryMapper.categoryList();
    }

}