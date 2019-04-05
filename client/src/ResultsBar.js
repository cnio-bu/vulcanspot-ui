import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';


class ResultsBar extends React.Component {
    state = {
    };

    render(){
       const options = {
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
                }],
                yAxes: [{
                    stacked: true,
                    gridLines:{
                        display:false,
                    },
                }]
            }
        }

        let data ={
          datasets:[
              {
                label: 'GD',
                data :[70]
              },
              {
                label: 'top GD',
                backgroundColor: 'lightgreen',
                data :[30]
              }
          ],
          labels:['Query results']
        }

      return  <div style={{width: '100%',height:'100px'}}><HorizontalBar data={data} options={options} /></div>
    }
}

export default ResultsBar;
