import React from "react";
import '../App.css';
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link, Route, Switch } from "react-router-dom";
import Clients from './Clients'
import ActionsPage from './ActionsPage'
import AllAnalise from "./AllAnalise";




const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  }
});

class Navbar extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes } = this.props;

    return (
        <div  className={classes.root}>
          <AppBar position="static">
            <Tabs style={{backgroundColor:"black"}}
              value={this.state.value}
              onChange={this.handleChange}
              variant="fullWidth"
            >
              <Tab label="Clients" component={Link} to="/clients" />
              <Tab label="Actions" component={Link} to="/actions" />
              <Tab label="Analytics"component={Link} to="/analytics" />
            </Tabs>
          </AppBar>

          <Switch>
            <Route path="/clients" component={Clients} />
            <Route path="/actions" component={ActionsPage}/>
            <Route path="/analytics" component={AllAnalise} />
          </Switch>
        </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Navbar);