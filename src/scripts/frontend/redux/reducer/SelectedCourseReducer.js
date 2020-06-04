const initialState = [];

const SelectedCourseReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_COURSE_TO_SELECTED_QUERY':
            return [
                ...state.filter(course => course.id !== action.payload.id),
                action.payload
            ];
        case 'UPDATE_SELECTED_COURSE_PRICE_OBJECT':
            const data = {
                ...state.find(course => course.id === action.payload.id),
                ...action.payload
            };
            return [
                ...state.filter(course => course.id !== action.payload.id),
                data
            ];
        case 'REMOVE_COURSE_FROM_SELECTED_QUERY':
            return [
                ...state.filter(course => course.id !== action.payload)
            ];
        default:
            return state;
    }
};

export default SelectedCourseReducer;