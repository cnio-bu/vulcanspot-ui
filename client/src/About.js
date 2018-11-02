import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import bulogo from './img/bu_cnio.logo.png';
import cniologo from './img/cnio.logo.png';
import twitter from './img/twitter.png';

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
                    <Typography component='p' variant='h4' style={{textAlign:'center'}}>
                        About VulcanSpot
                    </Typography>
                    <br/><br/>
                    <Paper style={{padding:10}} square={true}>
                        <Typography component='p'>
                            VulcanSpot was developed by the <a href='http://bioinformatics.cnio.es' target='_blank' rel="noopener noreferrer">Bioinformatics Unit</a> at the <a href='http://www.cnio.es/ing' target='_blank' rel="noopener noreferrer">Spanish National Cancer Research Centre (CNIO)</a>
                        </Typography>
                        <br/>
                        <Typography component='p' variant='caption'>
                            <Divider />
                            <br />
                            <a href="http://bioinformatics.cnio.es" target="_blank" className={classes.logo} rel="noopener noreferrer"><img alt="Bioinformatics Unit" src={bulogo} style={{height:50}}/></a>
                            CNIO Bioinformatics Unit
                            <br />
                            <a href="https://twitter.com/bu_cnio" target="_blank"><img style={{height:20}} alt="" src={twitter} />@BU_CNIO</a>
                            <br/><br/>
                            <Divider />
                            <br />
                            <a href="http://www.cnio.es/ing" target="_blank" className={classes.logo} rel="noopener noreferrer"><img src={cniologo} alt="CNIO" style={{height:30}}/></a>
                            <br/>
                            Centro Nacional de Investigaciones Oncológicas
                            <br/>
                            C/ Melchor Fernández Almagro, 3. 28029 Madrid
                            <br/>
                            <br/>
                            <Divider />
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
