import React from "react";
import {Line} from "react-chartjs-2";
import {useState,useEffect} from "react";
import numeral from "numeral";

const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };













const buildChart=(data,casesType)=>{ 
    //build a data suitable for line graph
    console.log("----------------------");
    console.log(casesType);
    const chartData=[];
    let lastPoint;
    
    for(let date in data[casesType]){
        if(lastPoint){
           const newPoint= {
                x:date,
                y:data[casesType][date]-lastPoint
            }
            chartData.push(newPoint);
        }
        lastPoint =data[casesType][date];
        

    }
    console.log("chartData>>"+chartData);   
    return chartData;
}

function LineGraph({casesType})
{
   
    const [data,setData]=useState({});
    
    useEffect(()=>{
        
      const fetchData=async()=>  {await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then(response=>response.json())
        .then(data=>{
            
            const chartData= buildChart(data,casesType);
            setData(chartData);
            
           
        });}
        
        
        fetchData();

        //Why 97 line not working out of useEffect-->rendering infinite
        //on writing line 97 before fetchdata not rendering linegraph
    },[casesType])
    
   console.log(data);
    
    return(<div>


{data && data.length>0 && (//may be this thing render first so we have put data.length
<Line
data={{
   
    datasets:[
        {
            backgroundColor:"rgba(204,16,52,0.5)",
            borderColor:'#CC1034',
            data:data,

        },
    ],
}}

options={options}
/>)}

    </div>);
}
export default LineGraph
