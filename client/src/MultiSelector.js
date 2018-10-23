import React from 'react';
import {debounce} from 'throttle-debounce';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItems }) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItems || '').indexOf(suggestion.key) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.key}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.key}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItems: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};


class MultiSelector extends React.Component {
    constructor(props) {
        super(props);
        this.getSuggestions = debounce(500, this.getSuggestions);
        this.state = {
            inputValue: '',
            suggestions: [],
            selectedItems: [],
        };
    }

    componentWillReceiveProps(newProps){
        if(newProps.items !== this.props.items){
            this.setState({selectedItems: newProps.items});
        }
    }

  getSuggestions = hint =>{
    axios.get('/'+this.props.label+'?hint='+hint.toUpperCase()+'&limit=10')
    .then(({ data }) => {
        this.setState({
          suggestions: data.data
        });
    })
  }


  handleKeyDown = event => {
    const { inputValue, selectedItems } = this.state;
    if (selectedItems.length && !inputValue.length && keycode(event) === 'backspace') {
      this.setState({
        selectedItems: selectedItems.slice(0, selectedItems.length - 1),
      });
    }
  };

    handleInputChange = event => {
	this.setState({
          inputValue: event.target.value
	}, () => {
            if(this.state.inputValue && this.state.inputValue.length > 1){
	      this.getSuggestions(this.state.inputValue);
            }
	})
      }

  handleChange = item => {
    let { selectedItems } = this.state;

    if (selectedItems.indexOf(item) === -1) {
      selectedItems = [...selectedItems, item];
    }

    this.setState({
      inputValue: '',
      selectedItems,
    });

    this.props.onChange(selectedItems);
  };

  handleDelete = item => () => {
    this.setState(state => {
      const selectedItems = [...state.selectedItems];
      selectedItems.splice(selectedItems.indexOf(item), 1);
      this.props.onChange(selectedItems);
      return { selectedItems };
    });
  };

  render() {
    const { classes } = this.props;
    const { inputValue, selectedItems } = this.state;

    return (
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        onChange={this.handleChange}
        selectedItems={selectedItems}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue: inputValue2,
          selectedItems: selectedItems2,
          highlightedIndex,
        }) => (
          <div className={classes.container}>
            {renderInput({
              fullWidth: true,
              classes,
              InputProps: getInputProps({
                startAdornment: selectedItems.map(item => (
                  <Chip
                    key={item}
                    tabIndex={-1}
                    label={item}
                    className={classes.chip}
                    onDelete={this.handleDelete(item)}
                  />
                )),
                onChange: this.handleInputChange,
                onKeyDown: this.handleKeyDown,
                placeholder: 'Add '+this.props.label,
              }),
              label: this.props.label,
            })}
            {isOpen ? (
              <Paper className={classes.paper} square>
                {this.state.suggestions.map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion.key }),
                    highlightedIndex,
                    selectedItems: selectedItems2,
                  }),
                )
                }
              </Paper>
            ) : null}
          </div>
        )}
      </Downshift>
    );
  }
}

MultiSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 3,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

export default withStyles(styles)(MultiSelector);
