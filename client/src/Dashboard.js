import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Treatments from './Treatments';
import MultiSelector from './MultiSelector';
import Dropdown from './Dropdown';
import ScoreSlider from './ScoreSlider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import qs from 'qs';

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
    skew: -0.5,
    expandedFilters: false
  }

  componentDidMount() {
      let params = qs.parse(this.props.location.search);
      if("genesA" in params){
        this.setState({selectedGenesA:params.genesA.split(",")});
      }
      if("contexts" in params){
        this.setState({selectedContexts:params.contexts.split(",")});
      }
  }

  modifyQuery = (key,val) => {
    let props = qs.parse(this.props.location.search);
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

loadExample = n => {
    this.setState({expandedFilters: true});
    let genesA, contexts, genesB, gdscore, fdr, gdcancer;

    switch(n){
        case 1:
            genesA = ['TP53','BCL2'];
            contexts = ['PANCANCER'];
            genesB = ['BCL2','CDK6'];
            gdscore = 0;
            fdr = 0.25;
            gdcancer = false;
            break;
        case 2:
            genesA = ['TP53'];
            contexts = ['BREAST'];
            genesB = [];
            gdscore = 0.1;
            fdr = 0.20;
            gdcancer = true;
            break;
        case 3:
            genesA = ['BCL2'];
            contexts = [];
            genesB = ['SUZ12'];
            gdscore = 0;
            fdr = 0.25;
            gdcancer = false;
            break;
        default:
            break
    }

    this.setState({
        selectedGenesA: genesA,
        selectedGenesB: genesB,
        selectedContexts: contexts,
        gdcancer: gdcancer,
        rscore: gdscore,
        fdr: fdr
    });
};

  render() {
    const { classes } = this.props;

    return (
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />

                    <Paper style={{textAlign:'right',padding:10}} square={true}>
                           <MultiSelector apiPath='genes?class=A' label='genes A' items={this.state.selectedGenesA} onChange={this.handleGenesA} />
                            <Tooltip title='Description for example 1'>
                               <Button mini aria-label="example1" className={classes.button} onClick={()=>this.loadExample(1)}>Example 1</Button>
                            </Tooltip>
                            <Tooltip title='Description for example 2'>
                           <Button mini aria-label="example2" className={classes.button} onClick={()=>this.loadExample(2)}>Example 2</Button>
                            </Tooltip>
                            <Tooltip title='Description for example 3'>
                           <Button mini aria-label="example3" className={classes.button} onClick={()=>this.loadExample(3)}>Example 3</Button>
                            </Tooltip>
                    </Paper>
                    <ExpansionPanel expanded={this.state.expandFilters}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="body1" component="h3">
                                Filters
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid container spacing={24}>
                                <Grid item xs>
                               <Dropdown label='contexts' items={this.state.contexts} selectedItems={this.state.selectedContexts} onChange={this.handleContexts} />
                            </Grid>
                            <Grid item xs>
                               <MultiSelector apiPath='genes?class=B' label='genes B' items={this.state.selectedGenesB} onChange={this.handleGenesB} />
                            </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                        <ExpansionPanelDetails>
                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <ScoreSlider val={this.state.rscore} label="Min. GD Score" onScoreChange={this.handleGDScore} />
                                </Grid>
                                {/*<Grid item xs>
                                    <ScoreSlider val={this.state.skew} min={-7} max={7} step={0.5} label="Min. skewness" onScoreChange={this.handleSkewness} />
                                </Grid>*/}
                                <Grid item xs>
                                    <ScoreSlider val={this.state.fdr} label="Max. FDR" step={0.01} max={0.25} onScoreChange={this.handleFDR} />
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
