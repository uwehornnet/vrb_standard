import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";

const SummaryTravelPeriod = ({travelPeriod}) => {
    const [range, setRange] = useState('-');
    const formatedDate = (date) => {
        const monthNames = [
            "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"
        ];

        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        return String(day).padStart(2, '0') + '.' + monthNames[monthIndex] + '.' + year;
    };
    useEffect(() => {
        const start = travelPeriod.range[0];
        const end = travelPeriod.range[1];
        let dateRange;
        if(start && end){
            dateRange = `${formatedDate(start)} - ${formatedDate(end)}`
        }else{
            dateRange = `-`
        }
        setRange(dateRange);
    }, [travelPeriod]);
    return(
        <div className="vrb__summaryperiod">
            <strong>Reisezeitraum</strong>
            <p>{range}</p>
        </div>
    );
};

const mapStateToProps = state => ({
    travelPeriod: state.ContactReducer
});

export default connect(mapStateToProps)(SummaryTravelPeriod);