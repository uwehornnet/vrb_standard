const initialState = {};

const ErrorReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_ERROR_MESSAGES':
            return action.payload;
        default:
            return state;
    }
};

export default ErrorReducer;