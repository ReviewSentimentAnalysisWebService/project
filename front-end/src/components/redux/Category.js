import React from 'react';
import styled from "styled-components";
import categories from './categories';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import productStore from 'store/modules/productStore';

//카테고리 리스트를 받아와서 출력한다
//onclick된거로 값이 바뀐다.
//productList가 onclick된 카테고리로 바뀌려면?
//카테고리 값마다 불러오는 productList가 달라야 한다?
//그렇다면 productList_Category에 각 값마다 달라져야하는 데이터를 json형식으로 저장해두고
//카테고리가 변화하면 안에 list도 그 변화를 감지하고 바뀌어야 한다.
//와우
import styles from "assets/jss/material-kit-react/views/componentsSections/tabsStyle.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const CategoriesBlock = ({ selected, onSelect, categories }) => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { CurrentCategory } = props;
  return (
    <>
      <Paper className={classes.root}>
        <Tabs
          value={props.CurrentCategory}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          {categories.map(category => (
            <Tab
              label={category}
              category={category}
              activeClassName="active"
              active={props.CurrentCategory === category}
              onClick={() => onSelect(category)}
            />

          ))}
        </Tabs>
      </Paper>
    </>
  );
}
//




const Category = ({ selected, onSelect }) => {

  return (
    <>
      <br></br><br></br>
      <CategoriesBlock selected={selected} onSelect={onSelect} categories={categories} />

    </>
  )
}
const mapStateToProps = ({ productStore }) => ({
  CurrentCategory: productStore.category,


});

//props로 넣어줄 액션 생성함수
const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Category);