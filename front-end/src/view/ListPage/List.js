import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
// sections for this page
import styles from "assets/jss/material-kit-react/views/components.js";
import ProductListContainer from "container/ProductListContainer";
import CategoryContainer from "container/CategoryContainer";

const useStyles = makeStyles(styles);

export default function Components(props) {
    const classes = useStyles();
    const { ...rest } = props;

    return (
        <div>
            <Header
                brand="List Page"
                rightLinks={<HeaderLinks />}
                fixed
                color="transparent"
                changeColorOnScroll={{
                    height: 400,
                    color: "white",
                }}
                {...rest}
            />
            <Parallax image={require("assets/img/think2.jpg")}  >
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem>
                            <div className={classes.brand}>
                                <h1 className={classes.title}></h1>
                                <h3 className={classes.subtitle}>

                                </h3>
                            </div>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>


            <div className={classNames(classes.main, classes.mainRaised)} >
                <body>
                    <div className={classes.sections}>
                        <div className={classes.container} >
                            <div >
                                <CategoryContainer />
                            </div>
                        </div>

                    </div>
                </body>
                <Footer />
            </div>
        </div>
    );
}
