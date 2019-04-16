import React from 'react';
import {debounce} from 'throttle-debounce';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import InfoIcon from '@material-ui/icons/Info';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import PanDrugsList from './PanDrugsList';
import text from './data/Dashboard_text.json';
import bullseye from './img/bullseye.png';
import ResultsBar from './ResultsBar';

const { List } = require('immutable');

const actionsStyles = theme => ({
      root: {
              flexShrink: 0,
              color: theme.palette.text.secondary,
              marginLeft: theme.spacing.unit * 2.5,
            },
});

class TablePaginationActions extends React.Component {
      handleFirstPageButtonClick = event => {
              this.props.onChangePage(event, 0);
            };

      handleBackButtonClick = event => {
              this.props.onChangePage(event, this.props.page - 1);
            };

      handleNextButtonClick = event => {
              this.props.onChangePage(event, this.props.page + 1);
            };

      handleLastPageButtonClick = event => {
              this.props.onChangePage(
                        event,
                        Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
                      );
            };

      render() {
              const { classes, count, page, rowsPerPage, theme } = this.props;

              return (
                        <div className={classes.root}>
                          <IconButton
                            onClick={this.handleFirstPageButtonClick}
                            disabled={page === 0}
                            aria-label="First Page"
                          >
                            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                          </IconButton>
                          <IconButton
                            onClick={this.handleBackButtonClick}
                            disabled={page === 0}
                            aria-label="Previous Page"
                          >
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                          </IconButton>
                          <IconButton
                            onClick={this.handleNextButtonClick}
                            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                            aria-label="Next Page"
                          >
                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                          </IconButton>
                          <IconButton
                            onClick={this.handleLastPageButtonClick}
                            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                            aria-label="Last Page"
                          >
                            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                          </IconButton>
                        </div>
                      );
            }
}

TablePaginationActions.propTypes = {
      classes: PropTypes.object.isRequired,
      count: PropTypes.number.isRequired,
      onChangePage: PropTypes.func.isRequired,
      page: PropTypes.number.isRequired,
      rowsPerPage: PropTypes.number.isRequired,
      theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
      TablePaginationActions,
);

