const initialState = [];

const ParticipantReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_PARTICIPANT':
            return [
                ...state.filter(participant => participant.id !== action.payload.id),
                action.payload
            ];
        default:
            return state;
    }
};

export default ParticipantReducer;