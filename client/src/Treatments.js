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
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import StarIcon from '@material-ui/icons/Star';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import PanDrugsList from './PanDrugsList';

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
            },
      table: {
              minWidth: 500,
            },
      tableWrapper: {
              overflowX: 'auto',
            },
      tooltipWidth:{
        maxWidth: 70 
      },
    chipOn: {background:"lightgreen", fontSize:'10px', width:100, height:20},
    chipOff: {background:"lightgray", fontSize:'10px', width:100, height:20},
    chipWhite: {background:"white", fontSize:'10px', width:100, height:20}
    
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
        let rows = [];
        let stateData = {'contexts':[]};
        for(var i=0;i<this.state.genesA.length;i++){
            const res = await fetch('/genes/'+this.state.genesA[i]+'/therapies');
            const json = await res.json();

            let results = json.data;

                    for (var geneA in results) {
                        if (!results.hasOwnProperty(geneA)) continue;
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
                                    let row = {
                                        gene_a: geneA,
                                        gene_a_alteration: alteration,
                                        gene_a_drugs: drugs,
                                        context: context,
                                        gene_b: geneB,
                                        gene_b_role: therapy.role,
                                        gene_b_driver: therapy.driver,
                                        evidence: therapy.evidence,
                                        skewness: therapy.skewness,
                                        drug_name : "-",
                                        sources: {}
                                    };
                                    if("drugs" in therapy){
                                        for (var drug in therapy["drugs"]) {
                                            if (!therapy["drugs"].hasOwnProperty(drug)) continue;
                                            row["sources"] = therapy["drugs"][drug]
                                            row["drug_name"] = drug;
                                        }
                                    }
                                    rows.push(row);
                                }
                            }
                        }
                    }

        }
        this.setState({ rows: rows, loading: false });

        for (const [key,value] of Object.entries(stateData)) {
             stateData[key] = [...new Set(value)];
        }
        this.props.onDataChange(stateData);
    }

    componentWillReceiveProps(newProps){
        if(newProps.genesA !== this.props.genesA){ 
            this.setState({loading: true});
            this.setState({genesA: newProps.genesA});
            this.loadData();
        }

        if(newProps.selectedContexts !== this.props.selectedContexts){
            this.setState({selectedContexts: newProps.selectedContexts});
        }

        if(newProps.genesB !== this.props.genesB){
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
                  return b.druggable_a - a.druggable_a || b.nsources - a.nsources || score_p_b - score_p_a || score_l_b - score_l_a;
              });
              const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

              return (
                        <Paper className={classes.root}>
                          <div className={classes.tableWrapper}>
                            <Table className={classes.table}>
                            <TableHead>
                              <TableRow style={{whiteSpace: 'nowrap'}}>
                                <HeaderTableCellA component="th" scope="row" colSpan={4}>GENE A</HeaderTableCellA>
                                <HeaderTableCellB component="th" scope="row" colSpan={3}>GENE B</HeaderTableCellB>
                                <HeaderTableCellA component="th" scope="row" colSpan={4}>DRUG</HeaderTableCellA>
                              </TableRow>
                              <TableRow style={{whiteSpace: 'nowrap'}}>
                                <HeaderTableCellA component="th" scope="row">symbol</HeaderTableCellA>
                                <HeaderTableCellA component="th" scope="row">alteration</HeaderTableCellA>
                                <HeaderTableCellA component="th" scope="row">context</HeaderTableCellA>
                                <HeaderTableCellA component="th" scope="row">druggable</HeaderTableCellA>
                                <HeaderTableCellB component="th" scope="row">symbol</HeaderTableCellB>
                                <HeaderTableCellB component="th" scope="row">role (driver)</HeaderTableCellB>
                                <HeaderTableCellB component="th" scope="row">dependency evidence (score)</HeaderTableCellB>
                                <HeaderTableCellA component="th" scope="row">name</HeaderTableCellA>
                                <HeaderTableCellA component="th" scope="row">pandrugs score</HeaderTableCellA>
                                <HeaderTableCellA component="th" scope="row">lincs score</HeaderTableCellA>
                                <HeaderTableCellA component="th" scope="row">&nbsp;</HeaderTableCellA>
                              </TableRow>
                            </TableHead>
                              <TableBody>
                              {
                                this.state.loading
                                  ? <SpinnerWrapper />
                                  : rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => {
                                      let createScores = (row,evidence) => {
                                          return row.evidence[evidence] ? " (" + row.evidence[evidence].score.toExponential(2) + ")" : "";
                                      };

                                      return (
                                          <TableRow key={index}>
                                                <TableCell>{row.gene_a}</TableCell>
                                                <TableCell>{row.gene_a_alteration}</TableCell>
                                                <TableCell>{row.context}</TableCell>
                                                <TableCell><PanDrugsList gene={row.gene_a} items={row.gene_a_drugs ? row.gene_a_drugs : []} /></TableCell>
                                                <TableCell>{row.gene_b}</TableCell>
                                                <TableCell>{row.gene_b_role.replace("unknown","-") + " ("+row.gene_b_driver+")"}</TableCell>
                                                <TableCell style={{whiteSpace:'nowrap'}}>
                                                    <Chip label={"RNAi" + createScores(row,"RNAi")} className={row.evidence.RNAi ? classes.chipOn : classes.chipOff}/>
                                                    <br />
                                                    <Chip label={"CRISPR" + createScores(row,"CRISPR")} className={row.evidence.CRISPR ? classes.chipOn : classes.chipOff}/>
                                                </TableCell>
                                                <TableCell>{row.drug_name !== 'null' ? row.drug_name : "-"}</TableCell>
                                                <TableCell numeric>{row.sources.PANDRUGS ? row.sources.PANDRUGS.score.toFixed(3) : "-"}</TableCell>
                                                <TableCell numeric>{row.sources.LINCS ? row.sources.LINCS.score.toFixed(3) : "-"}</TableCell>
                                                <TableCell>{(row.sources.LINCS && row.sources.PANDRUGS && row.sources.LINCS.score >= 0.9 && row.sources.PANDRUGS.score >= 0.6) ? <StarIcon color="secondary" /> : ""}</TableCell>
                                          </TableRow>
                                      );
                                })}
                                {this.state.rows.length === 0 && !this.state.loading && (
                                                    <TableRow style={{ height: 48 * emptyRows }}>
                                                      <TableCell colSpan={11} style={{textAlign: 'center'}}>No results available with current filters</TableCell>
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
