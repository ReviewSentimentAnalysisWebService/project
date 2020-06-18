import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeCategory } from '../store/modules/productStore';
import { changeProductList } from '../store/modules/productStore';
import { changeCategoryList } from '../store/modules/productStore';
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import ApiService from "ApiService";


class CategoryContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
            productList: [],

        };
    }
    componentWillMount() {
        this.reloadCategoryList();
        this.reloadProductList();
    }
    //생성되자마자 -> 한번만 
    reloadCategoryList = () => {
        ApiService.fetchCategory()
            .then((res) => {
                this.setState({
                    categoryList: res.data,
                });
                const { changeCategoryList } = this.props;
                changeCategoryList(this.state.categoryList);
                console.log("실행순서 확인");
                console.log("categoryList", this.props.categoryList);

            })
            .catch((err) => {
                console.log("reload error", err);
            });
    };
    //생성되자마자 -> 한번만 
    reloadProductList = () => {
        ApiService.fetchProductList()
            .then((res) => {
                this.setState({
                    productList: res.data,
                });
                const { changeProductList } = this.props;
                changeProductList(this.state.productList);
                console.log("여긴언제");
            })
            .catch((err) => {
                console.log("reload error", err);
            });
    };


    reloadProductListById = (cat_id) => {
        ApiService.fetchProductListById(cat_id)
            .then((res) => {
                this.setState({
                    productList: res.data,
                });
                const { changeProductList } = this.props;
                changeProductList(this.state.productList);
            })
            .catch((err) => {
                console.log("reload error", err);
            });
    };



    handleSelect = category => {
        const { changeCategory } = this.props;
        changeCategory(category);

        //바꾸는 부분 

        console.log("changeCategory -> ! " + category);

        const getProductList_Category = () => {
            // const cat_id;
            switch (category) {
                case 'all':
                    this.reloadProductList();
                    break;
                case 'notebook':
                    // cat_id = 50000151 노트북
                    // ApiService.fetchProductListById(cat_id);
                    this.reloadProductListById(50000151);
                    break;
                //cat_id 50000151
                case 'mouse':
                    //cat_id = 50001203 마우스 
                    //changeProductList(ProductList_Category.productList_Mouse);
                    this.reloadProductListById(50001203);
                    break;
                case 'skin':
                    //cat_id = 50000437 스킨
                    this.reloadProductListById(50000437);
                    break;
                case 'lotions':
                    //cat_id = 50000438 로션
                    this.reloadProductListById(50000438);
                    break;
                default:
                    console.log("default");
                    break;
            }
        }
        getProductList_Category();
    };
    render() {
        const { category } = this.props;

        // console.log(">>>>>." + category)
        return (<>
            <br></br><br></br>

            <CustomTabs
                onSelect={this.handleSelect} selected={category} categoryList={this.state.categoryList}
            />
        </>);

    }

}
//props로 넣어줄 스토어의 상태값
const mapStateToProps = ({ productStore }) => ({
    category: productStore.category,
    list: productStore.productList,
    CategoryList: productStore.CategoryList,
});

//props로 넣어줄 액션 생성함수
const mapDispatchToProps = dispatch => ({
    changeCategory: category => dispatch(changeCategory(category)),
    changeProductList: list => dispatch(changeProductList(list)),
    changeCategoryList: CategoryList => dispatch(changeCategoryList(CategoryList)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CategoryContainer);