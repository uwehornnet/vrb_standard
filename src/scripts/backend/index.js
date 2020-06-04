import React from 'react';
import ReactDOM from 'react-dom';
import ShortcodeGenerator from "./modules/shortcodegenerator";

const element = document.querySelector('.vabs__shortcode');

if(element){
    ReactDOM.render(<ShortcodeGenerator/>, element);
}