const styles = theme => ({
      root: {
              width: '100%',
              marginTop: theme.spacing.unit * 3,
              marginBottom: theme.spacing.unit * 10,
            },
      table: {
              minWidth: 500,
                fontSize: 30
            },
      tableWrapper: {
              overflowX: 'auto',
            },
      tooltipWidth:{
        maxWidth: 70 
      },
    chipOn: {background:"lightgreen", fontSize:'10px', width:100, height:20},
    chipOff: {background:"lightgray", fontSize:'10px', width:100, height:20},
    chipWhite: {background:"white", fontSize:'10px', width:100, height:20},
    lightTooltip: {
        background: theme.palette.common.white,
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
    infoIcon: {
        marginLeft: 5,
        fontSize: 16,
    },
    download: {
        textAlign: 'right',
        fontSize: 14 
    },
    
});

const spinnerStyles = theme => ({
      progress: {
              margin: theme.spacing.unit * 2,
            },
});

function Spinner(props) {
      const { classes } = props;
      return (
            <TableRow>
                <TableCell rowSpan={11} colSpan={11}>
                    <CircularProgress className={classes.progress} size={100} /> LOADING
                </TableCell>
            </TableRow>
            );
}

Spinner.propTypes = {
      classes: PropTypes.object.isRequired,
};

const SpinnerWrapper = withStyles(spinnerStyles)(Spinner);

const HeaderTableCellB = withStyles(theme => ({
      head: {
              backgroundColor: 'lightgray',
              color: theme.palette.common.black,
            },
      body: {
              fontSize: 14,
            },
}))(TableCell);

const HeaderTableCellA = withStyles(theme => ({
      head: {
              backgroundColor: 'gray',
              color: theme.palette.common.white,
            },
      body: {
              fontSize: 14,
            },
}))(TableCell);

class Treatments extends React.Component {
    constructor(props) {
        super(props);
        this.loadData = debounce(500, this.loadData);
        this.state = {
              rows: [],
              genesA: [],
              genesB: [],
              selectedContexts: [],
              page: 0,
              rowsPerPage: 10,
              loading: false,
              rscore: this.props.rscore,
              fdr: this.props.fdr,
              skew: this.props.skew,
              gdcancer: this.props.gdcancer,
              order: this.props.order
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        let allResults = {};
        let rows = [];
        let stateData = {'contexts':[]};
        for(var i=0;i<this.state.genesA.length;i++){
            const res = await fetch('/genes/'+this.state.genesA[i]+'/treatments');
            const json = await res.json();

            let results = json.data;

                    for (var geneA in results) {
                        if (!results.hasOwnProperty(geneA)) continue;
                        allResults[geneA] = results[geneA];
                        var contexts = results[geneA];
                        for (var context in contexts) {
                            if (!contexts.hasOwnProperty(context)) continue;
                            var alterations = contexts[context]['alterations'];
                            var drugs = contexts[context]['drugs'];
                            stateData.contexts.push(context);
                            for (var alteration in alterations) {
                                if (!alterations.hasOwnProperty(alteration)) continue;
                                var genesB = alterations[alteration];
                                for (var geneB in genesB) {
                                    if (!genesB.hasOwnProperty(geneB)) continue;
                                    var therapy = genesB[geneB];
                                    if("drugs" in therapy){
                                        for (var drug in therapy["drugs"]) {
                                            if (!therapy["drugs"].hasOwnProperty(drug)) continue;
                                            var sources = therapy["drugs"][drug];
                                            rows.push({
                                                gene_a: geneA,
                                                gene_a_alteration: alteration,
                                                gene_a_drugs: drugs,
                                                context: context,
                                                gene_b: geneB,
                                                gene_b_role: therapy.role,
                                                gene_b_driver: therapy.driver,
                                                evidence: therapy.evidence,
                                                drug_name: drug,
                                                sources: sources,
                                                skewness: therapy.skewness,
                                                validated: drug.validated
                                            });
                                        }
                                    }else{
                                        rows.push({
                                            gene_a: geneA,
                                            gene_a_alteration: alteration,
                                            gene_a_drugs: drugs,
                                            context: context,
                                            gene_b: geneB,
                                            gene_b_role: therapy.role,
                                            gene_b_driver: therapy.driver,
                                            evidence: therapy.evidence,
                                            drug_name: "-",
                                            sources: {},
                                            skewness: therapy.skewness
                                        });

                                    }
                                }
                            }
                        }
                    }

        }
        this.setState({ rows: rows, loading: false, results: allResults });

        for (const [key,value] of Object.entries(stateData)) {
             stateData[key] = [...new Set(value)];
        }
        this.props.onDataChange(stateData);
    }

    listEquals = (l1,l2) => {
        return List(l1).equals(List(l2)); 
    }

    componentWillReceiveProps(newProps){
        if(!this.listEquals(newProps.genesA,this.props.genesA)){ 
            this.setState({loading: true});
            this.setState({genesA: newProps.genesA});
            this.loadData();
        }

        if(!this.listEquals(newProps.selectedContexts,this.props.selectedContexts)){
            this.setState({selectedContexts: newProps.selectedContexts});
        }

        if(!this.listEquals(newProps.genesB,this.props.genesB)){
            this.setState({genesB:newProps.genesB});
        }

        if(newProps.rscore !== this.props.rscore){
            this.setState({rscore:newProps.rscore});
        }
        if(newProps.fdr !== this.props.fdr){
            this.setState({fdr:newProps.fdr});
        }
        if(newProps.skew !== this.props.skew){
            this.setState({skew:newProps.skew});
        }
        if(newProps.gdcancer !== this.props.gdcancer){
            this.setState({gdcancer:newProps.gdcancer});
        }
        if(newProps.order !== this.props.order){
            this.setState({order:newProps.order});
        }
    }

      handleChangePage = (event, page) => {
              this.setState({ page });
            };

      handleChangeRowsPerPage = event => {
              this.setState({ rowsPerPage: event.target.value });
            };

      render() {
              const { classes } = this.props;
              var { rows, rowsPerPage, page } = this.state;
              var filterRow = (row) => {
                  let CRISPRfilter = true;
                  let RNAifilter = true;
                  let GDfilter = !this.state.gdcancer || (row.gene_b_driver !== 'ND' && row.gene_b_role !== 'unknown') ? true : false;

                  row.nevidence = Object.keys(row.evidence).length;
                  row.nsources = Object.keys(row.sources).length;

                  if(row.evidence.CRISPR){
                      CRISPRfilter = row.evidence.CRISPR.score >= this.state.rscore && row.evidence.CRISPR.fdr <= this.state.fdr;
                  }
                  if(row.evidence.RNAi){
                      RNAifilter = row.evidence.RNAi.score >= this.state.rscore && row.evidence.RNAi.fdr <= this.state.fdr;
                  }

                  return row.skewness <= this.state.skew && CRISPRfilter && RNAifilter && GDfilter && (this.state.genesB.length === 0 || this.state.genesB.includes(row.gene_b)) && (this.state.selectedContexts.length === 0 || this.state.selectedContexts.includes(row.context));
              };
              rows = rows.filter(filterRow);
              rows.sort((a, b) => {
                  let score_p_a = a.sources.PANDRUGS ? a.sources.PANDRUGS.score : 0;
                  let score_p_b = b.sources.PANDRUGS ? b.sources.PANDRUGS.score : 0;
                  let score_l_a = a.sources.LINCS ? a.sources.LINCS.score : 0;
                  let score_l_b = b.sources.LINCS ? b.sources.LINCS.score : 0;

                  let druggable_a = a.gene_a_drugs ? 1 : 0;
                  let druggable_b = b.gene_a_drugs ? 1 : 0;

                  return druggable_b - druggable_a || b.nsources - a.nsources || score_p_b - score_p_a || score_l_b - score_l_a;
              });

              let values = {
                  "genesa":[],
                  "genesb": [],
                  "best": 0,
                  "bestDrugs": [],
                  "totalDrugs": [] 
              }

              for (var r in rows) {
                  r = rows[r];
                  if((r.sources.PANDRUGS && r.sources.PANDRUGS.score >= 0.6) && (r.sources.LINCS && r.sources.LINCS.score >= 0.9)){
                    values.best += 1;
                    values.bestDrugs.push(r.drug_name);
                  }
                  values.totalDrugs.push(r.drug_name);
                  values.genesa.push(r.gene_a);
                  values.genesb.push(r.gene_b);
              }

              values.bestDrugs = [...new Set(values.bestDrugs)].length;
              values.totalDrugs = [...new Set(values.totalDrugs)].length;
              values.genesa = [...new Set(values.genesa)].length;
              values.genesb = [...new Set(values.genesb)].length;

              const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

              return (
                        <Paper className={classes.root}>
                        {this.state.rows.length > 0 ?
                          <div>
                            {this.state.loading ? null : <ResultsBar values={values} />}
                          <div className={classes.download}>
                            Download: <a download={"results-"+ +new Date()+".json"} href={"data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state.results))}>JSON</a>
                          </div>
                          </div>
                          : null
                        }
                          <div className={classes.tableWrapper}>
                            <Table className={classes.table}>
                            <TableHead>
                              <TableRow style={{whiteSpace: 'nowrap'}}>
                                <HeaderTableCellA component="th" scope="row" colSpan={4}>
                                    <Tooltip title={text.geneA.tooltip || ""}>
                                        <span>
                                            {text.geneA.column}
                                            {text.geneA.tooltip ? <InfoIcon className={classes.infoIcon} /> : ""}
                                        </span>
                                    </Tooltip>
                                </HeaderTableCellA>
                                <HeaderTableCellB component="th" scope="row" colSpan={3}>
                                    <Tooltip title={text.geneB.tooltip || ""}>
                                        <span>
                                            {text.geneB.column}
                                            {text.geneB.tooltip ? <InfoIcon className={classes.infoIcon} /> : ""}
                                        </span>
                                    </Tooltip>
                                </HeaderTableCellB>
                                <HeaderTableCellA component="th" scope="row" colSpan={5}>
                                    <Tooltip title={text.drug.tooltip || ""}>
                                        <span>
                                            {text.drug.column}
                                            {text.drug.tooltip ? <InfoIcon className={classes.infoIcon} /> : ""}
                                        </span>
                                    </Tooltip>
                                </HeaderTableCellA>
                              </TableRow>
                              <TableRow style={{whiteSpace: 'nowrap'}}>
                                <HeaderTableCellA component="th" scope="row">
                                    <Tooltip title={text.symbol.tooltip || ""}>
                                        <span>
                                            {text.symbol.column}
                                            {text.symbol.tooltip ? <InfoIcon className={classes.infoIcon} /> : ""}
                                        </span>
                                    </Tooltip>
                                </HeaderTableCellA>
                                <HeaderTableCellA component="th" scope="row">
                                    <Tooltip title={text.alteration.tooltip || ""}>
                                        <span>
                                            {text.alteration.column}
                                            {text.alteration.tooltip ? <InfoIcon className={classes.infoIcon} /> : ""}
                                        </span>
                                    </Tooltip>
                                </HeaderTableCellA>
                                <HeaderTableCellA component="th" scope="row">
                                    <Tooltip title={text.context.tooltip || ""}>
                                        <span>
                                            {text.context.column}
                                            {text.context.tooltip ? <InfoIcon className={classes.infoIcon} /> : ""}
                                        </span>
                                    </Tooltip>
                                </HeaderTableCellA>
                                <HeaderTableCellA component="th" scope="row">
                                    <Tooltip title={text.druggable.tooltip || ""}>
                                        <span>
                                            {text.druggable.column}
                                            {text.druggable.tooltip ? <InfoIcon className={classes.infoIcon} /> : ""}
                                        </span>
                                    </Tooltip>
                                </HeaderTableCellA>
                                <HeaderTableCellB component="th" scope="row">
                                    <Tooltip title={text.symbol.tooltip || ""}>
                                        <span>
                                            {text.symbol.column}
                                            {text.symbol.tooltip ? <InfoIcon className={classes.infoIcon} /> : ""}
                                        </span>
                                    </Tooltip>
                                </HeaderTableCellB>
                                <HeaderTableCellB component="th" scope="row">
                                    <Tooltip title={text.role.tooltip || ""}>
                                        <span>
                                            {text.role.column}
                                            {text.role.tooltip ? <InfoIcon className={classes.infoIcon} /> : ""}
                                        </span>
                                    </Tooltip>
                                </HeaderTableCellB>
                                <HeaderTableCellB component="th" scope="row">
                                    <Tooltip title={text.evidence.tooltip || ""}>
                                        <span>
                                            {text.evidence.column}
                                            {text.evidence.tooltip ? <InfoIcon className={classes.infoIcon} /> : ""}
                                        </span>
                                    </Tooltip>
                                </HeaderTableCellB>
                                <HeaderTableCellA component="th" scope="row">
                                    <Tooltip title={text.drug_name.tooltip || ""}>
                                        <span>
                                            {text.drug_name.column}
                                            {text.drug_name.tooltip ? <InfoIcon className={classes.infoIcon} /> : ""}
                                        </span>
                                    </Tooltip>
                                </HeaderTableCellA>
                                <HeaderTableCellA component="th" scope="row">
                                    <Tooltip title={text.pandrugs_score.tooltip || ""}>
                                        <span>
                                            {text.pandrugs_score.column}
                                            {text.pandrugs_score.tooltip ? <InfoIcon className={classes.infoIcon} /> : ""}
                                        </span>
                                    </Tooltip>
                                </HeaderTableCellA>
                                <HeaderTableCellA component="th" scope="row">
                                    <Tooltip title={text.lincs_score.tooltip || ""}>
                                        <span>
                                            {text.lincs_score.column}
                                            {text.lincs_score.tooltip ? <InfoIcon className={classes.infoIcon} /> : ""}
                                        </span>
                                    </Tooltip>
                                </HeaderTableCellA>
                                <HeaderTableCellA component="th" scope="row">
                                    <Tooltip title={text.star.tooltip || ""}>
                                        <span>
                                            {text.star.column}
                                            {text.star.tooltip ? <InfoIcon className={classes.infoIcon} /> : ""}
                                        </span>
                                    </Tooltip>
                                </HeaderTableCellA>
                                <HeaderTableCellA component="th" scope="row">
                                    <Tooltip title={text.validated.tooltip || ""}>
                                        <span>
                                            {text.validated.column}
                                            {text.validated.tooltip ? <InfoIcon className={classes.infoIcon} /> : ""}
                                        </span>
                                    </Tooltip>
                                </HeaderTableCellA>
                              </TableRow>
                            </TableHead>
                              <TableBody>
                              {
                                this.state.loading
                                  ? <SpinnerWrapper />
                                  : rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => {
                                      let createScores = (row,evidence) => {
                                          return <div><span style={{fontWeight:'bold'}}>{evidence}</span><span>{row.evidence[evidence] ? " (" + row.evidence[evidence].score.toExponential(2) + ")" : ""}</span></div>;
                                      };

                                      let geneBRoleDriver = (row) => {
                                            let role_color = null;
                                            let role_label = null;
                                            let driver_color = null;
                                            let driver_label = null;
                                            let role_tooltip = null;
                                            let driver_tooltip = null;

                                            let showRole = false;
                                            let showDriver = false;

                                            switch(row.gene_b_role){
                                                case 'oncogene':
                                                    role_color = 'red';
                                                    role_label = 'ONC';
                                                    role_tooltip = 'oncogene';
                                                    showRole = true;
                                                    break;
                                                case 'oncogene/TSG':
                                                    role_color = 'orange';
                                                    role_label = 'ONC/TSG';
                                                    role_tooltip = 'oncogene/tumor suppresor gene';
                                                    showRole = true;
                                                    break;
                                                case 'TSG':
                                                    role_color = 'blue';
                                                    role_label = 'TSG';
                                                    role_tooltip = 'tumor suppresor gene';
                                                    showRole = true;
                                                    break;
                                                default:
                                                    break;
                                            }
                                            switch(row.gene_b_driver){
                                                case 'High Confidence Driver':
                                                    driver_color = 'green';
                                                    driver_label = 'HCD';
                                                    driver_tooltip = 'High Confidence Driver';
                                                    showDriver = true;
                                                    break;
                                                case 'Candidate driver':
                                                    driver_color = 'lightgreen';
                                                    driver_label = 'LCD';
                                                    driver_tooltip = 'Low Confidence Driver';
                                                    showDriver = true;
                                                    break;
                                                default:
                                                    break;
                                            }

                                            let role = null;
                                            if(showRole){
                                                role = <Tooltip title={role_tooltip || ""}><Chip variant="outlined" style={{color:role_color, fontSize:'10px', width:55, height:20}} label={role_label} /></Tooltip>
                                            }
                                            let driver = null;
                                            if(showDriver){
                                                driver = <Tooltip title={driver_tooltip || ""}><Chip variant="outlined" style={{color:driver_color, fontSize:'10px', width:55, height:20}} label={driver_label} /></Tooltip>
                                            }
                                            
                                            return (
                                                <div>
                                                    {role}
                                                    {driver}
                                                </div>
                                            );
                                      };

                                      let alteration = (alt) => {
                                            let color = null;
                                            let tooltip = null;

                                            switch(alt){
                                                case 'GoF':
                                                    color = '#FA141B';
                                                    tooltip = 'Gain of Function';
                                                    break;
                                                case 'LoF':
                                                    color = '#4491C3';
                                                    tooltip = 'Loss of Function';
                                                    break;
                                                default:
                                                    break;
                                            }

                                            
                                            return (
                                                <Tooltip title={tooltip || ""}><Chip style={{background:color, width:55, height:20}} label={<Typography style={{fontWeight:'bold', color:'white', fontSize:'10px',}}>{alt}</Typography>} /></Tooltip>
                                            );
                                      };

                                      return (
                                          <TableRow key={index}>
                                                <TableCell><a rel="noopener noreferrer" href={"https://www.ncbi.nlm.nih.gov/gene?term=" + row.gene_a} target="_blank">{row.gene_a}</a></TableCell>
                                                <TableCell>{alteration(row.gene_a_alteration)}</TableCell>
                                                <Tooltip title={row.context}><TableCell>{row.context.length <= 10 ? row.context : row.context.substr(0,9) + "..."}</TableCell></Tooltip>
                                                <TableCell><PanDrugsList gene={row.gene_a} items={row.gene_a_drugs ? row.gene_a_drugs : []} /></TableCell>
                                                <TableCell><a rel="noopener noreferrer" href={"https://depmap.org/portal/gene/" + row.gene_b} target="_blank">{row.gene_b}</a></TableCell>
                                                <TableCell>{geneBRoleDriver(row)}</TableCell>
                                                <TableCell>
                                                  <Chip label={createScores(row,"RNAi")} className={row.evidence.RNAi ? classes.chipOn : classes.chipOff}/>
                                                    <br />
                                                    <Chip label={createScores(row,"CRISPR")} className={row.evidence.CRISPR ? classes.chipOn : classes.chipOff}/>
                                                </TableCell>
                                                <Tooltip title={row.drug_name.toLowerCase()}>
                                                    <TableCell>
                                                         <a rel="noopener noreferrer" href={"https://www.ncbi.nlm.nih.gov/pccompound?term=" + row.drug_name} target="_blank">
                                                            {row.drug_name.length <= 12 ? row.drug_name.toLowerCase() : row.drug_name.toLowerCase().substr(0,10) + "..."}
                                                        </a>
                                                    </TableCell>
                                                </Tooltip>
                                                <TableCell numeric>{row.sources.PANDRUGS ? row.sources.PANDRUGS.score.toFixed(3) : "-"}</TableCell>
                                                <TableCell numeric>{row.sources.LINCS ? row.sources.LINCS.score.toFixed(3) : "-"}</TableCell>
                                                <TableCell>{(row.sources.LINCS && row.sources.PANDRUGS && row.sources.LINCS.score >= 0.9 && row.sources.PANDRUGS.score >= 0.6) ? <img src={bullseye} alt="" /> : ""}</TableCell>
                                                <TableCell>{row.sources.validated ?  <CheckCircleOutline color="secondary"/> : ""}</TableCell>
                                          </TableRow>
                                      );
                                })}
                                {this.state.rows.length === 0 && !this.state.loading && (
                                                    <TableRow style={{ height: 48 * emptyRows }}>
                                                      <TableCell colSpan={11} style={{textAlign: 'center'}}>No results available for currently selected genes / filters</TableCell>
                                                    </TableRow>
                                                  )}
                              </TableBody>
                              <TableFooter>
                                <TableRow>
                                  <TablePagination
                                    colSpan={11}
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActionsWrapped}
                                  />
                                </TableRow>
                              </TableFooter>
                            </Table>
                          </div>
                        </Paper>
                      );
            }
}

Treatments.propTypes = {
      classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Treatments);
