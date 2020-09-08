import React from 'react';
import InfoBox from './InfoBox'
import Map from './Map'
import './App.css';
import './InfoBox.css';
import {useState,useEffect} from "react";
import Table from './Table';
import LineGraph from './LineGraph';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
 import {sortData} from  './util';
 import "./Map.css";
 import "leaflet/dist/leaflet.css"
function App() {
  const [countries, setCountries]=useState(["WorldWide"]); //state
  const [country, setCountry]=useState("WorldWide");
  const[countryInfo,setCountryInfo]=useState({});
  const[tableData,setTableData]=useState([]);
  const [mapCenter,setMapCenter]=useState({lat:34.80746,lng:-40.4796});
  const[mapZoom,setMapZoom]=useState(3);
  const[mapData,setMapData]=useState([]);
  const[casesType,setCasesType]=useState("cases")
//useEffect has two parameters one lambda function (anunymous) and one array
//useEffect only execute when app.js loas if u have second parameter empty
useEffect(()=>{

  fetch('https://disease.sh/v3/covid-19/all')
  .then(response=>response.json())
  .then(data=>{
    setCountryInfo(data);
  })
},[]);



  useEffect(() =>{

    const getCountriesData=async()=>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=>response.json())
      .then((data) => {
        const countries=data.map((country) =>(
          {
            name:country.country,
            value:country.countryInfo.iso2
          }
        ))
        const sortedData=sortData(data);
        setCountries(countries);
        setTableData(sortedData);
        setMapData(data); //I need whole info
      })
      
    }
    getCountriesData(); 
  },[]);

  const OnCountryChange=async(event)=>{
    const CountryCode=event.target.value;//take selected value
    console.log(CountryCode);
    setCountry(CountryCode);
    //here we have select value of the that not name because value will will go to value of Select  and
    //corresponding name will be shown because we have menuotem like this
    //<MenuItem value={country.value}>{country.name}</MenuItem>
    //https://disease.sh/v3/covid-19/all
    var url=CountryCode==="WorldWide"?'https://disease.sh/v3/covid-19/all':`https://disease.sh/v3/covid-19/countries/${CountryCode}`;//JS CONCATENATEwith string
    await fetch(url)
    .then(response=>response.json()) //turn response object into json
    .then(data=>{ //we will have data
      setCountry(CountryCode)
      setCountryInfo(data);
      if(!(isNaN(data.countryInfo.lat) || isNaN(data.countryInfo.long))){
        setMapCenter([data.countryInfo.lat,data.countryInfo.long]);
        setMapZoom(4);

      }
      
    
    });
    //console.log(countryInfo.cases); (don't put here it will give undefined first or empty object first so put logger outside of onchange function)
    //at first countryInfo will be empty object
    
    

    }
    console.log(countryInfo);
/*
     const changeCircle=async(event)=>{
      console.log("hiii");
      setCaseType(event.target.value);
      console.log("hiiiiii"+event.target.value)

      }*/
  
 
  return (<div className="App">

    <div className="app_left">
    <div className="App-header ">
      
        <h1 >Covid-19 Tracker</h1>
      
      <FormControl  className="app_dropdown">
        <Select variant="outlined"  onChange={OnCountryChange} value={country}>
          <MenuItem value="WorldWide">WorldWide</MenuItem>
          {
            countries.map((country) =>(
              <MenuItem value={country.value}>{country.name}</MenuItem> //output this transformation for each state array variable
              //map take lambda function as parameter
            ))
          }

        </Select>
      </FormControl>


      
    </div>
    <div className="app_stats">
      <InfoBox  onClick={e=>(setCasesType('cases') )}  value="cases" title="CoronaVirus"  cases={countryInfo.todayCases} total={countryInfo.cases} ></InfoBox>
      <InfoBox  value="recovered" onClick={e=>(setCasesType('recovered'))} title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} ></InfoBox>
      <InfoBox  value="deaths" onClick={e=>(setCasesType('deaths'))} title="Death" cases={countryInfo.todayDeaths} total={countryInfo.deaths} ></InfoBox>
    </div>
    <Map countries={mapData} center={mapCenter} zoom={mapZoom} casesType={casesType} />
    </div>
    <Card className="app-right">
      <CardContent>
        <h3>live cases by country</h3>
        <Table TableData={tableData} >
          

        </Table>
        <h3>Worldwide cases :{casesType}</h3>
        {/*sorting by number of cases*/}
        <LineGraph casesType={casesType}/>
      </CardContent>
      
      
    </Card>
    </div>
  );
}

export default App;
