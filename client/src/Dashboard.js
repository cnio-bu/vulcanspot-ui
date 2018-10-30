import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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

const styles = theme => ({
  root: {
    display: 'flex',
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
    selectedGenesA: [],
    selectedGenesB: [],
    selectedContexts: [],
    contexts : [],
    gdcancer: false,
    //order: 'lethality',
    rscore: 0.0,
    fdr: 0.25,
    skew: -0.5
  }

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

  handleChkChange = name => event => {
      this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;

    return (
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />

                    <Paper style={{padding:10}} square={true}>
                           <MultiSelector apiPath='genes' label='genes A' items={this.state.selectedGenesA} onChange={this.handleGenesA} />
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
                               <MultiSelector apiPath='genes' label='genes B' onChange={this.handleGenesB} />
                            </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                        <ExpansionPanelDetails>
                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <ScoreSlider initVal={this.state.rscore} label="Min. GD Score" onScoreChange={this.handleGDScore} />
                                </Grid>
                                {/*<Grid item xs>
                                    <ScoreSlider initVal={this.state.skew} min={-7} max={7} step={0.5} label="Min. skewness" onScoreChange={this.handleSkewness} />
                                </Grid>*/}
                                <Grid item xs>
                                    <ScoreSlider initVal={this.state.fdr} label="Max. FDR" step={0.01} max={0.25} onScoreChange={this.handleFDR} />
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
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
