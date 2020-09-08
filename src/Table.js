import React from "react"
import './Table.css'
function Table({TableData}){//props destructured
    return(
    <div className="table">
        {TableData.map(({country ,cases})=>//splitting the object of tabledata here itself but it should match with key
            (<tr>
                <td>{country}</td>
                <td>{cases}</td>
            </tr>)
        )}

    </div>);
}
export default Table;