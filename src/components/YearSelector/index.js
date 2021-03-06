import React from 'react';

const YearSelector = ({onSelectYear, currentYear}) =>{
    
    const selectYear = (e) => {
        onSelectYear(e.target.value);
    }

    return (
        <input type="number" className="btn btn-default btn-xs" step="1" min="2018" onChange={selectYear} value={currentYear}/> 
    )
}

export default YearSelector;