import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
//import ListSubheader from '@material-ui/core/ListSubheader';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import HelpIcon from '@material-ui/icons/Help';
//import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link } from 'react-router-dom';

export default class ListItems extends React.Component {
  render() {
    return (
      <div>
        <Link to="/treatments">
        <ListItem button onClick={this.props.onSelect}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <Link to="/treatments"><ListItemText primary="Home" /></Link>
        </ListItem>
        </Link>
        <Link to="/help">
            <ListItem button onClick={this.props.onSelect}>
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <Link to="/help"><ListItemText primary="Help" /></Link>
            </ListItem>
        </Link>
        <Link to="/about">
        <ListItem button onClick={this.props.onSelect}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <Link to="/about"><ListItemText primary="About" /></Link>
        </ListItem>
        </Link>
      </div>
    );
  }
}
