import React from 'react';
import PropTypes from 'prop-types';
import { HorizontalBar } from 'react-chartjs-2';


class ResultsBar extends React.Component {
    state = {
        values: this.props.values
    };

    componentWillReceiveProps(newProps){
        if(newProps.values !== this.props.values){
            this.setState({values: newProps.values});
        }
    }

    render(){
       let values = [this.state.values.genesa,this.state.values.genesb,this.state.values.best,this.state.values.bestDrugs,this.state.values.totalDrugs];
       const options = {
           title:{
                display:true,
               text: 'Results summary'
           },
           legend:{
                display: false
           },
           layout:{padding:{left:0,right:0}},
           maintainAspectRatio:false,
           tooltips:{
           },
           scales: {
                xAxes: [{
                    gridLines:{
                        display:false,
                    },
                    ticks:{
                        max: Math.max(...values),
                        min: 0
                    }
                }],
                yAxes: [{
                    gridLines:{
                        display:false,
                    }
                }]
            }
        }

        let data ={
          datasets:[
              {
                backgroundColor: 'lightgreen',
                data: values
              }
          ],
          labels:['Genes A', 'Genes B','Best results','Unique drugs in best results','Unique drugs in all results']
        }

      return  <div style={{width: '100%',height:'300'}}><HorizontalBar data={data} options={options} /></div>
    }
}

ResultsBar.propTypes = {
    values: PropTypes.shape({
        genesb: PropTypes.number,
        best: PropTypes.number,
        bestDrugs: PropTypes.number
    })
}

export default ResultsBar;
