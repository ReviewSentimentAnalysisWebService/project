import React, { useEffect } from 'react';
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
import mockData from './data';
import { red, green } from '@material-ui/core/colors';
import { Search_TextField, changeBestReview, changeWorstReview, Search_SentiField } from 'store/modules/productStore';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import SentimentDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentDissatisfiedOutlined';
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
const SentimentalTable = props => {
    //columns는 고정이니까 그냥 둔다. 
    const titleString = '감성분석 결과';
    // const kewordReview = props.ReviewData;
    const initData = props.SentimentalData;
    const filterScore = initData.filter(initData => initData.senti_score < 0.25 || initData.senti_score > 0.55);
    //const filterKeyword = filterScore.filter(filterScore => filterScore.key_id.indexOf("배송") < 0);
    const keywords = props.reviewLabels;
    const keywordFilter = keywords.filter(k => k.keyword == "기타" || k.keyword == "배송");
    const filter1 = filterScore.filter(filterScore => filterScore.key_id != (keywordFilter[0].key_id));
    const filter2 = filter1.filter(filterScore => filterScore.key_id != (keywordFilter[1].key_id));
    //두 키워드에 대한 필터링 처리 
    // console.log("제발나와라", keywordFilter);
    // console.log("제발나와라", filter1);
    // console.log("제발나와라", filter2);

    //const asdf = filterScore.filter(filterScore => filterScore.key_id == (keywordFilter[0].key_id)); 이렇게하면 배송관련된 키워드만 나온다 -> 2743개  

    // const filterKeyword = filterScore.filter(filterScore => filterScore.sentence.indexOf("배송") < 0);
    // console.log("비교", filterKeyword);
    const SentimentalData = filter2.filter(filter2 => filter2.quality_score > 0.1);
    // 퀄리트 점수 0점 미만은 잘라버리고 
    console.log("table2", SentimentalData);

    //라벨로 비교하는거
    const filterLabels = keywords.map(label => SentimentalData.filter(keywordReivew => keywordReivew.sentence.indexOf(label) >= 0));
    //const filterLabels = keywordFilter.map(label => SentimentalData.filter(keywordReivew => keywordReivew.sentence.indexOf(label) >= 0));

    // let searchText = test.map((label => kewordReview.filter(kewordReview => kewordReview.review.indexOf(label) >= 0)));

    console.log("연습용2 ", filterLabels);
    let filterTest;

    //


    const cutScore = (data) => {
        return String(data).substring(0, 4);
    }
    const result = (senti) => {
        // 식을 주면 
        //senti -> 감성분석 결과
        //qual -> 유용도
        // 감성분석 결과 + 유용도 -> 최종결과
        // 기준은 0.25 미만은 긍정

        //0.25 이상은 부정이다가 아니라
        //0.25부터 0.55 사이는 return null
        // 0.55 이상은 부정 
        if (senti < 0.25) {
            //긍정
            return "긍정";
        } else if (senti >= 0.25 && senti < 0.55) {
            //어차피 위에서 필터링 해서 안나옴 
            return -1;
        } else {
            return "부정";
        }
    }
    SentimentalData.forEach(e => e.sentence_number = result(e.senti_score));
    const viewIcons = (senti) => {

        if (senti == "긍정") {
            //긍정
            return <SentimentSatisfiedOutlinedIcon style={{ color: green[500] }} />;
        } else {
            return <SentimentDissatisfiedOutlinedIcon style={{ color: red[500] }} />
        }
    }
    // 리뷰 점수는 낮은게 좋은거
    // 퀄리티 점수는 높은게 좋은거 
    // 퀄리티 점수 - 리뷰점수 하면 제일 좋은거
    // 빈 배열을 들어가서 에러가뜬다. 
    const sortingFieldSenti = "senti_score";
    const sortingFieldQuality = "quality_score";
    SentimentalData.sort(function (a, b) { // 낮은거 먼저나오게
        return (b[sortingFieldQuality] - b[sortingFieldSenti]) - (a[sortingFieldQuality] - a[sortingFieldSenti]);
        // return a[sortingField] - b[sortingField];

    });
    let len = SentimentalData.length;
    const fetchBest = () => {
        // 퀄 좋고 긍정적인 리뷰
        // 퀄 좋고 부정적인 리뷰 
        var best = [];
        var worst = [];
        var count = 0;
        for (var i = 0; i < SentimentalData.length; i++) {
            if (SentimentalData[i].key_id == "부정") {
                worst.push(SentimentalData[i]);
                count++;
            }
            if (count == 2)
                break;
        }
        count = 0;
        for (var i = 0; i < SentimentalData.length; i++) {
            if (SentimentalData[i].key_id == "긍정") {
                best.push(SentimentalData[i]);
                count++;
            }
            if (count == 2)
                break;
        }

        console.log("best 테스트", best);
        console.log("worst 테스트", worst);
        props.changeBestReview(best);
        props.changeWorstReview(worst);

    }
    useEffect(() => {
        fetchBest();

    }, [props.Currentnv_mid, props.SentimentalData]);

    // console.log("최고 테스트", SentimentalData[0]);
    // const Best = SentimentalData[1].sentence;
    // props.changeBestReview(Best);
    const [state, setState] = React.useState({
        columns: [
            { title: '리뷰내용', field: 'sentence', render: rowData => <DialogReview data={rowData.sentence} /> },
            { title: '리뷰 감성', field: 'senti_score', render: rowData => <div>{cutScore(rowData.senti_score)} </div> },
            { title: '리뷰 퀄리티', field: 'quality_score', render: rowData => <div>{cutScore(rowData.quality_score)} </div> },
            { title: '분석결과', field: 'key_id', render: rowData => <div>{viewIcons(rowData.sentence_number)} </div> },
            //{ title: '분석결과', field: 'result', render: rowData => <div>{(viewIcons(rowData.senti_score))} </div> },
        ],
    });

    const test = (d) => {
        props.Search_SentiField(d);
        //다음에도 바뀌는걸 즉시 반영할땐 (e) => method(e) 하면되겠다......
        //  console.log("dfwaefwef", d);
    }
    //const kewordReview = mockData.keyword1_data;
    return (
        <>
            <MaterialTable
                title={titleString}
                columns={state.columns}
                data={SentimentalData}
                icons={tableIcons}
                onSearchChange={(e) => test(e)}
                options={{
                    pageSize: 20,
                    pageSizeOptions: [20, 40, 60, 80, 100],
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
    SentimentalData: productStore.SentimentalData,
    Currentnv_mid: productStore.Currentnv_mid,
    SearchSentiField: productStore.SearchSentiField,
    reviewLabels: productStore.reviewLabels,
});

const mapDispatchToProps = dispatch => {
    return {
        changeBestReview: BestReview => dispatch(changeBestReview(BestReview)),
        changeWorstReview: WorstReview => dispatch(changeWorstReview(WorstReview)),
        Search_SentiField: SearchSentiField => dispatch(Search_SentiField(SearchSentiField)),
    }
};

export default connect( // 스토어와 연결
    mapStateToProps,
    mapDispatchToProps,
)(SentimentalTable);