import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';

class ScoreSlider extends React.Component {
    state = {
        value: 0.3,
    };

    handleChange = (event, value) => {
        this.setState({ value: value });
        this.props.onScoreChange(value);
    };


    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.container}>
                        <Typography id="label" variant="caption">GD score: {value.toFixed(1)}</Typography>
                        <Slider aria-labelledby="label" value={value} min={0} max={1} step={0.1} onChange={this.handleChange} />
            </div>
        );
    }
}

ScoreSlider.propTypes = {
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
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

export default withStyles(styles)(ScoreSlider);
