import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';


class ResultsBar extends React.Component {
    state = {
        all: this.props.all,
        top: this.props.top
    };

    componentWillReceiveProps(newProps){
        if(newProps.all !== this.props.all || newProps.top !== this.props.top){
            this.setState({all: newProps.all});
            this.setState({top: newProps.top});
        }
    }

    render(){
       const options = {
           layout:{padding:{left:0,right:0}},
           maintainAspectRatio:false,
           tooltips:{
               mode:'nearest',  
               caretPadding: 30 
           },
           scales: {
                xAxes: [{
                    stacked: true,
                    gridLines:{
                        display:false,
                    },
                    ticks:{
                        max: this.state.all
                    }
                }],
                yAxes: [{
                    stacked: true,
                    gridLines:{
                        display:false,
                    }
                }]
            }
        }

        let data ={
          datasets:[
              {
                label: 'GD',
                data :[this.state.all - this.state.top]
              },
              {
                label: 'top GD',
                backgroundColor: 'lightgreen',
                data :[this.state.top]
              }
          ],
          labels:['Query results']
        }

      return  <div style={{width: '100%',height:'100px'}}><HorizontalBar data={data} options={options} /></div>
    }
}

export default ResultsBar;
