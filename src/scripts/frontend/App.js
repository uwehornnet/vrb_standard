import React from 'react';
import BookingModule from "./modules/booking";
import ContactModule from "./modules/contact";
import ThankYouModule from "./modules/thankyou";



const App = ({dataset}) => {
    let render;

    if(dataset.form && dataset.form === 'booking'){
        render = <BookingModule type={dataset.type} query={dataset.query} redirect={dataset.redirect} agb={dataset.agb}  datenschutz={dataset.datenschutz}/>
    }

    if(dataset.form && dataset.form === 'contact'){
        render = <ContactModule redirect={dataset.redirect} agb={dataset.agb}  datenschutz={dataset.datenschutz}/>
    }

    if(dataset.form && dataset.form === 'thankyou'){
        render = <ThankYouModule/>
    }

    return render;
};

export default App;