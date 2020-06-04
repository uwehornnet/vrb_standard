import React, {useEffect, useState} from 'react';

const ThankYouModule = () => {
    const [session, updateSession] = useState(null);

    useEffect(() => {
        const windowSession = window.sessionStorage.getItem('vrb');
        if(windowSession){
            updateSession(JSON.parse(windowSession));
            const layer = window.dataLayer;
            if(layer && windowSession){
                const vrbSession = JSON.parse(windowSession);
                let priceTotal = 0;
                const orderedItems = [];
                vrbSession.course.forEach(course => {
                    orderedItems.push({
                        "name": course.name,
                        "quantity": course.qty,
                        "price": course.price
                    });
                    priceTotal += parseFloat(course.price)
                });

                const data = {
                    'event': 'orderCompleted',
                    'transactionId': vrbSession.ID,
                    'transactionAffiliation': 'Surf and Kite',
                    'transactionTotal': priceTotal,
                    'transactionCurrency': 'EUR',
                    'transactionProducts': orderedItems
                };

                layer.push(data)
            }
        }
    }, []);

    return session ? (
        <div className="vrb__thankyou">
            <div className="vrb__thankyou--title">
                <h2>Deine Buchungsübersicht</h2>
            </div>
            <div className="vrb__thankyou--table">
                {session && session.course.map((course, index) => (
                    <div key={index} className="vrb__thankyou--table-row">
                        <div className="vrb__thankyou--table-column">
                            <small>Kurs</small>
                            {course.name}
                        </div>
                        <div className="vrb__thankyou--table-column">
                            <small>Teilnehmer</small>
                            {course.participants}
                        </div>
                        <div className="vrb__thankyou--table-column">
                            <small>Anzahl</small>
                            {course.qty}
                        </div>
                        <div className="vrb__thankyou--table-column">
                            <small>Preis</small>
                            {parseFloat(course.price).toFixed(2)}€
                        </div>
                    </div>
                ))}
            </div>
            <div className="vrb__thankyou--footer">
                <h2>So geht es für dich weiter</h2>
                <p>In Kürze bekommst du von uns eine Bestätigungsemail. Wir freuen uns dich bald bei uns begrüßen zu dürfen.</p>
            </div>
        </div>
    ) : null;
};

export default ThankYouModule