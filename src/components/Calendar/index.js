import React from 'react';
import moment from 'moment';
import storage from './../../libs/storage';

import './index.css';
import './../CategorySelect/event.css';

const Calendar = ({yearSelected, monthSelected, openChangeCategory})=>{
    
    let currentYear=moment().format('YYYY');
    let currentMonth=moment().format('MM');
    let currentDay=parseInt(moment().format('D'));
    //let currentCategory = 'none';
    let dateContext = moment(new Date(yearSelected, monthSelected));
    let largeMonthSelected = dateContext.format('MMMM');

    let weekdaysShort = ["Su", "M", "Tu", "W", "Th", "F", "Sa"];
    
    let firstDayOfMonth = () => {
        return moment(dateContext).startOf(yearSelected).format('d'); //Day of week 0...1..5....6
    }

    let daysInMonth = () =>{
        return moment(dateContext).daysInMonth(monthSelected);
    }

    let getWeekDays = () => {
        let weekdays = weekdaysShort.map((day) => {
            return (
                <td key={day} className="week-day">{day}</td>
            );
        });
        return weekdays;
    }
    
    let viewChangeCategory = (e) => {
         openChangeCategory(yearSelected+''+monthSelected, e.target.id); 
    }

    let evaluateCalendar = () => {
        const key=yearSelected+''+monthSelected;
        let calendar_found=storage.get(key);
        
        if(!calendar_found){
            let totalDays=daysInMonth();
            let days=[];
            for(var d=1; d <=totalDays; d++){
                days.push({
                    "day": d,
                    "category": "none"
                });   
            }

            let newValue=
                {"key": key,
                 "calendar": [
                    {"month":   monthSelected,
                     "firstDayOfMonth":  firstDayOfMonth(),
                     "days":    days
                    }
                ]};
            storage.set(key, newValue);
            /*[{"year":"2018", 
                "calendar":
                    [
                        {"month":"january", "firstDayOfMonth":0, "days":[{"day":1, "category":"none"}]}
                    ]
                }                
             ]*/
             calendar_found=storage.get(key);
        }

        if(calendar_found){
           return drawCalendar(calendar_found);
        }
    }

    let drawCalendar = (model) => {
               
        let blanks = [];
        let index_blanks=0;
        let firstDayOfMonth=model.calendar[0].firstDayOfMonth;
        for(index_blanks=0; index_blanks<firstDayOfMonth; index_blanks++){
            blanks.push(<td key={index_blanks*80} className="empty-slot">{""}</td>);
        }
        
        let no_blanks = [];
        let days=model.calendar[0].days;
        days.forEach(
            (item, index) =>{
                const {day, category}=item;
                let day_position=index_blanks+index;
                let is_friday=(day_position===0 || (day_position%7)===0  || ((day_position+1)%7)===0);
                let className = ((parseInt(day)===parseInt(currentDay) && parseInt(currentMonth-1)===parseInt(monthSelected) && parseInt(currentYear)===parseInt(yearSelected))? 'current-day' : 
                             (is_friday? 'friday' : 'day'));
                no_blanks.push(
                    <td key={day} className={className}>
                        <span><button onClick={viewChangeCategory} id={day} className={category}>{day}</button></span>                     
                    </td>
                );   
            }
        );
        
        
        var totalSlots = [...blanks, ...no_blanks];
        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            if((i % 7) !== 0) {
                cells.push(row);
            } else {
                let insertRow = cells.slice();
                rows.push(insertRow);
                cells = [];
                cells.push(row);
            }
            if(i === totalSlots.length-1){
                let insertRow = cells.slice();
                rows.push(insertRow);
            }
        });
 
        let trElems=rows.map((d, i) => {
            return (
                <tr key={i*100}>{d}</tr>
            );
        });

        return trElems;
        
    }

    return(
        <div className="calendar-container">
            <table className="calendar" width="100%">
                <thead>
                    <tr className="calendar-header">
                        <td colSpan="7" align="center"> 
                            <label>{largeMonthSelected}</label>
                        </td>
                    </tr>
                </thead> 
                <tbody>
                    <tr>
                       {getWeekDays()}
                    </tr>
                    {evaluateCalendar()}                      
                </tbody>   
            </table>
        </div>
    );
}

export default Calendar;