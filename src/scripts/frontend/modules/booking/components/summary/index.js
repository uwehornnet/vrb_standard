import React, {useEffect, useState, useRef} from 'react'
import SummaryCourse from "./SummaryCourse";
import SummaryTravelPeriod from "./SummaryTravelPeriod";
import SummaryParticipantList from "./SummaryParticipantList";
import SummaryBilling from "./SummaryBilling";
import SummaryMessage from "./SummaryMessage";
import {connect} from "react-redux";

const Summary = ({active = false, state, updateErrorMessages, onSubmit, agb, datenschutz, onNext, onPrev}) => {
    const [ready, setReady] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [agbValue, setAgbValue] = useState(false);
    const [datenschutzValue, setDatenschutzValue] = useState(false);

    const [style, setStyle] = useState({
        height: 0,
        overflow: 'hidden',
        padding: 0
    })
    const  container = useRef()

    const updateStyles = () => {
        const scrollHeight = container.current.scrollHeight
        setStyle({
            height: active ? 'auto' : '0px',
            overflow: 'hidden',
            padding: active ? '16px' : '0px'
        })
    }

    useEffect(() => {
        if(container){
            updateStyles()
            if(active){
                setDisabled(!validate())
            }
        }
    }, [active])

    const validate = () => {
        if(
            state.ContactReducer.first_name === '' ||
            state.ContactReducer.last_name === '' ||
            state.ContactReducer.email === '' ||
            state.ContactReducer.mobile === '' ||
            state.ContactReducer.street === '' ||
            state.ContactReducer.street_number === '' ||
            state.ContactReducer.zip_code === '' ||
            state.ContactReducer.city === '' ||
            state.ContactReducer.interest === '' ||
            state.ContactReducer.range === '' ||
            state.SelectedCourseReducer.length === 0
            // !agbValue ||
            // !datenschutzValue
        ){
            updateErrorMessages({
                first_name: state.ContactReducer.first_name === '',
                last_name: state.ContactReducer.last_name === '',
                email: state.ContactReducer.email === '',
                mobile: state.ContactReducer.mobile === '',
                street: state.ContactReducer.street === '',
                street_number: state.ContactReducer.street_number=== '',
                zip_code: state.ContactReducer.zip_code === '',
                city: state.ContactReducer.city === '',
                interest: state.ContactReducer.interest === '',
                range: state.ContactReducer.range === '',
                course: state.SelectedCourseReducer.length === 0,
                agbValue: !agbValue,
                datenschutzValue: !datenschutzValue
            });
            return false;
        }else{
            setReady(true);
            return true
        }
    };

    useEffect(() => {
        if(
            state.ContactReducer.first_name !== '' &&
            state.ContactReducer.last_name !== '' &&
            state.ContactReducer.email !== '' &&
            state.ContactReducer.mobile !== '' &&
            state.ContactReducer.street !== '' &&
            state.ContactReducer.street_number !== '' &&
            state.ContactReducer.zip_code !== '' &&
            state.ContactReducer.city !== '' &&
            state.ContactReducer.interest !== '' &&
            state.ContactReducer.range !== '' &&
            state.SelectedCourseReducer.length !== 0 &&
            agbValue &&
            datenschutzValue
        ){
            setReady(true)
        }
    }, [state.ContactReducer, state.SelectedCourseReducer]);
    return(
        <div className="vrb__summary">
            <div className="vrb__summary--header">
                <strong>5. Zusammenfassung</strong>
                <small>Überprüfe deine Daten, bevor du deine Buchung absendest</small>
            </div>
            <div className="vrb__summary--body" ref={container} style={style}>
                <div className="vrb__summary--list">
                    {state.SelectedCourseReducer && state.SelectedCourseReducer.sort((a, b) => {
                        if ( a.name < b.name ){
                            return -1;
                        }
                        if ( a.name > b.name ){
                            return 1;
                        }
                        return 0;
                    }).map(course => <SummaryCourse key={course.id} course={course}/>)}
                </div>

                <div className="vrb__summary--period">
                    <SummaryTravelPeriod/>
                </div>

                <div className="vrb__summary--participants">
                    <SummaryParticipantList/>
                </div>

                <div className="vrb__summary--billing">
                    <SummaryBilling/>
                </div>


                <div className="vrb__summary--message">
                    <SummaryMessage/>
                </div>
            </div>
            <div className="vrb__summary--footer">
                {agb ? (
                    <label className={state.ErrorReducer.agbValue ? 'error' : null}>
                        <input type="checkbox" required name="agb" value={agbValue} onChange={(e) => {
                            setAgbValue(e.target.checked)
                        }}/>
                        Mit Absenden des Formulares, bestätige ich die <a href={agb} target="_blank">AGB</a> gelesen und verstanden zu haben und stimme diesen zu
                    </label>
                ) : null }

                {datenschutz ? (
                    <label className={state.ErrorReducer.datenschutzValue ? 'error' : null}>
                        <input type="checkbox" required name="datenschutz" value={datenschutzValue} onChange={(e) => {
                            setDatenschutzValue(e.target.checked)
                        }}/>
                        Mit Absenden des Formulares, bestätige ich die <a href={datenschutz} target="_blank">Datenschutzrichtlinien</a> gelesen und verstanden zu haben und stimme diesen zu
                    </label>
                ) : null }
                {active ? (
                    <>
                        <button
                            onClick={onPrev}
                        >zurück</button>
                        <button
                            disabled={disabled}
                            className={!ready ? 'disabled' : null}
                            onClick={onSubmit}
                        >Kurs buchen</button>
                    </>

                ) : (
                    <>
                        <button
                            onClick={onPrev}
                        >zurück</button>
                        <button
                            onClick={onNext}
                        >weiter</button>
                    </>

                )}

            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    state: state
});

const mapDispatchToProps = dispatch => ({
    updateErrorMessages: errors => dispatch({
        type: 'UPDATE_ERROR_MESSAGES',
        payload: errors
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Summary);