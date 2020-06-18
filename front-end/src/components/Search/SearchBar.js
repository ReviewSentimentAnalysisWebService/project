import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { connect } from 'react-redux';
import { search_keyword } from 'store/modules/productStore';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
export const SearchBar = (props) => {
    const keyword = useSelector(state => state.searchKeyword);
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

                <TextField id="standard-secondary" label="상품 검색" color="secondary" value={keyword} onChange={(e) => dispatch(search_keyword(e.target.value))} />
            </form>
        </div>
        // <form>
        //     <input type="text" placeholder="search.."
        //         value={keyword} onChange={(e) => dispatch(search_keyword(e.target.value))}></input>
        // </form>
    )
}

const mapStateToProps = ({ productStore }) => ({  //2

    searchKeyword: productStore.searchKeyword,
});
//import store name이 맞는거다

//props로 넣어줄 액션 생성함수
const mapDispatchToProps = dispatch => ({

    search_keyword: searchKeyword => dispatch(search_keyword(searchKeyword)),
});

export default connect( // 스토어와 연결
    mapStateToProps,
    mapDispatchToProps,
)(SearchBar);