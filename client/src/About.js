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
                        About vulcanSpot
                    </Typography>
                    <br/><br/>
                    <Paper style={{padding:10}} square={true}>
                        <Typography component='p' variant='h8'>
                            vulcanSpot was developed by the <a href='http://bioinformatics.cnio.es' target='_blank' rel="noopener noreferrer">Bioinformatics Unit</a> at the <a href='http://www.cnio.es/ing' target='_blank' rel="noopener noreferrer">Spanish National Cancer Research Centre (CNIO)</a>
                        </Typography>
                        <br/>
                        <Typography component='p'>
                            <Divider />
                            <br />
                            <a href="http://bioinformatics.cnio.es" target="_blank" className={classes.logo} rel="noopener noreferrer"><img alt="Bioinformatics Unit" src={bulogo} style={{height:50}}/></a>
                            CNIO Bioinformatics Unit
                            <br />
                            <a rel="noopener noreferrer" href="https://twitter.com/bu_cnio" target="_blank"><img style={{height:20}} alt="" src={twitter} />@BU_CNIO</a>
                            <br/><br/>
                            <Divider />
                            <br />
                            <a href="http://www.cnio.es/ing" target="_blank" className={classes.logo} rel="noopener noreferrer"><img src={cniologo} alt="CNIO" style={{height:30}}/></a>
                            <br/>
                            Centro Nacional de Investigaciones Oncológicas
                            <br/>
                            C/ Melchor Fernández Almagro, 3. 28029 Madrid
                            <br />
                            <a rel="noopener noreferrer" href="https://twitter.com/CNIO_Cancer" target="_blank"><img style={{height:20}} alt="" src={twitter} />@CNIO_Cancer</a>
                            <br/>
                            <br/>
                            <Divider />
                            <br />
                                <strong>LICENSE</strong>
                                <br />
                                <br />
                                vulcanSpot is free for academic use. Source code is available <a href="https://gitlab.com/bu_cnio/vulcanspot" target="_blank" rel="noopener noreferrer">here</a>.
                                <br />
                                <br />
                                For commercial applications please contact Dr. Fátima Al-Shahrour [falshahrour (at) cnio.es]
                            <br />
                            <br />
                            <Divider />
                            <br />
                                <strong>CITING VULCANSPOT</strong>
                                <br />
                                <br />
                                Perales-Patón, J., Di Domenico, T., Fustero-Torre, C., Piñeiro-Yáñez, E., Carretero-Puche, C., Tejero, H., Valencia, A., Gómez-López, G., and Al-Shahrour, F. vulcanSpot: a tool to prioritize therapeutic vulnerabilities in cancer. Bioinformatics, btz465, <a href="https://doi.org/10.1093/bioinformatics/btz465">https://doi.org/10.1093/bioinformatics/btz465</a>
                                <br />
                                <br />
                            <br />
                            <br />
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
