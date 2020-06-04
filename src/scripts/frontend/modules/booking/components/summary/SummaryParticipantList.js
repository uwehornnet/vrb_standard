import React from 'react';
import SummaryParticipant from "./SummaryParticipant";
import {connect} from "react-redux";

const SummaryParticipantList = ({participantList}) => {
    return(
        <div className="vrb__summaryparticipants">
            <strong>Teilnehmer</strong>
            <div className="vrb__summaryparticipants--list">
                {participantList && participantList.length ? participantList.map((p, i) => (<SummaryParticipant participant={p} index={i} key={i}/>)) : '-'}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    participantList: state.ParticipantReducer
});

export default connect(mapStateToProps)(SummaryParticipantList);