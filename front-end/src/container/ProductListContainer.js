import React, { Component } from 'react';
import PaginationProductList from 'components/Pagination/PaginationProductList'
import { connect } from 'react-redux';
//import productStore from 'store/modules/productStore';
import { changeProductList, changeCurrentProduct } from '../store/modules/productStore';
class ProductListContainer extends Component { //3
    handleClick = name => {
        changeCurrentProduct(name);
    }

    render() {
        return (
            < >
                <PaginationProductList />
                {/* <ProductList category={category} list={list} click={this.handleClick} /> */}

            </>

        );
    }
}
const mapStateToProps = ({ productStore }) => ({  //2
    category: productStore.category,
    list: productStore.productList,
    CurrentProduct: productStore.CurrentProduct,
});
//import store name이 맞는거다

//props로 넣어줄 액션 생성함수
const mapDispatchToProps = dispatch => ({
    changeProductList: list => dispatch(changeProductList(list)),
    changeCurrentProduct: CurrentProduct => dispatch(changeCurrentProduct(CurrentProduct)),
});

export default connect( // 스토어와 연결
    mapStateToProps,
    mapDispatchToProps,
)(ProductListContainer);