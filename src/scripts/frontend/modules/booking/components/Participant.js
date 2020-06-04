import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";

const Participant = ({courseID, index, participants, updateParticipant, i, id}) => {
    const [participantList, updateParticipantList] = useState([]);
    const [firstName, updateFirstName] = useState('');
    const [lastName, updateLastName] = useState('');
    const [email, updateEmail] = useState('');
    const [mobile, updateMobile] = useState('');

    const updateList = () => {
        const newList = participants.map(participant => ({
            id: id,
            index: participant.index,
            first_name: participant.first_name,
            last_name: participant.last_name,
            email: participant.email,
            mobile: participant.mobile
        }));

        const filtered = newList.reduce((acc, current) => {
            const x = acc.find(item => item.first_name === current.first_name && item.last_name === current.last_name);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []);

        updateParticipantList(filtered);
    };

    const updateParticipantReducer = () => {
        updateParticipant({
            index: i,
            id: id,
            course: courseID,
            first_name: firstName,
            last_name: lastName,
            email: email,
            mobile: mobile
        })
    };

    const updateParticipantFields = (e) => {
        e.persist();
        const selection = participantList.find(u => u.index === parseInt(e.target.value));

        updateFirstName(selection.first_name);
        updateLastName(selection.last_name);
        updateEmail(selection.email);
        updateMobile(selection.mobile);

        updateParticipant({
            index: i,
            id: id,
            course: courseID,
            first_name: selection.first_name,
            last_name: selection.last_name,
            email: selection.email,
            mobile: selection.mobile
        })
    };
    useEffect(() => {
        if(participants.length){
            updateList()
        }
    }, [participants]);
    return(
        <div className="vrb__participant">
            <div className="vrb__participant--header">
                <strong>{index + 1}. Teilnehmer</strong>
            </div>
            {participantList && participantList.length ? (
                <div className="vrb__participant--selection">
                    <select onChange={(e) => updateParticipantFields(e)} defaultValue="placeholder">
                        <option key={-1} value="placeholder" disabled>Teilnehmer aus Liste wählen</option>
                        {participantList.map((participant, index) => (
                            <option key={index} value={index}>{`${participant.first_name}, ${participant. last_name}`}</option>
                        ))}
                    </select>
                </div>
            ) : null}
            <div className="vrb__participant--body">

                <div className="vrb__participant--formgroup">
                    <label>Vorname</label>
                    <input type="text"
                           name="first_name"
                           placeholder="Max"
                           value={firstName}
                           onChange={(e) => updateFirstName(e.target.value)}
                           onBlur={() => updateParticipantReducer()}
                    />
                </div>
                <div className="vrb__participant--formgroup">
                    <label>Nachname</label>
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Mustermann"
                        value={lastName}
                        onChange={(e) => updateLastName(e.target.value)}
                        onBlur={() => updateParticipantReducer()}
                    />
                </div>
                <div className="vrb__participant--formgroup">
                    <label>Emailadresse</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="mail@domain.com"
                        value={email}
                        onChange={(e) => updateEmail(e.target.value)}
                        onBlur={() => updateParticipantReducer()}
                    />
                </div>
                <div className="vrb__participant--formgroup">
                    <label>Telefonnummer</label>
                    <input
                        type="text"
                        name="mobile"
                        placeholder="01243-5678910"
                        value={mobile}
                        onChange={(e) => updateMobile(e.target.value)}
                        onBlur={() => updateParticipantReducer()}
                    />
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    participants: state.ParticipantReducer
});

const mapDispatchToProps = dispatch => ({
    updateParticipant: participant => dispatch({
        type: 'UPDATE_PARTICIPANT',
        payload: participant
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Participant);