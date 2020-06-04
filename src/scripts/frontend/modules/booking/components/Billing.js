import React, {useEffect, useState, useRef} from 'react';
import {connect} from "react-redux";

const Billing = ({
    active = false,
    contact,
    errors,
    participants,
    updateContactFirstName,
    updateContactLastName,
    updateContactEmail,
    updateContactMobile,
    updateContactStreet,
    updateContactStreetNumber,
    updateContactZipCode,
    updateContactCity,
    updateContactInterest,
    updateContactMessage,
    updateErrorMessages
}) => {
    const [style, setStyle] = useState({
        height: 0,
        overflow: 'hidden',
        padding: 0
    })
    const  container = useRef()
    const [list, updateList] = useState([]);
    const [interestQuery, updateInterestQuery] = useState([]);

    const updateStyles = () => {
        const scrollHeight = container.current.scrollHeight
        setStyle({
            height: active ? 'auto' : '0px',
            overflow: 'hidden',
            padding: active ? '16px' : '0px'
        })
    }

    useEffect(() => {
        if(container){
            updateStyles()
        }
    }, [active])

    const fillOutForm = (e) => {
        const user = list[e.target.value];
        updateContactFirstName(user.first_name);
        updateContactLastName(user.last_name);
        updateContactMobile(user.mobile);
        updateContactEmail(user.email);
    };
    useEffect(() => {
        updateList(participants && participants.reduce((acc, current) => {
            const x = acc.find(item => item.first_name === current.first_name && item.last_name === current.last_name);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []));

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
    return(
        <div className="vrb__billing">
            <div className="vrb__billing--header">
                <strong>4. Rechnungsdetails</strong>
                <small>Trage hier die Angaben des Rechnungsempfängers ein.</small>
            </div>
            <div className="vrb__billing--body" ref={container} style={style}>
                <div className="vrb__billing--form">
                    <div className="vrb__billing--formfield">
                        {list && list.length ? (
                            <select onChange={fillOutForm} defaultValue={-1}>
                                <option value={-1} disabled>Daten vom Teinehmer übernehmen</option>
                                {list.map(participant => (
                                    <option key={participant.index} value={participant.index}>{`${participant.first_name}, ${participant.last_name}`}</option>
                                ))}
                            </select>
                        ) : null}
                    </div>
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
                    <div className="vrb__billing--formgroup">
                        <div className="vrb__billing--formfield">
                            <label>Strasse</label>
                            <input
                                type="text"
                                value={contact.street}
                                className={contact.street && contact.street !== '' ? 'success' : customClass('street')}
                                onChange={(e) => {
                                    updateContactStreet(e.target.value);
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
                        <div className="vrb__billing--formfield">
                            <label>Nummer</label>
                            <input
                                type="text"
                                value={contact.street_number}
                                className={contact.street_number && contact.street_number !== '' ? 'success' : customClass('street_number')}
                                onChange={(e) => {
                                    updateContactStreetNumber(e.target.value);
                                    if(contact.street_number !== ''){
                                        const newState = {
                                            errors
                                        };
                                        newState['street_number'] = false;
                                        updateErrorMessages(newState)
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="vrb__billing--formgroup">
                        <div className="vrb__billing--formfield">
                            <label>Postleitzahl</label>
                            <input
                                type="text"
                                value={contact.zip_code}
                                className={contact.zip_code && contact.zip_code !== '' ? 'success' : customClass('zip_code')}
                                onChange={(e) => {
                                    updateContactZipCode(e.target.value);
                                    if(contact.zip_code !== ''){
                                        const newState = {
                                            errors
                                        };
                                        newState['zip_code'] = false;
                                        updateErrorMessages(newState)
                                    }
                                }}
                            />
                        </div>
                        <div className="vrb__billing--formfield">
                            <label>Ort</label>
                            <input
                                type="text"
                                value={contact.city}
                                className={contact.city && contact.city !== '' ? 'success' : customClass('city')}
                                onChange={(e) => {
                                    updateContactCity(e.target.value);
                                    if(contact.city !== ''){
                                        const newState = {
                                            errors
                                        };
                                        newState['city'] = false;
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
                </div>
            </div>
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
    updateContactStreet: street => dispatch({
        type: 'UPDATE_CONTACT_STREET',
        payload: street
    }),
    updateContactStreetNumber: number => dispatch({
        type: 'UPDATE_CONTACT_STREET_NUMBER',
        payload: number
    }),
    updateContactZipCode: zipCode => dispatch({
        type: 'UPDATE_CONTACT_ZIP_CODE',
        payload: zipCode
    }),
    updateContactCity: city => dispatch({
        type: 'UPDATE_CONTACT_CITY',
        payload: city
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

export default connect(mapStateToProps, mapDispatchToProps)(Billing);