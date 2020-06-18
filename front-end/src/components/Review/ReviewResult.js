import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import CardReview from "../Card/CardReview";
import { connect } from 'react-redux';
import { Grid } from "@material-ui/core";
import ApiService from "ApiService";

import { changeReviewSentence, changeBestSentence } from 'store/modules/productStore';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));
const ReviewResult = props => {
    const classes = useStyles();
    const strBest = "★★★『최고의 상품평』★★★";
    const strWorst = "☆☆☆『최악의 상품평』☆☆☆";
    const colorBest = "#f1f8e9"
    const colorWorst = "#fce4ec"
    // const reviewSentence = props.reviewSentence;
    let len;
    let best = [];
    let worst = [];

    const sentence = props.ReviewSentence.map(b => b);
    console.log("sentence", sentence);
    len = sentence.length;
    // const result = (senti) => {
    //     //긍정은 1
    //     //부정은 0
    //     if (senti < 0.25) {
    //         console.log("senti", senti);
    //         return 0;
    //     } else if (senti >= 0.25 && senti < 0.55) {
    //         return -1;
    //     } else {
    //         return 1;
    //     }
    // }
    // sentence.forEach(e => e.avg_senti_score = result(e.avg_senti_score));
    best = sentence.filter(e => e.avg_senti_score < 0.25); //긍정
    worst = sentence.filter(e => e.avg_senti_score > 0.55); //부정 
    console.log("긍정부정 best", best);
    console.log("긍정부정 worst", worst);

    const keywords = props.reviewLabels;
    const keywordFilter = keywords.filter(k => k.keyword == "기타" || k.keyword == "배송");
    const filterBest = best.filter(best => best.keywordGroup.indexOf(keywordFilter[0].key_id) < 0);
    const filterWorst = worst.filter(worst => worst.keywordGroup.indexOf(keywordFilter[0].key_id) < 0);
    // const filter2 = filter1.filter(best => best.keywordGroup.indexOf(keywordFilter[1].key_id) < 0);
    const sortingField = "avg_senti_score";
    filterBest.sort(function (a, b) {
        return a[sortingField] - b[sortingField];
    });

    filterWorst.sort(function (a, b) {
        return b[sortingField] - a[sortingField];
    });

    console.log("긍정부정 filterbest", filterBest);
    console.log("긍정부정 filterWorst", filterWorst);
    // console.log("긍정부정 나누기2", sentenceResult);
    // if (sentence != null && len > 1) {
    //     best = sentence.silce(0, 2);
    //     worst = sentence.silce(len - 2, len);
    // }

    // len = props.ReviewSentence.length;
    // if (props.ReviewSentence != null && len > 1) {

    //     best = props.ReviewSentence.silce(0, 2);
    //     worst = props.ReviewSentence.silce(len - 2, len);
    // }
    // else {
    //     len = 0;
    // }
    useEffect(() => {
        loadSentence(props.Currentnv_mid);
    }, [props.Currentnv_mid])


    function loadSentence(nv_mid) {
        ApiService.fetchReviewSentence(nv_mid)
            .then((res) => {
                props.changeReviewSentence(res.data);
                console.log("reviewResult.nv_mid", nv_mid);
                console.log("reviewResult.data", res.data);
                console.log("reviewResult.ReviewSentence", props.ReviewSentence);

            })
            .catch((err) => {
                console.log("reload error", err);
            });
    };


    // const best = props.BestReview;
    // const worst = props.WorstReview;
    // const [bestSentence, setBestSentence] = useState([]);
    // const [wosrtSentence, setWorstSentence] = useState([]);
    // const first = (best.slice(0, 2));
    // const end = (worst.slice(0, 2));
    // console.log("최고", props.BestReview);
    // console.log("최저", props.WorstReview);
    // useEffect(() => {

    //     if (first[0] != null) {
    //         setBestSentence([]);
    //         setWorstSentence([]);
    //         loadSentence(first[0].review_id);
    //         loadSentence(first[1].review_id);
    //         loadSentence(end[0].review_id);
    //         loadSentence(end[1].review_id);
    //         // props.changeBestSentence(bestSentence);
    //         // console.log("props", props.BestSentence);
    //     }

    // }, [props.BestReview])

    // function loadSentence(review_id) {
    //     ApiService.fetchSentimentalReviewSentence(review_id)
    //         .then((res) => {
    //             console.log("res.review_id", review_id);
    //             const s = res.data;
    //             let sentence = "";
    //             for (var i = 0; i < s.length; i++) {
    //                 if (s.length < 10) {
    //                     sentence = sentence + s[i].sentence;
    //                 }
    //             }
    //             setBestSentence(bestSentence.push(sentence));
    //             props.changeBestSentence(bestSentence);
    //             console.log("여기에 나와야됨 res.sentence", sentence);
    //             console.log("여기에 나와야됨 res.review_id", bestSentence);
    //         })
    //         .catch((err) => {
    //             console.log("reload error", err);
    //         });
    // };
    // console.log("여기에 ?!?!? res.review_id", bestSentence);
    return (
        <div>
            <Grid container spacing={4}>
                {filterBest.slice(0, 2).map(e =>
                    <Grid item xs={12} sm={6}>
                        <CardReview data={e.total_sentence} str={strBest} colorData={colorBest} />
                    </Grid>
                )}

                {filterWorst.slice(0, 2).map(e =>
                    <Grid item xs={12} sm={6}>
                        <CardReview data={e.total_sentence} str={strWorst} colorData={colorWorst} />
                    </Grid>
                )}
            </Grid>
        </div>
    );
}
const mapStateToProps = ({ productStore }) => ({  //2
    BestReview: productStore.BestReview,
    WorstReview: productStore.WorstReview,
    BestSentence: productStore.BestSentence,
    ReviewSentence: productStore.ReviewSentence,
    Currentnv_mid: productStore.Currentnv_mid,
    reviewLabels: productStore.reviewLabels,

});

const mapDispatchToProps = dispatch => {
    return {

        changeReviewSentence: ReviewSentence => dispatch(changeReviewSentence(ReviewSentence)),
        changeBestSentence: BestSentence => dispatch(changeBestSentence(BestSentence)),
    }
};

export default connect( // 스토어와 연결
    mapStateToProps,
    mapDispatchToProps,
)(ReviewResult);