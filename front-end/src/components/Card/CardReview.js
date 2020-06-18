import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { connect } from 'react-redux';
import ReviewResult from "../Review/ReviewResult";
import { Grid } from "@material-ui/core";
import Highlighter from "react-highlight-words";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 750,
        height: 250,
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    avatar: {
        backgroundColor: red[500],
    },
    margin: {
        marginLeft: theme.spacing(2),
    },
}));

const CardReview = (props) => {
    const classes = useStyles();
    const data = props.data;
    const colorData = props.colorData;
    let search = props.reviewLabels.map(k => k.keyword);
    console.log("props.reviewLabels", props.reviewLabels);
    return (
        <Card className={classes.root} raised="true" style={{ backgroundColor: colorData }} >
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2" align="center">

                    <Highlighter
                        // searchWords={[search[0].keyword]}
                        searchWords={["최고", "최악"]}
                        autoEscape={true}
                        textToHighlight={props.str}>
                    </Highlighter>
                    {/* {props.str} */}
                </Typography>
                <Highlighter
                    // searchWords={[search[0].keyword]}
                    searchWords={search}
                    autoEscape={true}
                    textToHighlight={data}>
                </Highlighter>
                {/* <Typography variant="body2" color="textSecondary" component="p">{str} </Typography> */}
            </CardContent>
        </Card>
    );
};

const mapStateToProps = ({ productStore }) => ({  //2
    reviewLabels: productStore.reviewLabels,

});

const mapDispatchToProps = dispatch => {
    return {

    }
};

export default connect( // 스토어와 연결
    mapStateToProps,
    mapDispatchToProps,
)(CardReview);

