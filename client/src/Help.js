import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import logo from './img/logo.png';

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
    }
});

class Help extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                    <Typography component='p' variant='h4' style={{textAlign:'center'}}>
                        Vulcanspot Help 
                    </Typography>
                    <br/ >
                    <br/ >
                    <Paper style={{padding:10}} square={true}>
                        <Chip
                        avatar={<Avatar alt="" src={logo} />}
                        className={classes.titleChip}
                        label="VulcanSpot, a method implemented to detect and target cancer genetic dependencies."
                        />
                        <Typography component='p'>
                            VulcanSpot integrates genome-wide information provided by large-scale screening experiments
                            to detect genetic vulnerabilities associated to tumours. The method proposes prioritized drugs
                            to target cancer-specific gene dependencies using a weighted scoring system based on well known
                            drug-gene relationships and drug repositioning strategies.
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
