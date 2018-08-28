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

class Drugs extends Component {
    constructor(props) {
        super(props);
        this.loadData = debounce(500, this.loadData);
        this.state = {
            drugs: []
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
        fetch('/drugs')
            .then(res => res.json())
            .then(json => {
                 this.setState({ drugs: json.data });
            });
            console.log(this.props.id);
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell numeric>name</TableCell>
                    <TableCell numeric>source</TableCell>
                    <TableCell numeric>message</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.drugs.map(drug => {
                    return (
                      <TableRow key={drug.id}>
                        <TableCell component="th" scope="row">
                          {drug.id}
                        </TableCell>
                        <TableCell numeric>{drug.name}</TableCell>
                        <TableCell numeric>{drug.source}</TableCell>
                        <TableCell numeric>{this.props.id}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
        );
   }
}

export default withStyles(styles)(Drugs);
