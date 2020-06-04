import React, {useEffect, useState, useRef} from 'react';
import Course from "./Course";
import {connect} from "react-redux";

const CourseList = ({active = false, addCourseToQuery, courseQuery, type, ids, selectedCourses}) => {
    const  container = useRef()
    const [style, setStyle] = useState({})

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

    useEffect(() => {
        if(container){
            setTimeout(() => updateStyles(), 400)
        }
    }, [selectedCourses.length])


    useEffect(() => {
        const method = type && type === 'group' ? 'get_courses_of_group' : 'get_courses';
        const url = vabs_obj ? vabs_obj.ajax_url : null;
        fetch(`${url}?method=${method}&ids=${ids}`)
            .then(response => response.json())
            .then(response => {
                response.forEach(course => addCourseToQuery(course))
            })
            .then(() => setTimeout(() => updateStyles(), 400));
    }, []);

    return (
        <div className="vrb__courselist">
            <div className="vrb__courselist--header">
                <strong>1. Kursauswahl</strong>
                <small>welchen Kurs möchtest du besuchen?</small>
            </div>
            <div className="vrb__courselist--body" ref={container} style={style}>
                {courseQuery && courseQuery.length ? courseQuery.sort((a, b) => {
                    if ( a.online_pos < b.online_pos ){
                        return -1;
                    }
                    if ( a.online_pos > b.online_pos ){
                        return 1;
                    }
                    return 0;
                }).map(course => <Course key={course.id} course={course}/>) : (
                    <div className="vrb__loader">loading</div>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    courseQuery: state.CourseReducer,
    selectedCourses: state.SelectedCourseReducer
});

const mapDispatchToProps = (dispatch) => ({
    addCourseToQuery: course => dispatch({
        type: 'ADD_COURSE_TO_QUERY',
        payload: course
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);