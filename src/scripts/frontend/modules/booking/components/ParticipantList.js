import React, {useEffect, useState, createRef, useRef} from 'react';
import Participant from "./Participant";
import {connect} from "react-redux";

const ParticipantList = ({active = false, selectedCourseQuery}) => {
    const [participants, updateParticipants] = useState([]);
    const [style, setStyle] = useState({
        height: 0,
        overflow: 'hidden',
        padding: 0
    })
    const  container = useRef()

    const init = () => {
        let index = 0;
        const courses = selectedCourseQuery.map(course => {
            const mappedCourse = {
                id: course.id,
                name: course.name,
                participants: []
            }

            let counter = 0;

            while(counter < course.participants){
                mappedCourse.participants.push(index);
                counter++;
                index++;
            }

            return mappedCourse;
        });

        updateParticipants(courses)
    };

    useEffect(() => {
        if(selectedCourseQuery.length){
            init();
        }
    }, [selectedCourseQuery]);

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
        <div className="vrb__participantlist">
            <div className="vrb__participantlist--header">
                <strong>3. Teilnehmer</strong>
                <small>Füge deiner Kursauswahl Teilnehmer hinzu.</small>
            </div>
            <div className="vrb__participantlist--body" ref={container} style={style}>
                {selectedCourseQuery && selectedCourseQuery.map((course, i) => (
                    <div className="vrb__participantlist--course" key={i}>
                        <strong>{course.name}</strong>
                        {course.participantsArray && course.participantsArray.map((participant, index) => {
                            return (<Participant key={index} index={index} courseID={course.id} i={i} id={participant.id}/>)
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};


const mapStateToProps = (state) => ({
    selectedCourseQuery: state.SelectedCourseReducer
});

export default connect(mapStateToProps)(ParticipantList);