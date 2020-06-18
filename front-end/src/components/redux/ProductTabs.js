import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import ComputerIcon from '@material-ui/icons/Computer';

import MouseIcon from '@material-ui/icons/Mouse';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import styles from "assets/jss/material-kit-react/views/componentsSections/tabsStyle.js";
import categories from './categories';
const useStyles = makeStyles(styles);

export default function SectionTabs({ selected, onSelect }) {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <h3>
              <small>Tabs with Icons on Card</small>
            </h3>
            <CustomTabs
              headerColor="danger"
              tabs={[
                {
                  tabName: "Profile",
                  tabIcon: Face,
                },
                {
                  tabName: "Mouse",
                  tabIcon: MouseIcon,

                },
                {
                  tabName: "Notebook",
                  tabIcon: ComputerIcon,
                },
                {
                  tabName: "Mouse",
                  tabIcon: MouseIcon,
                }
              ]}

            />
          </GridItem>
        </GridContainer>

      </div>
    </div>
  );
}
