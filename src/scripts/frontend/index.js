import React from 'react';
import ReactDom from 'react-dom';
import App from "./App";
import initialState from "./redux/initialState";
import {Provider} from "react-redux";

const container = document.querySelectorAll('.vrb');

if(container){
    container.forEach(element => {
        ReactDom.render(
            <Provider store={initialState}>
                <App dataset={element.dataset}/>
            </Provider>,
            element
        );
    })
}

const formTrigger = document.querySelector('a[href="#buchung"]');

if(formTrigger){
    formTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.getElementById(formTrigger.href.split('#')[1]);
        if(target){
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }
    })
}