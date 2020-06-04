import React from 'react';
import {connect} from "react-redux";

const SummaryMessage = ({contact}) => {
    return(
        <div className="vrb__summarymessage">
            <strong>Bemerkung</strong>
            <textarea disabled value={contact.message}/>
        </div>
    );
};
const mapStateToProps = state => ({
    contact: state.ContactReducer
});
export default connect(mapStateToProps)(SummaryMessage);