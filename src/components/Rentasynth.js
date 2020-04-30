import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import "../index.css";
import { Auth } from './auth/Auth';


export default () => {

    const [check, update] = useState(false)
    const toggle = () => update(!check)


    return (
        <Auth toggle={toggle}/>
    )    
}
