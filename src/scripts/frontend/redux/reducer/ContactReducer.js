const initialState = {
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    street: '',
    street_number: '',
    zip_code: '',
    city: '',
    range: '',
    arrival_date: '',
    departure_date: '',
    interest: '',
    message: ''
};

const ContactReducer = (state = initialState, action) => {
    const newState = {
        ...state
    };

    switch (action.type) {
        case 'UPDATE_CONTACT_FIRST_NAME':
            newState['first_name'] = action.payload;
            return newState;
        case 'UPDATE_CONTACT_LAST_NAME':
            newState['last_name'] = action.payload;
            return newState;
        case 'UPDATE_CONTACT_EMAIL':
            newState['email'] = action.payload;
            return newState;
        case 'UPDATE_CONTACT_MOBILE':
            newState['mobile'] = action.payload;
            return newState;
        case 'UPDATE_CONTACT_STREET':
            newState['street'] = action.payload;
            return newState;
        case 'UPDATE_CONTACT_STREET_NUMBER':
            newState['street_number'] = action.payload;
            return newState;
        case 'UPDATE_CONTACT_ZIP_CODE':
            newState['zip_code'] = action.payload;
            return newState;
        case 'UPDATE_CONTACT_CITY':
            newState['city'] = action.payload;
            return newState;
        case 'UPDATE_CONTACT_TRAVEL_DATES':
            newState['range'] = action.payload;
            return newState;
        case 'UPDATE_CONTACT_INTEREST':
            newState['interest'] = action.payload;
            return newState;
        case 'UPDATE_CONTACT_MESSAGE':
            newState['message'] = action.payload;
            return newState;
        default:
            return state;
    }
};

export default ContactReducer;