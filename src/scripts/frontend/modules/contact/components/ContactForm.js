import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";

const ContactForm = ({
    contact,
    errors,
    loading,
    onSubmit,
    datenschutz,
    updateContactFirstName,
    updateContactLastName,
    updateContactEmail,
    updateContactMobile,
    updateContactInterest,
    updateContactMessage,
    updateErrorMessages
}) => {

    const [interestQuery, updateInterestQuery] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [ready, setReady] = useState(false);
    const [datenschutzValue, setDatenschutzValue] = useState(false);

    useEffect(() => {
        const url = vabs_obj ? vabs_obj.ajax_url : null;
        fetch(`${url}?method=get_client_interest`)
            .then(response => response.json())
            .then(response => {
                updateInterestQuery(response)
            });
    }, []);

    const customClass = (input) => {
        if(errors && errors[input]){
            return 'error'
        }else{
            return ''
        }
    };

    const validate = () => {
        if(
            contact.first_name === '' ||
            contact.last_name === '' ||
            contact.email === '' ||
            contact.mobile === '' ||
            contact.interest === '',
            !datenschutzValue
        ){
            updateErrorMessages({
                first_name: contact.first_name === '',
                last_name: contact.last_name === '',
                email: contact.email === '',
                mobile: contact.mobile === '',
                interest: contact.interest === '',
                datenschutzValue: !datenschutzValue
            });
            return false;
        }else{
            setReady(true);
            return true
        }
    };

    useEffect(() => {
        if(
            contact.first_name !== '' &&
            contact.last_name !== '' &&
            contact.email !== '' &&
            contact.mobile !== '' &&
            contact.interest !== '' &&
            datenschutzValue
        ){
            setReady(true)
        }
    }, [contact]);


    return(
        <div className="vrb__billing vrb__contact">
            <div className="vrb__billing--body">
                <div className="vrb__billing--form">
                    <div className="vrb__billing--formgroup">
                        <div className="vrb__billing--formfield">
                            <label>Vorname</label>
                            <input
                                type="text"
                                value={contact.first_name}
                                className={contact.first_name !== '' ? 'success' : customClass('first_name')}
                                onChange={(e) => {
                                    updateContactFirstName(e.target.value);
                                    if(contact.first_name !== ''){
                                        const newState = {
                                            errors
                                        };
                                        newState['first_name'] = false;
                                        updateErrorMessages(newState)
                                    }
                                }}
                            />
                        </div>
                        <div className="vrb__billing--formfield">
                            <label>Nachname</label>
                            <input
                                type="text"
                                value={contact.last_name}
                                className={contact.last_name !== '' ? 'success' : customClass('last_name')}
                                onChange={(e) => {
                                    updateContactLastName(e.target.value);
                                    if(contact.last_name !== ''){
                                        const newState = {
                                            errors
                                        };
                                        newState['last_name'] = false;
                                        updateErrorMessages(newState)
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="vrb__billing--formfield">
                        <label>Emailadresse</label>
                        <input
                            type="text"
                            value={contact.email}
                            className={contact.email && contact.email !== '' ? 'success' : customClass('email')}
                            onChange={(e) => {
                                updateContactEmail(e.target.value);
                                if(contact.email !== ''){
                                    const newState = {
                                        errors
                                    };
                                    newState['email'] = false;
                                    updateErrorMessages(newState)
                                }
                            }}
                        />
                    </div>
                    <div className="vrb__billing--formfield">
                        <label>Telefonnummer</label>
                        <input
                            type="text"
                            value={contact.mobile}
                            className={contact.mobile && contact.mobile !== '' ? 'success' : customClass('mobile')}
                            onChange={(e) => {
                                updateContactMobile(e.target.value);
                                if(contact.mobile !== ''){
                                    const newState = {
                                        errors
                                    };
                                    newState['mobile'] = false;
                                    updateErrorMessages(newState)
                                }
                            }}
                        />
                    </div>
                    <div className="vrb__billing--formfield">
                        {interestQuery && interestQuery.length ? (
                            <>
                                <label>Interesse</label>
                                <select
                                    value={contact.interest && contact.interest !== '' ? contact.interest.split('_')[0] : -1}
                                    onChange={e => {
                                        const id = e.target.value;
                                        const interest = interestQuery.find(i => i.id === id);
                                        const string = `${id}_${interest.checkbox_title}`;
                                        updateContactInterest(string)
                                        if(contact.interest !== ''){
                                            const newState = {
                                                errors
                                            };
                                            newState['interest'] = false;
                                            updateErrorMessages(newState)
                                        }
                                    }}
                                    className={contact.interest && contact.interest !== -1 ? 'success' : customClass('interest')}
                                >
                                    <option value={-1}>Interesse wählen</option>
                                    {interestQuery && interestQuery.map((element, index) => (
                                        <option
                                            key={index}
                                            value={element.id}
                                        >
                                            {element.checkbox_title}
                                        </option>
                                    ))}
                                </select>
                            </>
                        ) : null}

                    </div>
                    <div className="vrb__billing--formfield">
                        <label>Bemerkung</label>
                        <textarea
                            value={contact.message}
                            onChange={(e) => updateContactMessage(e.target.value)}
                        />
                    </div>
                    {datenschutz ? (
                        <div className="vrb__billing--formfield">
                            <label>
                                <input type="checkbox" required name="datenschutz" value={datenschutzValue} onChange={(e) => {
                                    setDatenschutzValue(e.target.checked)
                                }}/>
                                Mit Absenden des Formulares, bestätige ich die <a href={datenschutz} target="_blank">Datenschutzrichtlinien</a> gelesen und verstanden zu haben und stimme diesen zu
                            </label>
                        </div>
                    ) : null }
                    <div className="vrb__billing--formfield">
                        <button
                            type="submit"
                            disabled={disabled}
                            className={!ready ? 'disabled' : null}
                            onClick={() => {
                                if(validate()){
                                    setDisabled(true);
                                    onSubmit()
                                }
                            }}
                        >
                            absenden
                        </button>
                    </div>
                </div>
            </div>
            {loading ? (
                <div className="vrb__wrapper--loader"/>
            ) : null}
        </div>
    );
};

const mapStateToProps = state => ({
    contact: state.ContactReducer,
    errors: state.ErrorReducer,
    participants: state.ParticipantReducer
});

const mapDispatchToProps = dispatch => ({
    updateContactFirstName: firstName => dispatch({
        type: 'UPDATE_CONTACT_FIRST_NAME',
        payload: firstName
    }),
    updateContactLastName: lastName => dispatch({
        type: 'UPDATE_CONTACT_LAST_NAME',
        payload: lastName
    }),
    updateContactEmail: email => dispatch({
        type: 'UPDATE_CONTACT_EMAIL',
        payload: email
    }),
    updateContactMobile: mobile => dispatch({
        type: 'UPDATE_CONTACT_MOBILE',
        payload: mobile
    }),
    updateContactInterest: interest => dispatch({
        type: 'UPDATE_CONTACT_INTEREST',
        payload: interest
    }),
    updateContactMessage: message => dispatch({
        type: 'UPDATE_CONTACT_MESSAGE',
        payload: message
    }),
    updateErrorMessages: errors => dispatch({
        type: 'UPDATE_ERROR_MESSAGES',
        payload: errors
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);