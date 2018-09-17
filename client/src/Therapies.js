import React, { Component } from 'react';
import {debounce} from 'throttle-debounce';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
};

class Therapies extends Component {
    constructor(props) {
        super(props);
        this.loadData = debounce(500, this.loadData);
        this.state = {
            therapies: []
        };
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.id !== this.props.id){
            this.loadData();
        }
    }

    loadData(){
        fetch('/genes/APTO/therapies')
            .then(res => res.json())
            .then(json => {
                 this.setState({ therapies: json.data });
                 console.log(this.state.therapies);
            })
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell component="th" scope="row">gene A</TableCell>
                    <TableCell component="th" scope="row">alteration</TableCell>
                    <TableCell component="th" scope="row">context</TableCell>
                    <TableCell component="th" scope="row">gene B</TableCell>
                    <TableCell component="th" scope="row">gene B role</TableCell>
                    <TableCell component="th" scope="row">evidence</TableCell>
                    <TableCell component="th" scope="row">score</TableCell>
                    <TableCell component="th" scope="row">drug</TableCell>
                    <TableCell component="th" scope="row">pandrugs</TableCell>
                    <TableCell component="th" scope="row">lincs</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.therapies.map(therapy => {
                    return (
                      <TableRow>
                        <TableCell>{therapy.gene_a}</TableCell>
                        <TableCell>{therapy.gene_a_alteration}</TableCell>
                        <TableCell>{therapy.context}</TableCell>
                        <TableCell>{therapy.gene_b}</TableCell>
                        <TableCell>{therapy.gene_b_role}</TableCell>
                        <TableCell>{therapy.evidence}</TableCell>
                        <TableCell numeric>{therapy.rscore}</TableCell>
                        <TableCell>{therapy.drug_name}</TableCell>
                        <TableCell numeric>{therapy.score_pandrugs}</TableCell>
                        <TableCell numeric>{therapy.score_lincs}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
        );
   }
}

export default withStyles(styles)(Therapies);
