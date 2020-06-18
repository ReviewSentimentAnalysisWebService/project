import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Grid } from "@material-ui/core";
import { connect } from 'react-redux';
//import productStore from 'store/modules/productStore';
import { changeCurrentKeyword, changeCurrentProduct, changeReview, Change_ReviewNumber } from 'store/modules/productStore';
import ApiService from "ApiService";

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

const PieChart = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    reloadReview(props.Currentnv_mid)
    console.log("처음엔");
    changeCurrentKeyword("");
    Change_ReviewNumber("");
    // 처음실행부터 지금의 nv_mid값을 기준으로 리뷰 데이터를 select* from review where nv_mid=nv_mid로 가져온다
    //즉 여기서 리뷰의 갯수들을 체킹 가능하다.
  }, [props.Currentnv_mid]);
  //처음 실행될땐 이렇게 한다. 
  useEffect(() => {
    reloadData();
  }, [props.ReviewData])


  let titleString = props.CurrentProduct;

  function reloadData() {
    //const testString = props.CurrentKeyword;
    let kewordReview = props.ReviewData;
    // let searchText = kewordReview.filter(kewordReview => kewordReview.review.indexOf(testString) >= 0);
    let test = props.reviewLabels.map((label => label.keyword));
    //키워드만 받다가 다른것도 같이 받아서 일부러 이렇게 하는거 
    let searchText = test.map((label => kewordReview.filter(kewordReview => kewordReview.review.indexOf(label) >= 0)));
    let count = searchText.map((q => q.length));
    console.log("test", test);
    Change_ReviewNumber(count);
    // console.log("testString test", testString);
    // console.log("kewordReview test", kewordReview);
    // console.log("searchText test", searchText);
    // console.log("reviewLabels test", props.reviewLabels);
    // console.log("count test", count);
    // console.log("reviewNumber test", props.reviewNumber);
  };
  // let label = props.reviewLabels.map(k => k.keyword);
  // console.log("awfawefw", label);
  const data = {
    datasets: [
      {
        data: props.reviewNumber, // store에서 가져온 값 이걸 바꾸면 차트도 바뀌어야 됨 !!!!!!!!!!!!!!
        backgroundColor: ['#e53935', '#8e24aa', '#9fa8da', '#b2dfdb', '#80cbc4', '#e6ee9c', '#ffcc80', '#fff59d', '#90a4ae'],
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels: props.reviewLabels.map(k => k.keyword), // 보여주는 라벨들
  };

  const options = {
    legend: {
      display: true
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },

    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    },

  };
  const { changeCurrentKeyword, changeReview, Change_ReviewNumber } = props;
  const keywords = props.reviewLabels;
  // click 이벤트로 처리되는 label들을 지정해둔 곳  


  const keywordClick = (keyword) => {
    changeCurrentKeyword(keyword);
    // switch (keyword) {
    //   case "무게감":
    //     changeCurrentKeyword("무게감");
    //     break;
    //   case "클릭감":
    //     changeCurrentKeyword("클릭감");
    //     break;
    //   case "가격":
    //     changeCurrentKeyword("가격");
    //     break;
    //   case "배송":
    //     changeCurrentKeyword("배송");
    //     // reloadReview(props.Currentnv_mid);
    //     // console.log("prejaeorg", props.Currentnv_mid);
    //     break;
    //   default:
    //     changeCurrentKeyword("");
    //     break;
    // }
    console.log("changeCurrentKeyword", props.CurrentKeyword);
    //키워드가 바뀌는 곳에서 리뷰도 바뀌어야 된다.
  }

  function reloadReview(nv_mid) {
    ApiService.fetchproductReview(nv_mid)
      .then((res) => {
        changeReview(res.data);
        console.log("res.data", res.data);
      })
      .catch((err) => {
        console.log("reload error", err);
      });
  };
  //여기서 리뷰를 가져옴 nv_mid값을 기준으로 
  const reset = () => {
    changeCurrentKeyword("");
  }
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
      raised="true"
    >
      <CardHeader
        action={
          <IconButton size="small" onClick={reset}>

            <RefreshIcon />
          </IconButton>
        }
        title={titleString}
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut
            data={data}
            options={options}
          />
        </div>

        <div><p>Click Keyword </p></div>
        <div className={classes.stats}>
          <Grid container spacing={1}>
            {keywords.map(keywordLabels => (
              <Grid item xs={12} sm={6}>
                <Button variant="outlined" fullWidth='true' color="primary" onClick={() => keywordClick(keywordLabels.keyword)} >{keywordLabels.keyword}</Button>
              </Grid>

            ))}
          </Grid>
        </div>
      </CardContent>
    </Card >
  );
};

PieChart.propTypes = {
  className: PropTypes.string
};
const mapStateToProps = ({ productStore }) => ({  //2
  CurrentProduct: productStore.CurrentProduct,
  CurrentKeyword: productStore.CurrentKeyword,
  reviewNumber: productStore.reviewNumber,
  reviewLabels: productStore.reviewLabels,
  ReviewData: productStore.ReviewData,
  Currentnv_mid: productStore.Currentnv_mid,
  SearchTextField: productStore.SearchTextField,

});

const mapDispatchToProps = dispatch => {
  return {
    changeCurrentProduct: CurrentProduct => dispatch(changeCurrentProduct(CurrentProduct)),
    changeCurrentKeyword: CurrentKeyword => dispatch(changeCurrentKeyword(CurrentKeyword)),
    changeReview: ReviewData => dispatch(changeReview(ReviewData)),
    Change_ReviewNumber: reviewNumber => dispatch(Change_ReviewNumber(reviewNumber)),

  }
};

export default connect( // 스토어와 연결
  mapStateToProps,
  mapDispatchToProps,
)(PieChart);

