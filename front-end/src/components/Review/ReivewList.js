import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
//import productStore from 'store/modules/productStore';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,

} from '@material-ui/core';

import ReviewTable from './ReviewTable';

//import { StatusBullet } from 'StatusBullet';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1000
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));


const ReviewList = props => {
  const { className, ...rest } = props;

  const classes = useStyles();


  const selectKeyword = props.CurrentKeyword;
  let viewKeyword;
  if (selectKeyword) {
    viewKeyword = selectKeyword;
  } else {
    viewKeyword = "전체보기";
  }
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
      raised="true"
    >
      <CardHeader
        color=""
        title={viewKeyword}
      />
      <Divider />
      <CardContent className={classes.content}>
      </CardContent>
      <ReviewTable />
      <Divider />
    </Card>
  );
};

ReviewList.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = ({ productStore }) => ({  //2

  CurrentKeyword: productStore.CurrentKeyword,
});

const mapDispatchToProps = dispatch => {
  return {

  }
};

export default connect( // 스토어와 연결
  mapStateToProps,
  mapDispatchToProps,
)(ReviewList);