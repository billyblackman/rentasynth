import React from "react"
import { Login } from "./Login"
import { Register } from "./Register"
import "./Auth.css"


export const Auth = ({toggle}) => {
    return (
        <>
            <div className="authContainer">
                <Login toggle={toggle} />
                <Register toggle={toggle} />
            </div>
        </>
    )
}
