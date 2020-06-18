import React, { useEffect, useState } from 'react';
import { Radar } from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ApiService from "ApiService";
import {
    Card,
    CardHeader,
    CardContent,
    IconButton,
    Divider,
    Typography
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Grid } from "@material-ui/core";
import { connect } from 'react-redux';
import productStore from 'store/modules/productStore';
import { changeCurrentKeyword, changeCurrentProduct, changeSentimentalData, changeSentimentalNumber, change_SentimentalLabels } from 'store/modules/productStore';
import testData from './data';
import ReviewResult from "../../../components/Review/ReviewResult";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%'
    },
    chartContainer: {
        position: 'relative',
        height: '300px'
    },
    stats: {
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center'
    },
    device: {
        textAlign: 'center',
        padding: theme.spacing(1)
    },
    deviceIcon: {
        color: theme.palette.icon
    }
}));

const RadarChart = props => {
    const { className, ...rest } = props;
    const classes = useStyles();
    const theme = useTheme();
    let titleString = props.CurrentProduct;
    const [result, setResult] = useState();

    // useEffect(() => {
    //     reloadSentimental(props.Currentnv_mid)
    //     changeCurrentKeyword("");
    //     reloadData();
    //     console.log("useEffect한번만");
    // }, [])
    useEffect(() => {
        reloadSentimental(props.Currentnv_mid)
        changeCurrentKeyword("");
        //reloadData();
        console.log("useEffect");
    }, [props.Currentnv_mid]);
    // 처음 실행될땐 이렇게 한다. 
    useEffect(() => {
        reloadData();
    }, [props.SentimentalData])
    //기타 전부 제외한거 
    function reloadData() {
        let data = props.SentimentalData;
        let test = props.reviewLabels.map((label => label.keyword));
        // console.log("차트테스트", props.SentimentalData);
        // console.log("차트테스트", props.reviewLabels);
        test = test.filter((test => test.indexOf("배송") < 0 && test.indexOf("기타")));
        props.change_SentimentalLabels(test);
        //console.log("차트테스트", props.SentimentalLabel);
        let searchText = test.map((label => data.filter(data => data.sentence.indexOf(label) >= 0)));
        let count = searchText.map((q => q.length));
        let pos = test.map((label => data.filter(data => data.sentence.indexOf(label) >= 0 && data.senti_score < 0.25)));
        let posCount = pos.map((q => q.length));
        console.log("전체", count);
        console.log("긍정", posCount);
        for (var i = 0; i < count.length; i++) {
            let nav = count[i] - posCount[i]; //부정문장의 개수
            count[i] = posCount[i] / (count[i] + nav * 5);
            // count[i] = count[i].substring(0.4);
        }
        props.changeSentimentalNumber(count);
        setResult(count);
        // 정석 count 
        // for (var i = 0; i < count.length; i++) {
        //     count[i] = posCount[i] / count[i];
        // }

        // 긍정문 / count 
        console.log("count", count);
        // 키워드가 언급된 횟수
        // senti_score
        // quality_score
        // let percentFilter = data.filter((data => data.senti_score >= 0.5 && data.quality_score >= 0.5));
        // let percentText = test.map((label => percentFilter.filter(percentFilter => percentFilter.sentence.indexOf(label) >= 0)));
        // let percentCount = percentText.map((q => q.length));
        // console.log("sentimental count", count);
        // console.log("sentimental percentCount", percentCount);
        //여기 차트에 찍을 데이터 넣는 곳 .
    };

    function reloadSentimental(nv_mid) {
        ApiService.fetchSentimentalReview(nv_mid)
            .then((res) => {
                props.changeSentimentalData(res.data);
                console.log("changeSentimentalData", res.data);
            })
            .catch((err) => {
                console.log("reload error", err);
            });
    };
    //여기서 리뷰를 가져옴 nv_mid값을 기준으로 
    const reset = () => {
        changeCurrentKeyword("");
    }
    //console.log("wefwefa", props.reviewLabels);
    const data = {
        // labels: props.reviewLabels.map(k => k.keyword),
        labels: props.SentimentalLabel,
        datasets: [
            {
                label: props.CurrentProduct,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                PointBackgroundColor: 'rgba(255,99,132,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255,99,132,1)',
                data: props.SentimentalNumber,
            },
            // {
            //     label: 'My Second dataset',
            //     backgroundColor: 'rgba(54, 162, 235, 0.2)',
            //     borderColor: 'rgb(54, 162, 235)',
            //     PointBackgroundColor: 'rgba(255,99,132,1)',
            //     pointBorderColor: '#fff',
            //     pointHoverBackgroundColor: '#fff',
            //     pointHoverBorderColor: 'rgba(255,99,132,1)',
            //     data: [28, 48, 40, 19, 96]
            // }
        ]
    };
    const options = {
        scale: {
            ticks: {
                beginAtZero: true,

            },
        },
        legend: {
            display: true,
            position: 'top'
        },
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        cutoutPercentage: 800,
        layout: { padding: 4 },

        tooltips: {

            mode: 'index',
            borderWidth: 1,

        },

    };

    console.log("result", result);
    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
            raised="true"
        >
            <CardHeader
                action={
                    <IconButton size="small">
                        <RefreshIcon />
                    </IconButton>
                }
                title={titleString}
            />
            <Divider />
            <CardContent>
                <div className={classes.chartContainer}>
                    <Radar
                        data={data}
                        options={options}
                        width={100}
                        height={400}
                    />
                </div>


            </CardContent>
        </Card >
    );
};

RadarChart.propTypes = {
    className: PropTypes.string
};
const mapStateToProps = ({ productStore }) => ({  //2
    CurrentProduct: productStore.CurrentProduct,
    CurrentKeyword: productStore.CurrentKeyword,
    Currentnv_mid: productStore.Currentnv_mid,
    SentimentalLabel: productStore.SentimentalLabel,
    SentimentalNumber: productStore.SentimentalNumber,
    ReviewData: productStore.ReviewData,
    reviewLabels: productStore.reviewLabels,
    SentimentalData: productStore.SentimentalData,
});

const mapDispatchToProps = dispatch => {
    return {
        changeCurrentProduct: CurrentProduct => dispatch(changeCurrentProduct(CurrentProduct)),
        changeCurrentKeyword: CurrentKeyword => dispatch(changeCurrentKeyword(CurrentKeyword)),
        changeSentimentalData: SentimentalData => dispatch(changeSentimentalData(SentimentalData)),
        changeSentimentalNumber: SentimentalNumber => dispatch(changeSentimentalNumber(SentimentalNumber)),
        change_SentimentalLabels: SentimentalLabel => dispatch(change_SentimentalLabels(SentimentalLabel)),
    }
};

export default connect( // 스토어와 연결
    mapStateToProps,
    mapDispatchToProps,
)(RadarChart);

