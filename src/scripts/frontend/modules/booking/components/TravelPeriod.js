import React, {useEffect, useState, useRef} from 'react';
import Flatpickr from "react-flatpickr";
import { German } from "flatpickr/dist/l10n/de.js"
import {connect} from "react-redux";

const TravelPeriod = ({active = false, errors, travelPeriod, updateTravelDates, updateErrorMessages}) => {
    const [style, setStyle] = useState({
        height: 0,
        overflow: 'hidden',
        padding: 0
    })
    const  container = useRef()
    const [range, setRange] = useState(null);
    const [validationClass, updateValidationClass] = useState(null);
    const [validationErrors, setValidationErrors] = useState(null)
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
        if(errors.range && travelPeriod.range.length <= 1){
            updateValidationClass('error')
        }else if(travelPeriod.range.length > 1){
            updateValidationClass('success')
        }else{
            updateValidationClass(null)
        }
    }, [errors, travelPeriod.range]);

    const updateStyles = () => {
        setStyle({
            height: active ? 'auto' : '0px',
            overflow: 'hidden',
            padding: active ? '16px' : '0px'
        })
    }

    useEffect(() => {
        if(container){
            updateStyles()

        }
    }, [active])

    return (
        <div className="vrb__travelperiod">
            <div className="vrb__travelperiod--header">
                <strong>2. Reisezeitraum</strong>
                <small>Um dir die bestmöglich Windausbeute garantieren zu können, benötigen wir noch deinen Urlaubszeitraum.</small>
            </div>
            <div className="vrb__travelperiod--body" ref={container} style={style}>
                <Flatpickr
                    className={validationClass}
                    style={{
                        display: 'block',
                        width: '100%',
                        marginTop: '0.4rem'
                    }}
                    options={{
                        minDate: new Date(),
                        dateFormat: 'd.m.Y',
                        mode: 'range',
                        locale: German,
                    }}
                    onChange={date => {
                        updateTravelDates(date);
                        const newState = {
                            ...errors
                        };
                        if(travelPeriod.range.length >= 1){
                            newState['range'] = false;
                            updateErrorMessages(newState);
                        }else{
                            newState['range'] = true;
                            updateErrorMessages(newState);
                        }
                    }}
                    placeholder="DD.MM.JJJJ - DD.MM.JJJJ"
                />
            </div>
        </div>
    );
};
const mapStateToProps = state => ({
    travelPeriod: state.ContactReducer,
    errors: state.ErrorReducer
});

const mapDispatchToProps = dispatch => ({
    updateTravelDates: dates => dispatch({
        type: 'UPDATE_CONTACT_TRAVEL_DATES',
        payload: dates
    }),
    updateErrorMessages: errors => dispatch({
        type: 'UPDATE_ERROR_MESSAGES',
        payload: errors
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(TravelPeriod);