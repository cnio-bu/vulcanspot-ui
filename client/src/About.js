import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  }
});

class Contact extends React.Component {
  render() {
    const { classes } = this.props;

    return (
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
                    <Paper style={{padding:10}} square={true}>
                        <Typography component='p'>
                            VulcanSpot was developed by the <a href='http://bioinformatics.cnio.es' target='_blank' rel="noopener noreferrer">Bioinformatics Unit</a> at the <a href='http://www.cnio.es/ing' target='_blank' rel="noopener noreferrer">Spanish National Cancer Research Centre (CNIO)</a>
                        </Typography>
                    </Paper>
          </main>
    );
  }
}

Contact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Contact);
