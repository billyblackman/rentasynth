import React, { useState } from 'react';
import "../index.css";
import { Auth } from './auth/Auth';
import Dashboard from './Dashboard';
import CustomerDashboard from './CustomerDashboard';


export default () => {

    const [check, update] = useState(false)
    const toggle = () => update(!check)

    return (
        <CustomerDashboard />
    )
}

// return (
//     sessionStorage.getItem("rentasynth__customer") ? <Dashboard /> : <Auth toggle={toggle}/>
// )    