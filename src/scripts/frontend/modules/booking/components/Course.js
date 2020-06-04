import React, {useRef, useState, useEffect} from 'react';
import {connect} from "react-redux";

const Course = ({
    errors,
    course,
    selectedCourses,
    addCourseToSelectedQuery,
    removeCourseFromSelectedQuery,
    updateSelectedCoursePrice,
    updateErrorMessages
}) => {
    const [checked, setChecked] = useState(false);
    const meta = useRef();
    const [initialPrice, updateInitialPrice] = useState(0);
    const [price, updatePrice] = useState(0);
    const [amount, updateAmount] = useState(course.minBookableAmount);
    const [participants, updateParticipants] = useState(1);
    const [customClass, setCustomClass] = useState('vrb__course');
    const initPrice = async () => {
        const url = vabs_obj ? vabs_obj.ajax_url : null;
        const request = await fetch(`${url}?method=get_course_details&id=${course.id}&qty=${amount}`);
        return await request.json();
    };

    const recalculatePrice = () => {
        if(amount > 1){
            initPrice().then(response => {
                updatePrice(response.price);
            })
        }else{
            updatePrice(initialPrice);
        }
    };

    useEffect(() => {
        initPrice().then(response => {
            updateInitialPrice(response.price);
            updatePrice(response.price);
        })
    }, []);

    const participantsArray = () => {
        let counter = 0;
        const participantsArray = []
        while(counter < participants){
            participantsArray.push({
                id: '_' + Math.random().toString(36).substr(2, 9),
                first_name: '',
                last_name: '',
                mobile: '',
                email: '',
            })
            counter++;
        }

        return participantsArray;
    }

    useEffect(() => {
        const newState = {
            ...errors
        };

        if(checked){
            addCourseToSelectedQuery({
                ...course,
                price,
                participants,
                amount,
                participantsArray: participantsArray()
            });
            newState['course'] = false;
            updateErrorMessages(newState);
        }else{
            removeCourseFromSelectedQuery(course.id)
        }
    },[checked]);

    useEffect(() => {
        recalculatePrice()
    }, [amount]);


    useEffect(() => {
        if(checked){
            updateSelectedCoursePrice({
                id: course.id,
                price: price,
                amount: amount,
                participants: participants,
                participantsArray: participantsArray()
            });
        }
    }, [price, participants]);

    let render = (
        <div className="vrb__course--meta-column">
            <span>Anzahl der Tage:</span>
            <input
                type="number"
                value={amount}
                min={course.minBookableAmount}
                onChange={(e) => updateAmount(e.target.value)}
            />
        </div>
    );

    if(course.unit_shortcode === 'h'){
        render = (
            <div className="vrb__course--meta-column">
                <span>Anzahl der Stunden:</span>
                <input
                    type="number"
                    value={amount}
                    min={course.minBookableAmount}
                    onChange={(e) => updateAmount(e.target.value)}
                />
            </div>
        );
    }

    useEffect(() => {
        if(errors.course){
            setCustomClass('vrb__course error');
        }
    }, [errors]);

    useEffect(() => {
        if(selectedCourses.length){
            setCustomClass('vrb__course');
        }
    }, [selectedCourses]);

    return (
        <div
            className={checked ? 'vrb__course selected' : customClass}
        >
            <div className="vrb__course--columns">
                <div className="vrb__course--column">
                    <input type="checkbox" className="vrb__checkbox" checked={checked} onChange={(e) => {
                        e.persist();
                        setChecked(e.target.checked);
                    }}/>
                </div>
                <div className="vrb__course--column">
                    <div className="vrb__course--title" onClick={() => {
                        setChecked(!checked)
                    }}>{course.name}</div>
                    <div className="vrb__course--description">{course.kurz_beschreibung.replace( /(<([^>]+)>)/ig, '')}</div>
                </div>
                <div className="vrb__course--column">
                    <div className="vrb__course--price">{(parseFloat(price) * participants).toFixed(2)}€</div>
                </div>
            </div>
            <div
                ref={meta}
                className="vrb__course--meta"
                style={{height: checked ? '80px' : '0px'}}
            >
                {render}
                <div className="vrb__course--meta-column">
                    Anzahl der Teilnehmer:
                    <input
                        type="number"
                        value={participants}
                        min={1}
                        max={course.anzMaxTeilnehmer}
                        onChange={(e) => updateParticipants(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    selectedCourses: state.SelectedCourseReducer,
    courseQuery: state.CourseReducer,
    errors: state.ErrorReducer
});

const mapDispatchToProps = (dispatch) => ({
    addCourseToSelectedQuery: course => dispatch({
        type: 'ADD_COURSE_TO_SELECTED_QUERY',
        payload: course
    }),
    updateSelectedCoursePrice: course => dispatch({
        type: 'UPDATE_SELECTED_COURSE_PRICE_OBJECT',
        payload: course
    }),
    removeCourseFromSelectedQuery: id => dispatch({
        type: 'REMOVE_COURSE_FROM_SELECTED_QUERY',
        payload: id
    }),
    updateErrorMessages: errors => dispatch({
        type: 'UPDATE_ERROR_MESSAGES',
        payload: errors
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Course)