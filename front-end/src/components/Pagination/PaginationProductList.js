import React, { useState, useEffect } from 'react';
import Posts from './Posts';
import PaginationPage from './PaginationPage';
import { connect } from 'react-redux';
//import productStore from 'store/modules/productStore';
import { changeProductList, changeCurrentProduct, search_min, search_max } from 'store/modules/productStore';
import SearchBar from 'components/Search/SearchBar';
import { SearchPrice } from '../Search/SearchPrice';
import { Grid } from "@material-ui/core";
const PaginationProductList = (props) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);
  const fetchPosts = () => {
    setPosts(props.list);
    setCurrentPage(1);
  }

  useEffect(() => {
    fetchPosts();

    //console.log("useEffect", currentPage);
    //변화를 감지하거나, 컴포넌트를 부를때 마다 실행 즉 화면이 바뀌면 한번은 실행하게된다. 
  }, [props.list]);

  // const replacePrice = posts.map(posts => ({ ...posts, price: posts.price.split(',').join('') }));
  // const moneyFilter = replacePrice.filter(replacePrice => replacePrice.price >= 50000);
  // const turn = replacePrice.map(replacePrice => ({ ...replacePrice, price: numberWithCommas(replacePrice.price) }));

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const searchText = posts.filter(posts => posts.name.toLowerCase().indexOf(props.searchKeyword.toLowerCase()) >= 0);
  //console.log("test", test);

  // , 를 제거하는 순서 
  const replacePrice = searchText.map(searchText => ({ ...searchText, price: searchText.price.split(',').join('') }));
  let minPrice;
  let maxPrice;

  if (!props.SearchMin) {
    minPrice = 0;
    //빈칸이면 store에 0을 넣는다. 
  } else {
    minPrice = parseInt(props.SearchMin);
  }
  if (!props.SearchMax) {
    maxPrice = 999999999999;
  } else {
    maxPrice = parseInt(props.SearchMax);

  }

  // 이렇게하는게 맞는걸까......


  //가격을 비교하는 거 


  const moneyFilter = replacePrice.filter(replacePrice => replacePrice.price >= minPrice && replacePrice.price < maxPrice);

  // //parseInt 안하면 문자열비교함 
  // console.log("props.SearchMin", props.SearchMin);
  // console.log("props.SearchMax", props.SearchMax);
  // //다시 , 찍기 
  const turn = moneyFilter.map(moneyFilter => ({ ...moneyFilter, price: numberWithCommas(moneyFilter.price) }));
  // console.log("turn", turn);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


  const currentPosts = turn.slice(indexOfFirstPost, indexOfLastPost);
  //서치로 한번
  //가격비교 한번
  //후 랜더링 

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='container mt-5'>
      <h1 className='text-primary mb-3'></h1>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={8}>
          <SearchBar />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SearchPrice />
        </Grid>
      </Grid>
      <Posts posts={currentPosts} />
      <PaginationPage
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

const mapStateToProps = ({ productStore }) => ({  //2
  category: productStore.category,
  list: productStore.productList,
  CurrentProduct: productStore.CurrentProduct,
  searchKeyword: productStore.searchKeyword,
  SearchMin: productStore.SearchMin,
  SearchMax: productStore.SearchMax,
});
//import store name이 맞는거다

//props로 넣어줄 액션 생성함수
const mapDispatchToProps = dispatch => ({
  changeProductList: list => dispatch(changeProductList(list)),
  changeCurrentProduct: CurrentProduct => dispatch(changeCurrentProduct(CurrentProduct)),
  search_min: SearchMin => dispatch(search_min(SearchMin)),
  search_max: SearchMax => dispatch(search_max(SearchMax)),
});

export default connect( // 스토어와 연결
  mapStateToProps,
  mapDispatchToProps,
)(PaginationProductList);



  // 흔적 
  // const t = posts.filter(posts => posts.price = parseInt(posts.price.replace(",", "")));
  // const t = posts.filter(posts => posts.price.split(',').join('') >= 0);
  // console.log("왜 , 가 안사라지냐", t);

  // String.split(,).join(‘’)

  //const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // const q = posts.map(post => post.price = parseInt(post.price.split(',').join('')));
  // console.log("1234123", q);


  // const p = posts.filter(posts => posts.map(post => post.price = parseInt(post.price.split(',').join(''))) >= 1);
  // console.log("1234123", p);

  // const p = posts.map(post => post.price = post.price.split(',').join(''));
  // console.log("1234123", p);