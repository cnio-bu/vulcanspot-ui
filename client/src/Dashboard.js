import React from 'react';
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
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Treatments from './Treatments';
import MultiSelector from './MultiSelector';
import Dropdown from './Dropdown';
import ScoreSlider from './ScoreSlider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import queryString from 'query-string';

import logo from './img/logo.png';

const drawerWidth = 240;

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
  filtersPanel: {
    padding: theme.spacing.unit * 3,
  },
  selectContainer: {
      marginBottom:20,
  },
  tableContainer: {
    height: 320,
  },
});

class Dashboard extends React.Component {
  state = {
    open: false,
    selectedGenesA: [],
    selectedGenesB: [],
    selectedContexts: [],
    contexts : [],
    gdcancer: false,
    //order: 'lethality',
    rscore: 0.0,
    fdr: 0.25,
    skew: -0.5
  };

  componentDidMount() {
      let params = queryString.parse(this.props.location.search);
      if("genesA" in params){
        this.setState({selectedGenesA:params.genesA.split(",")});
      }
      if("contexts" in params){
        this.setState({selectedContexts:params.contexts.split(",")});
      }
  }

  modifyQuery = (key,val) => {
    let props = queryString.parse(this.props.location.search);
    let q = "";
    if(val.length > 0){
        q += "&" + key + "=" + val.join(",")
    }
    Object.keys(props).forEach((k) => {
        if(k !== key){
            q += "&" + k + "=" + props[k]
        }
    });
    q = "?" + q.substring(1, q.length);
    this.props.history.push({
        pathname: '/treatments',
        search: q
    });
  };

  handleGenesA = (selectedGenesA) => {
    this.modifyQuery("genesA",selectedGenesA);
    this.setState({ selectedGenesA: selectedGenesA });
  };

  handleGenesB = (selectedGenesB) => {
    this.setState({ selectedGenesB: selectedGenesB });
  };

  handleContexts = (selectedContexts) => {
    this.setState({ selectedContexts: selectedContexts });
  };

  handleGDScore = (score) => {
    this.setState({ rscore: score });
  };

  handleFDR = (fdr) => {
    this.setState({ fdr: fdr });
  };

  handleSkewness = (skew) => {
    this.setState({ skew: skew });
  };

  handleDataChange = (data) => {
    this.setState({ contexts: data.contexts });
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChkChange = name => event => {
      this.setState({ [name]: event.target.checked });
  };

  //handleOrderChange = event => {
  //  this.setState({ order: event.target.value });
  //};

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
              <img alt="" src={logo} />
              <Typography variant="title" color="inherit" noWrap className={classes.title}>
                VulcanSpot
              </Typography>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
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
            <List>{mainListItems}</List>
            <Divider />
            <List>{secondaryListItems}</List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />

                    <Paper style={{padding:10}} square={true}>
                           <MultiSelector label='genes' items={this.state.selectedGenesA} onChange={this.handleGenesA} />
                    </Paper>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="body1" component="h3">
                                Filters
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid container spacing={24}>
                                <Grid item xs>
                               <Dropdown label='contexts' items={this.state.contexts} onChange={this.handleContexts} />
                            </Grid>
                            <Grid item xs>
                               <MultiSelector label='genes' onChange={this.handleGenesB} />
                            </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                        <ExpansionPanelDetails>
                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <ScoreSlider initVal={this.state.rscore} label="Min. GD Score" onScoreChange={this.handleGDScore} />
                                </Grid>
                                <Grid item xs>
                                    <ScoreSlider initVal={this.state.skew} min={-7} max={7} step={0.5} label="Min. skewness" onScoreChange={this.handleSkewness} />
                                </Grid>
                                <Grid item xs>
                                    <ScoreSlider initVal={this.state.fdr} label="Max. FDR" step={0.01} onScoreChange={this.handleFDR} />
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                        <ExpansionPanelDetails>
                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={this.state.gdcancer} onChange={this.handleChkChange('gdcancer')} value="gdcancer" color="primary" />
                                        }
                                        label={<Typography variant="caption">GDs on cancer genes</Typography>}
                                    />
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
            <div className={classes.tableContainer}>
                <Treatments gdcancer={this.state.gdcancer} skew={this.state.skew} fdr={this.state.fdr} rscore={this.state.rscore} contexts={this.state.contexts} selectedContexts={this.state.selectedContexts} genesB={this.state.selectedGenesB} genesA={this.state.selectedGenesA} onDataChange={this.handleDataChange} />
            </div>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
