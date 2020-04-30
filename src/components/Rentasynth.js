import React, { useState } from 'react';
import "../index.css";
import { Auth } from './auth/Auth';
import Dashboard from './Dashboard';



export default () => {

    const [check, update] = useState(false)
    const toggle = () => update(!check)

    return (
        <Dashboard />
    )
}

// return (
//     sessionStorage.getItem("rentasynth__customer") ? <Dashboard /> : <Auth toggle={toggle}/>
// )    