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

let counter = 0;
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

class Therapies extends React.Component {
    constructor(props) {
        super(props);
        this.loadData = debounce(500, this.loadData);
        this.state = {
              rows: [],
              page: 0,
              rowsPerPage: 10,
        };
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.id !== this.props.id){
            this.loadData();
        }
    }

    loadData(){
        fetch('/genes/BCL2/therapies')
            .then(res => res.json())
            .then(json => {
                 this.setState({ rows: json.data });
            })
    }

      handleChangePage = (event, page) => {
              this.setState({ page });
            };

      handleChangeRowsPerPage = event => {
              this.setState({ rowsPerPage: event.target.value });
            };

      render() {
              const { classes } = this.props;
              const { rows, rowsPerPage, page } = this.state;
              const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

              return (
                        <Paper className={classes.root}>
                          <div className={classes.tableWrapper}>
                            <Table className={classes.table}>
                            <TableHead>
                              <TableRow style={{whiteSpace: 'nowrap'}}>
                                <TableCell component="th" scope="row">gene A</TableCell>
                                <TableCell component="th" scope="row">alteration</TableCell>
                                <TableCell component="th" scope="row">context</TableCell>
                                <TableCell component="th" scope="row">gene B</TableCell>
                                <TableCell component="th" scope="row">gene B role</TableCell>
                                <TableCell component="th" scope="row">evidence</TableCell>
                                <TableCell component="th" scope="row">score</TableCell>
                                <TableCell component="th" scope="row">drug</TableCell>
                                <TableCell component="th" scope="row">pandrugs</TableCell>
                                <TableCell component="th" scope="row">lincs</TableCell>
                              </TableRow>
                            </TableHead>
                              <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                                    return (
                                                          <TableRow key={row.id}>
                                                                <TableCell>{row.gene_a}</TableCell>
                                                                <TableCell>{row.gene_a_alteration}</TableCell>
                                                                <TableCell>{row.context}</TableCell>
                                                                <TableCell>{row.gene_b}</TableCell>
                                                                <TableCell>{row.gene_b_role}</TableCell>
                                                                <TableCell>{row.evidence}</TableCell>
                                                                <TableCell numeric>{row.rscore}</TableCell>
                                                                <TableCell>{row.drug_name}</TableCell>
                                                                <TableCell numeric>{row.score_pandrugs}</TableCell>
                                                                <TableCell numeric>{row.score_lincs}</TableCell>
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
