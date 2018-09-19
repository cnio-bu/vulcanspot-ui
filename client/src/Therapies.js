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
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';

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
                <TableCell rowSpan={10} colSpan={10}>
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

class Therapies extends React.Component {
    constructor(props) {
        super(props);
        this.loadData = debounce(500, this.loadData);
        this.state = {
              rows: [],
              genes: [],
              contexts: [],
              page: 0,
              rowsPerPage: 10,
              loading: false,
              rscore: [0,100]
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        let rows = [];
        for(var i=0;i<this.state.genes.length;i++){
            let contexts = this.state.contexts.join(",");
            if(contexts){
                contexts = "?ctx=" + contexts;    
            }
            const res = await fetch('/genes/'+this.state.genes[i]+'/therapies' + contexts);
            const json = await res.json();
            rows = rows.concat(json.data);
        }
        this.setState({ rows: rows, loading: false });

    }

    componentWillReceiveProps(newProps){
        if(newProps.genes != this.props.genes){
            this.setState({genes: newProps.genes});
        }
        if(newProps.contexts != this.props.contexts){
            this.setState({contexts: newProps.contexts});
        }
        this.setState({loading: true});
        this.loadData();
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
                  return row.rscore >= this.state.rscore[0] && row.rscore <= this.state.rscore[1];
              };
              rows = rows.filter(filterRow);
              const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

              return (
                        <Paper className={classes.root}>
                          <div className={classes.tableWrapper}>
                            <Table className={classes.table}>
                            <TableHead>
                              <TableRow style={{whiteSpace: 'nowrap'}}>
                                <HeaderTableCellA component="th" scope="row" colsPan={3}>GROUP1</HeaderTableCellA>
                                <HeaderTableCellB component="th" scope="row" colsPan={4}>GROUP2</HeaderTableCellB>
                                <HeaderTableCellA component="th" scope="row" colsPan={3}>GROUP3</HeaderTableCellA>
                              </TableRow>
                              <TableRow style={{whiteSpace: 'nowrap'}}>
                                <HeaderTableCellA component="th" scope="row">gene A</HeaderTableCellA>
                                <HeaderTableCellA component="th" scope="row">alteration</HeaderTableCellA>
                                <HeaderTableCellA component="th" scope="row">context</HeaderTableCellA>
                                <HeaderTableCellB component="th" scope="row">gene B</HeaderTableCellB>
                                <HeaderTableCellB component="th" scope="row">gene B role (driver)</HeaderTableCellB>
                                <HeaderTableCellB component="th" scope="row">evidence</HeaderTableCellB>
                                <HeaderTableCellB component="th" scope="row">score</HeaderTableCellB>
                                <HeaderTableCellA component="th" scope="row">drug</HeaderTableCellA>
                                <HeaderTableCellA component="th" scope="row">pandrugs</HeaderTableCellA>
                                <HeaderTableCellA component="th" scope="row">lincs</HeaderTableCellA>
                              </TableRow>
                            </TableHead>
                              <TableBody>
                              {
                                this.state.loading
                                  ? <SpinnerWrapper />
                                  : rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                                    return (
                                                          <TableRow key={row.id}>
                                                                <TableCell>{row.gene_a}</TableCell>
                                                                <TableCell>{row.gene_a_alteration}</TableCell>
                                                                <TableCell>{row.context}</TableCell>
                                                                <TableCell>{row.gene_b}</TableCell>
                                                                <TableCell>{row.gene_b_role.replace("unknown","-") + " ("+row.gene_b_driver+")"}</TableCell>
                                                                <TableCell style={{whiteSpace:'nowrap'}}>
                                                                    <Chip label="RNAi" style={row.evidence.includes("RNAi") ? {background:"lightgreen", fontSize:'10px'} : {background:"gray", fontSize:'10px'}}/>
                                                                    <Chip label="CRISPR" style={row.evidence.includes("CRISPR") ? {background:"lightgreen", fontSize:'10px'} : {background:"gray", fontSize:'10px'}}/>
                                                                </TableCell>
                                                                <TableCell numeric>{row.rscore? row.rscore.toFixed(3) : "-"}</TableCell>
                                                                <TableCell>{row.drug_name}</TableCell>
                                                                <TableCell numeric>{row.score_pandrugs ? row.score_pandrugs.toFixed(3) : "-"}</TableCell>
                                                                <TableCell numeric>{row.score_lincs ? row.score_lincs.toFixed(3) : "-"}</TableCell>
                                                          </TableRow>
                                                        );
                                                  })}
                                {emptyRows > 0 && (
                                                    <TableRow style={{ height: 48 * emptyRows }}>
                                                      <TableCell colSpan={6} />
                                                    </TableRow>
                                                  )}
                              </TableBody>
                              <TableFooter>
                                <TableRow>
                                  <TablePagination
                                    colSpan={10}
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

Therapies.propTypes = {
      classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Therapies);
