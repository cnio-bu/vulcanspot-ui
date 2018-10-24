
import React from 'react';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

import logo from './img/logo.png';
import logo_gray from './img/logo_gray.png';

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
                                  <List>
                                      {Object.keys(this.props.items).sort().map(option => (
                                        <ListItem key={option}><Typography style={{fontSize:12}}>{option}</Typography></ListItem>
                                      ))}
                                  </List>
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

export default PanDrugsList;
