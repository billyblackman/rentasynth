import React, { useState } from "react"
import CustomerDashboard from "./CustomerDashboard"

export default ({toggle}) => {
    return (
        <CustomerDashboard toggle={toggle} />
    )
}