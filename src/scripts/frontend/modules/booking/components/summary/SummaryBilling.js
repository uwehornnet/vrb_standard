import React from 'react';
import {connect} from "react-redux";

const SummaryBilling = ({contact}) => {


    return(
        <div className="vrb__summarybilling">
            <strong>Rechnungsanschrift</strong>
            <div className="vrb__summarybilling--body">
                { contact.first_name && contact.last_name ? (
                    <>
                        <span>{contact.first_name} {contact.last_name}</span>
                        <span>{contact.street} {contact.street_number}</span>
                        <span>{contact.zip_code} {contact.city}</span>
                    </>
                ) : '-' }

            </div>
        </div>
    );
};
const mapStateToProps = state => ({
    contact: state.ContactReducer
});
export default connect(mapStateToProps)(SummaryBilling);