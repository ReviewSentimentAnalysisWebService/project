import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { connect } from 'react-redux';
import { search_min, search_max } from 'store/modules/productStore';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
export const SearchPrice = (props) => {
    let min = useSelector(state => state.Searchmin);
    let max = useSelector(state => state.Searchmax);
    // , 를 제거하는 순서 

    // function replaceCommas(n) {
    //     console.log("wefawef", n);
    //     if (n <= 999) {
    //         return n;
    //     } else {
    //         return parseInt(n.splite(',').join(''));
    //     }
    // }
    // function numberWithCommas(x) {
    //     if (x) {
    //         return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //     }
    // }
    const dispatch = useDispatch();
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }));
    const classes = useStyles();
    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-secondary" label="최소 금액" color="secondary" value={min} onChange={(e) => dispatch(search_min(e.target.value))} />
                <br></br>
                <TextField id="standard-secondary" label="최대 금액" color="secondary" value={max} onChange={(e) => dispatch(search_max(e.target.value))} />
            </form>
        </div>
        // <form>
        //     <input type="text" placeholder="search.."
        //         value={keyword} onChange={(e) => dispatch(search_keyword(e.target.value))}></input>
        // </form>
    )
}

const mapStateToProps = ({ productStore }) => ({  //2

    SearchMin: productStore.SearchMin,
    SearchMax: productStore.SearchMax,
});
//import store name이 맞는거다

//props로 넣어줄 액션 생성함수
const mapDispatchToProps = dispatch => ({
    search_min: SearchMin => dispatch(search_min(SearchMin)),
    search_max: SearchMax => dispatch(search_max(SearchMax)),
});

export default connect( // 스토어와 연결
    mapStateToProps,
    mapDispatchToProps,
)(SearchPrice);
//export const search_Price = SearchMinMax => ({ type: SEARCH_PRICE, SearchMinMax });