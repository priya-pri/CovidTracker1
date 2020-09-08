
import React from "react"
import numeral from "numeral"
import {Circle ,Popup} from "react-leaflet"

//import react for using some jsx
//opaque means transparent
const casesTypeColors={
    cases:{
        hex:"#CC1034",
        multiplier:800
    },
    recovered:{
        hex:"#7dd71d",
        multiplier:1200

    },
    deaths:{
        hex:"#ffff00",
        multiplier:2000

    }
}
export const sortData=(data)=>{
    const sortedData=[...data]//es6 notation(splitting and structuring;copying data to sortedData
    sortedData.sort((a,b)=>b.cases-a.cases);
    return sortedData;
}
//draw cirles on maps
export const showDataOnMap=(data,casesType='cases')=>(
    data.map((country)=>(
        <Circle center={[country.countryInfo.lat,country.countryInfo.long]}
        fillOpacity={0.4}
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].hex}
        radius={
            Math.sqrt(country[casesType])*casesTypeColors[casesType].multiplier
        }>
            <Popup>
            <div className="info-container">
                <div className="info-flag" style={{backgroundImage:`url(${country.countryInfo.flag})` }}>gvg</div>
                
                {console.log("flagg"+country.countryInfo.flag)}
                <div className="info-name">country:{country.country}</div>
                <div className="info-confirmed">Cases:{country.cases}</div>
                <div className="info-recovered">Recovered:{country.recovered}</div>
                <div className="info-deaths">Deaths:{country.deaths}</div>
            </div>




            </Popup>
        </Circle>
        
    )
    )
    
    

);//(...) means direct return