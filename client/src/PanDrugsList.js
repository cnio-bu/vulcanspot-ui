import React from 'react';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import logo from './img/logo.png';
import logo_gray from './img/logo_gray.png';

const styles = theme => ({
    root: {
        width: '100%',
        maxHeight: 600,
        marginTop: theme.spacing.unit * 3,
        overflow: 'auto',
    },
    table: {
        minWidth: 200,
    },
});

class PanDrugsList extends React.Component {

      state = {
              open: false,
            };

      handleClickOpen = () => {
              this.setState({ open: true });
            };

      handleClick = () => {
              window.open('https://www.pandrugs.org/#!/query/?genes='+this.props.gene, '_blank');
              this.setState({ open: false });
            };
      handleClose = () => {
              this.setState({ open: false });
            };

      render() {
          const { classes } = this.props;

              return (
                        <div>
                          {Object.keys(this.props.items).length > 0 ? <Chip avatar={<Avatar alt="Yes" src={logo} />} label="Yes" onClick={this.handleClickOpen} /> : <Chip avatar={<Avatar alt="No" src={logo_gray} />} label="No" />}
                          <Dialog
                            open={this.state.open}
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">{"Available drugs for "+this.props.gene}</DialogTitle>
                            <DialogContent>
                  <Paper className={classes.root}>
                              <Table className={classes.table}>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>drug</TableCell>
                                        <TableCell numeric>score</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {Object.entries(this.props.items).sort((a,b) => b[1] - a[1]).map(pair => (
                                          <TableRow key={pair[0]}>
                                            <TableCell component="th" scope="row">
                                                  {pair[0]}
                                            </TableCell>
                                            <TableCell numeric>{pair[1]}</TableCell>
                                          </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                  </Paper>
                          </DialogContent>
                            <DialogActions>
                              <Button onClick={this.handleClick} color="primary">
                                View more details in PanDrugs
                              </Button>
                              <Button onClick={this.handleClose} color="primary" autoFocus>
                                Close
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </div>
                      );
            }
}

PanDrugsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PanDrugsList);
