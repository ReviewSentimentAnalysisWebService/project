import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import styles from "assets/jss/material-kit-react/components/customTabsStyle.js";
import ProductListContainer from "container/ProductListContainer";
import { Divider } from '@material-ui/core';

const useStyles = makeStyles(styles);

export default function CustomTabs(props) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, value) => {
    setValue(value);
  };
  //이거를 카테고리 바꾸는걸로 연결하면됨 ㅇㅋ? 
  const classes = useStyles();
  const { plainTabs, title, rtlActive, selected, onSelect, categoryList } = props;
  const cardTitle = classNames({
    [classes.cardTitle]: true,
    [classes.cardTitleRTL]: rtlActive
  });

  return (
    <div>
      <Card plain={selected} raised="true">
        <Divider />
        <CardHeader color="info"
          plain={selected}>
          {title !== undefined ? <div className={cardTitle}>{title}</div> : null}
          <Tabs
            value={value}
            onChange={handleChange}
            classes={{
              root: classes.tabsRoot,
              indicator: classes.displayNone
            }}
          >

            {categoryList.map(category => {
              return (
                <Tab
                  classes={{
                    root: classes.tabRootButton,
                    label: classes.tabLabel,
                    selected: classes.tabSelected,
                    wrapper: classes.tabWrapper
                  }}
                  label={category.third}
                  category={category.third}
                  activeClassName="active"
                  onClick={() => onSelect(category.third)}
                />
              );
            })}
          </Tabs>
        </CardHeader>
        <CardBody>
          <ProductListContainer />
        </CardBody>
      </Card>

    </div>
  );
}
//여기가 그냥 컨테이너로 들어가면?
CustomTabs.propTypes = {
  headerColor: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose"
  ]),
  title: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabName: PropTypes.string.isRequired,
      tabIcon: PropTypes.object,
      tabContent: PropTypes.node.isRequired
    })
  ),
  rtlActive: PropTypes.bool,
  plainTabs: PropTypes.bool
};
