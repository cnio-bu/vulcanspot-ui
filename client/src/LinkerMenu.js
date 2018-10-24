import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

import logo from './img/logo.png';
import logo_gray from './img/logo_gray.png';

const ITEM_HEIGHT = 48;

class LinkerMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (event) => {
    window.open('http://www.pandrugs.org/?'+event.target.innerText, '_blank');
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
        {Object.keys(this.props.options).length > 0 ? <Chip avatar={<Avatar alt="Yes" src={logo} />} label="Yes" onClick={this.handleClick} /> : <Chip avatar={<Avatar alt="No" src={logo_gray} />} label="No" />}
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
          {Object.keys(this.props.options).sort().map(option => (
            <MenuItem style={{fontSize:12}} key={option} onClick={this.handleClose} value={option}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default LinkerMenu;
