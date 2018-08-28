import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
    root: {
          flexGrow: 1,
          height: 250,
        },
    input: {
          display: 'flex',
          padding: 0,
        },
    valueContainer: {
          display: 'flex',
          flexWrap: 'wrap',
          flex: 1,
          alignItems: 'center',
        },
    chip: {
          margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
        },
    chipFocused: {
          backgroundColor: emphasize(
                theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
                0.08,
                ),
        },
    noOptionsMessage: {
          padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
        },
    singleValue: {
          fontSize: 16,
        },
    placeholder: {
          position: 'absolute',
          left: 2,
          fontSize: 16,
        },
    paper: {
          marginTop: theme.spacing.unit,
        },
    divider: {
          height: theme.spacing.unit * 2,
        },
});

function NoOptionsMessage(props) {
    return (
          <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
          >
            {props.children}
          </Typography>
        );
}

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
}

function Control(props) {
    return (
          <TextField
            fullWidth
            InputProps={{
                    inputComponent,
                      inputProps: {
                                className: props.selectProps.classes.input,
                                  inputRef: props.innerRef,
                                  children: props.children,
                                  ...props.innerProps,
                                },
                    }}
            {...props.selectProps.textFieldProps}
          />
        );
}

function Option(props) {
    return (
          <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                    fontWeight: props.isSelected ? 500 : 400,
                    }}
            {...props.innerProps}
          >
            {props.children}
          </MenuItem>
        );
}

function Placeholder(props) {
    return (
          <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
          >
            {props.children}
          </Typography>
        );
}

function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
    return (
          <Chip
            tabIndex={-1}
            label={props.children}
            className={classNames(props.selectProps.classes.chip, {
                    [props.selectProps.classes.chipFocused]: props.isFocused,
                  })}
            onDelete={event => {
                    props.removeProps.onClick();
                    props.removeProps.onMouseDown(event);
                  }}
          />
        );
}

function Menu(props) {
    return (
          <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
          </Paper>
        );
}

const components = {
    Option,
    Control,
    NoOptionsMessage,
    Placeholder,
    MultiValue,
    ValueContainer,
    Menu,
};

class GenesSelect extends React.Component {
    state = {
          multi: null,
          genes: []
        };

    handleChange = name => value => {
          this.setState({
                [name]: value,
                });
        };

    componentDidMount() {
        this.loadData();
    }

    loadData(){
        fetch('/genes')
            .then(res => res.json())
            .then(json => {
                 this.setState({ genes: 
                     json.data.map(gene => ({
                        value: gene.id,
                        label: gene.name
                    }))
                 });
            });
    }

    render() {
          const { classes, theme } = this.props;

          const selectStyles = {
                input: base => ({
                        ...base,
                        color: theme.palette.text.primary,
                        }),
                };

          return (
                <div className={classes.root}>
                  <NoSsr>
                    <Select
                    classes={classes}
                    styles={selectStyles}
                    textFieldProps={{
                                label: 'Genes',
                                    InputLabelProps: {
                                                shrink: true,
                                                  },
                                  }}
                    options={this.state.genes}
                    components={components}
                    value={this.state.multi}
                    onChange={this.handleChange('multi')}
                    placeholder="Select multiple genes"
                    isMulti
                    />
                  </NoSsr>
                </div>
                );
        }
}

GenesSelect.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(GenesSelect);
