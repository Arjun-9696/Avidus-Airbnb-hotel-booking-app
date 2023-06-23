import React from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useState } from 'react';
import { differenceInDays } from 'date-fns'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Calendar = () => {

    const [startDate, setStartDate] = useState(new Date());
    console.log('startDate:', startDate)
 
    const [endDate, setEndDate] = useState(new Date());
    console.log('endDate:', endDate)

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear());
        return `${day}-${month}-${year}`;
    };

    const handleSelect = (ranges) => {
        setStartDate(formatDate(ranges.selection.startDate));
        setEndDate(formatDate(ranges.selection.endDate))
    }
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection"
    }
    var daysCheck = differenceInDays(endDate, startDate);
    console.log('daysCheck:', daysCheck)
   
  
    return (
        <div className='calendNavBarHodl mx-auto'>
            <div className='NavBarCalendar'>
                <DateRangePicker color='black' ranges={[selectionRange]} minDate={new Date()} rangeColors={["#black"]} onChange={handleSelect} />
            </div>
        </div>

    )
}

export default Calendar