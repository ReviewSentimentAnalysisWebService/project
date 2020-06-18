import React from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import DialogReview from './dialogReview';
import { connect } from 'react-redux';
import productStore from 'store/modules/productStore';
import { Search_TextField } from 'store/modules/productStore';




const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
const ReviewTable = props => {
    //columns는 고정이니까 그냥 둔다. 

    const titleString = props.CurrentKeyword;

    let keywordReview;
    let searchText;
    let gitar;
    if (titleString == "기타") {
        keywordReview = props.ReviewData;
        gitar = props.reviewLabels.map((label => label.keyword)); //각 라벨이 전부 들어가있고 
        gitar = gitar.filter((gitar => gitar.indexOf("기타"))); //기타 라벨을 제거 하고
        searchText = keywordReview.filter(keywordReview => keywordReview.review.indexOf("기타") < 0);
        console.log("기타일때 입니다", searchText);
    } else {
        keywordReview = props.ReviewData;
        searchText = keywordReview.filter(keywordReview => keywordReview.review.indexOf(titleString) >= 0);
    }
    console.log("asdasd", searchText);
    let viewString;
    if (titleString) {
        viewString = titleString + "";
    } else {
        viewString = "전체보기"
    }
    const [state, setState] = React.useState({
        columns: [
            { title: '리뷰내용', field: 'review', render: rowData => <DialogReview data={rowData.review} /> },
            // { title: '별점', field: 'score' },
            { title: '올린시간', field: 'date' },
        ],
    });
    const test = (d) => {
        props.Search_TextField(d);
        //다음에도 바뀌는걸 즉시 반영할땐 (e) => method(e) 하면되겠다......
        //  console.log("dfwaefwef", d);
    }

    return (
        <>
            <MaterialTable
                title={viewString}
                columns={state.columns}
                data={searchText}
                icons={tableIcons}
                onSearchChange={(e) => test(e)}
                options={{
                    pageSize: 10,
                    pageSizeOptions: [10, 20, 30, 40, 100],
                    maxBodyHeight: 650,
                    exportButton: true,
                    exportAllData: true,
                    headerStyle: {
                        backgroundColor: '#01579b',
                        color: '#FFF'
                    }
                }}
            />

        </>
    );
}




const mapStateToProps = ({ productStore }) => ({  //2
    ReviewData: productStore.ReviewData,
    CurrentKeyword: productStore.CurrentKeyword,
    Currentnv_mid: productStore.Currentnv_mid,
    SearchTextField: productStore.SearchTextField,
    reviewLabels: productStore.reviewLabels,
});

const mapDispatchToProps = dispatch => {
    return {

        Search_TextField: SearchTextField => dispatch(Search_TextField(SearchTextField)),

    }
};

export default connect( // 스토어와 연결
    mapStateToProps,
    mapDispatchToProps,
)(ReviewTable);
