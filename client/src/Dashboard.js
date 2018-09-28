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
import Therapies from './Therapies';
import GeneSelect from './GeneSelect';
import ContextSelect from './ContextSelect';
import ScoreSlider from './ScoreSlider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    selectedGenes: [],
    selectedContexts: [],
    gdcancer: true,
    order: 'order1',
    rscore: 0.3,
    fdr: 0.05,
    skew: -5
  };

  handleGenes = (selectedGenes) => {
    this.setState({ selectedGenes: selectedGenes });
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

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChkChange = name => event => {
      this.setState({ [name]: event.target.checked });
  };

  handleOrderChange = event => {
    this.setState({ order: event.target.value });
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
            <Grid container spacing={8}>
                <Grid item xs={8}>
                    <Paper style={{padding:10}} square={true}>
                        <Typography component="div" className={classes.selectContainer}>
                           <GeneSelect onGenesChange={this.handleGenes} />
                        </Typography>
                        <Typography component="div" className={classes.selectContainer}>
                           <ContextSelect onContextChange={this.handleContexts} />
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="body1" component="h3">
                                Advanced filters
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid container spacing={0}>
                                <Grid item xs={6}>
                                    <ScoreSlider initVal={this.state.rscore} label="Min. GD Score" onScoreChange={this.handleGDScore} />
                                    <ScoreSlider initVal={this.state.skew} min={-7} max={7} step={0.5} label="Min. skewness" onScoreChange={this.handleSkewness} />
                                </Grid>
                                <Grid item xs={6}>
                                    <ScoreSlider initVal={this.state.fdr} label="Max. FDR" step={0.01} onScoreChange={this.handleFDR} />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={this.state.gdcancer} onChange={this.handleChkChange('gdcancer')} value="gdcancer" color="primary" />
                                        }
                                        label="GDs on cancer genes"
                                    />
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="body1" component="h3">
                                Order (not implemented)
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <RadioGroup
                                    aria-label="Gender"
                                    name="gender1"
                                    className={classes.group}
                                    value={this.state.order}
                                    onChange={this.handleOrderChange}
                                >
                                    <FormControlLabel value="order1" control={<Radio />} label="Order1" />
                                    <FormControlLabel value="order2" control={<Radio />} label="Order2" />
                                    <FormControlLabel value="order3" control={<Radio />} label="Order3" />
                                </RadioGroup>
                            </FormControl>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Grid>
            </Grid>
            <div className={classes.tableContainer}>
              <Therapies skew={this.state.skew} fdr={this.state.fdr} rscore={this.state.rscore} contexts={this.state.selectedContexts} genes={this.state.selectedGenes} />
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
