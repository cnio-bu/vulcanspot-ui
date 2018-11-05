import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

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
    },
    titleChip: {
        fontSize: 20,
        marginBottom:20
    },
    divider:{
        marginTop:5,
        marginBottom:5
    }
});

const baseUrl = 'http://api.vulcanspot.org'

class Help extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                    <Typography component='p' variant='h4' style={{textAlign:'center'}}>
                        vulcanSpot API Reference 
                    </Typography>
                    <br/ >
                    <br/ >
                    <Paper style={{padding:10}} square={true}>
                        <Typography component='p' variant='body1'>
                            vulcanSpot offers programmatic access to its data through a RESTful API.
                            This is a list of available REST endpoints:
                        </Typography>
                        <br/>
                        <Divider className={classes.divider}/>
                        <Typography component='p' variant='h6'>
                            {baseUrl}/genes 
                        </Typography>
                        <Typography component='p' variant='body1'>
                            Lists all genes in vulcanSpot
                        </Typography>

                        <Divider className={classes.divider} />
                        <Typography component='p' variant='h6'>
                            {baseUrl}/genes/{'{gene symbol}'} 
                        </Typography>
                        <Typography component='p' variant='body1'>
                            Lists details for a gene in vulcanSpot
                        </Typography>
                        <Divider className={classes.divider} />
                        <Typography component='p' variant='h6'>
                            {baseUrl}/genes/{'{gene symbol}'}/treatments
                        </Typography>
                        <Typography component='p' variant='body1'>
                            Lists available gene dependencies and treatments for a gene in vulcanSpot
                        </Typography>
                        <Divider className={classes.divider} />
                        <Typography component='p' variant='h6'>
                            {baseUrl}/contexts 
                        </Typography>
                        <Typography component='p' variant='body1'>
                            Lists all cancer contexts in vulcanSpot
                        </Typography>
                    </Paper>
            </main>
        );
    }
}

Help.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Help);
