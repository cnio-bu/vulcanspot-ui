import React, { Component } from 'react';
import { Route,Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import Help from './Help';
import About from './About';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItems from './ListItems';
import Api from './Api';

import logo from './img/vulcan.logo.png';
import bulogo from './img/bu_cnio.logo.png';
import cniologo from './img/cnio.logo.png';
import inbelixirlogo from './img/inbelixir.logo.png';

const drawerWidth = 240;

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    paddingLeft: 10
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  logo: {
      paddingLeft:10,
      paddingRight:10,
  },
  appBarBottom: {
    top: 'auto',
    bottom: 0,
    backgroundColor: 'white'
  },
});

class App extends Component {
  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
          >
            <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.state.open && classes.menuButtonHidden,
                )}
              >
                <MenuIcon />
              </IconButton>
              <Link to="/">
              <img alt="" style={{height:55, outline: 'none'}} src={logo} />
              </Link>
              <Typography variant="subtitle1" color="inherit" noWrap>
                &nbsp; - A method for detecting and targeting cancer genetic dependencies.
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="temporary"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List><ListItems onSelect={this.handleDrawerClose}/></List>
            <Divider />
            <div style={{paddingLeft:10}}>
                <Typography variant="caption">
                    vulcanSpot v1.0.0b
                    <br />
                    Release date: 01/01/1900
                </Typography>
            </div>
          </Drawer>
        <Route exact path="/" component={Dashboard}/>
        <Route path="/treatments" component={Dashboard}/>
        <Route path="/help" component={Help}/>
        <Route path="/about" component={About}/>
        <Route path="/api" component={Api}/>

          <AppBar position="fixed" className={classes.appBarBottom}>
            <Toolbar className={classes.toolbar}>
                        <a href="http://bioinformatics.cnio.es/" target="_blank" className={classes.logo} rel="noopener noreferrer"><img alt="Bioinformatics Unit" src={bulogo} style={{height:50}}/></a>
                        <a href="http://www.cnio.es/ing/" target="_blank" className={classes.logo} rel="noopener noreferrer"><img src={cniologo} alt="CNIO" style={{height:30}}/></a>
                        <a href="https://inb-elixir.es/" target="_blank" className={classes.logo} rel="noopener noreferrer"><img src={inbelixirlogo} alt="INB/Elixir-ES" style={{height:30}}/></a>
                        <Typography variant='caption'>
                            Disclaimer: vulcanSpot is intended for research purposes exclusively. It should not be used for medical or professional advice.
                        </Typography>
            </Toolbar>
          </AppBar>
        </div>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
