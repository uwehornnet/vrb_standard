import React from 'react';

const SummaryCourse = ({course}) => {
    let render = (
        <p>{course.amount} Tag(e) á {course.participants} Teilnehmer</p>
    );

    if(course.unit_shortcode === 'h'){
        render = (
            <p>{course.amount} Stunde(n) á {course.participants} Teilnehmer</p>
        );
    }

    return(
        <div className="vrb__summarycourse">
            <div className="vrb__summarycourse--column">
                <strong>{course.name}</strong>
                {render}
            </div>
            <div className="vrb__summarycourse--column">
                <span>{course.price * parseInt(course.participants)}€</span>
            </div>
        </div>
    );
};

export default SummaryCourse;