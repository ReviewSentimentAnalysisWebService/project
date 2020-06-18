import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductList from "components/redux/ProductList";
import { CLICK_PRODUCT } from '../store/modules/productStore';
import productStore from 'store/modules/productStore';

class Chart_ReviewContainer extends Component { //3

    render() {

        return (
            < >
                <ProductList />
            </>

        );
    }
}
const mapStateToProps = ({ productStore }) => ({  //2
    CurrentProduct: productStore.CurrentProduct,
});
//import store name이 맞는거다

//props로 넣어줄 액션 생성함수
const mapDispatchToProps = dispatch => ({
    CLICK_PRODUCT: CurrentProduct => dispatch(CLICK_PRODUCT(CurrentProduct)),
});

export default connect( // 스토어와 연결
    mapStateToProps,
    mapDispatchToProps,
)(Chart_ReviewContainer);