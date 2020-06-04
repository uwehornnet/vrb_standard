const initialState = [];

const CourseReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_COURSE_TO_QUERY':
            return [
                ...state,
                action.payload
            ];
        default:
            return state;
    }
};

export default CourseReducer;