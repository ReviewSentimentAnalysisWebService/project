import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import { Grid } from "@material-ui/core";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
// sections for this page
import styles from "assets/jss/material-kit-react/views/components.js";
import DBTest from 'dbComponent/DBTest';
import testImage from 'assets/img/팜플렛캡처.jpg';

const useStyles = makeStyles(styles);

export default function Components(props) {
    const classes = useStyles();
    const { ...rest } = props;

    return (
        <div>
            <Header
                brand="Main Page Design"
                rightLinks={<HeaderLinks />}
                fixed
                color="transparent"
                changeColorOnScroll={{
                    height: 400,
                    color: "white",
                }}
                {...rest}
            />
            <Parallax image={require("assets/img/night_view.jpg")}>
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem>
                            <div className={classes.brand}>
                                <h1 className={classes.title}>팀 : 공대감성</h1>
                                <h3 className={classes.subtitle}>
                                    감성 분석을 이용한 리뷰 분석
                                </h3>
                            </div>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>

            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.sections}>
                    <div className={classes.container}>

                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={2}>

                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <img src={testImage}></img>
                            </Grid>
                            <Grid item xs={12} sm={2}>

                            </Grid>

                        </Grid>

                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
