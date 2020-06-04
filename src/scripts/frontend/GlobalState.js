import React from 'react';

const GlobalState = () => {
    const state = {
        courseQuery: [],
        selectedCourseQuery: [],
        selectedTrainingsQuery: [],
        contact: {
            first_name: '',
            last_name: '',
            mobile: '',
            email: '',
            street: '',
            street_number: '',
            zip_code: '',
            city: '',
        },
        interest: '',
        message: ''
    };
};

export default GlobalState;