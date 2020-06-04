import React from 'react';

const Success = ({type}) => {
    return type && type === 'form' ? (
        <div className="vrb__success">
            <svg style={{width: 300, display: 'block', margin: '0 auto', marginBottom: 32}} viewBox="0 0 128.227 87.123"><g fill="none" stroke="#303030" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"><path d="m30.272 40.988 15.352 37.47c.595 1.452 2.254 2.147 3.707 1.552l70.339-28.816c1.452-.596 2.147-2.255 1.552-3.707l-15.351-37.471c-.596-1.452-2.255-2.147-3.707-1.552l-70.339 28.817c-1.452.595-2.148 2.255-1.553 3.707z" strokeWidth="2.1312"/><path d="m30.397 38.596 46.832 9.257 26.875-39.454" strokeWidth="2.1312"/><g strokeWidth="1.0656"><path d="m47.465 80.256 29.764-32.403 43.943 2.206"/><path d="m.533 70.79 20.779-7.993"/><path d="m4.309 80.04 20.779-7.993"/><path d="m14.699 53.686 10.389-3.996"/><path d="m12.832 58.297 10.39-3.996"/><path d="m10.922 72.047 20.78-7.992"/><circle cx="25.088" cy="32.871" r="1.288"/><circle cx="75.748" cy="79.018" r="1.288"/><circle cx="126.406" cy="31.583" r="1.288"/><circle cx="74.459" cy="1.82" r="1.288"/><path d="m52.659 16.176 2.975 2.975"/><path d="m55.634 16.176-2.975 2.975"/><path d="m107.457 69.301 2.975 2.975"/><path d="m110.432 69.301-2.975 2.975"/><path d="m119.685 6.912 2.974 2.975"/><path d="m122.659 6.912-2.974 2.975"/><path d="m26.308 83.615 2.974 2.974"/><path d="m29.282 83.615-2.974 2.974"/></g></g></svg>
            <h2 style={{textAlign: 'center'}}>Vielen Dank für deine Nachricht.</h2>
            <p style={{textAlign: 'center', maxWidth: 400, margin: '0 auto'}}>In Kürze bekommst du von uns eine Bestätigungsemail.</p>
        </div>
    ) : (
        <div className="vrb__success">
            <svg style={{width: 300, display: 'block', margin: '0 auto', marginBottom: 32}} viewBox="0 0 128.227 87.123"><g fill="none" stroke="#303030" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"><path d="m30.272 40.988 15.352 37.47c.595 1.452 2.254 2.147 3.707 1.552l70.339-28.816c1.452-.596 2.147-2.255 1.552-3.707l-15.351-37.471c-.596-1.452-2.255-2.147-3.707-1.552l-70.339 28.817c-1.452.595-2.148 2.255-1.553 3.707z" strokeWidth="2.1312"/><path d="m30.397 38.596 46.832 9.257 26.875-39.454" strokeWidth="2.1312"/><g strokeWidth="1.0656"><path d="m47.465 80.256 29.764-32.403 43.943 2.206"/><path d="m.533 70.79 20.779-7.993"/><path d="m4.309 80.04 20.779-7.993"/><path d="m14.699 53.686 10.389-3.996"/><path d="m12.832 58.297 10.39-3.996"/><path d="m10.922 72.047 20.78-7.992"/><circle cx="25.088" cy="32.871" r="1.288"/><circle cx="75.748" cy="79.018" r="1.288"/><circle cx="126.406" cy="31.583" r="1.288"/><circle cx="74.459" cy="1.82" r="1.288"/><path d="m52.659 16.176 2.975 2.975"/><path d="m55.634 16.176-2.975 2.975"/><path d="m107.457 69.301 2.975 2.975"/><path d="m110.432 69.301-2.975 2.975"/><path d="m119.685 6.912 2.974 2.975"/><path d="m122.659 6.912-2.974 2.975"/><path d="m26.308 83.615 2.974 2.974"/><path d="m29.282 83.615-2.974 2.974"/></g></g></svg>
            <h2 style={{textAlign: 'center'}}>Vielen Dank für deine Kursbuchung.</h2>
            <p style={{textAlign: 'center', maxWidth: 400, margin: '0 auto'}}>In Kürze bekommst du von uns eine Bestätigungsemail. Wir freuen uns dich bald bei uns begrüßen zu dürfen.</p>
        </div>
    );
};

export default Success;