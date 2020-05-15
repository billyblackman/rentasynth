import React, { useRef } from "react"
import { Form, FormGroup, Label, Input, Button } from "reactstrap"
import "./Auth.css"

export const Register = (props) => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const password = useRef()
    const verifyPassword = useRef()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(_ => _.json())
            .then(user => {
                if (user.length) {
                    return true
                }
                return false
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            existingUserCheck()
                .then(() => {
                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: email.current.value,
                            password: password.current.value,
                            firstName: firstName.current.value,
                            lastName: lastName.current.value
                        })
                    })
                        .then(_ => _.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                sessionStorage.setItem("rentasynth__customer", createdUser.id)
                                props.toggle()
                            }
                        })
                })
        } else {
            window.alert("Passwords do not match")
        }
    }

    return (
            <Form className="form--register" onSubmit={handleRegister}>
                <h2>Register</h2>
                <FormGroup>
                    <Label htmlFor="firstName"> First Name </Label>
                    <Input ref={firstName} type="text"
                        name="firstName"
                        placeholder="First name"
                        required  />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="lastName"> Last Name </Label>
                    <Input ref={lastName} type="text"
                        name="lastName"
                        placeholder="Last name"
                        required />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="inputEmail"> Email address </Label>
                    <Input ref={email} type="email"
                        name="email"
                        placeholder="Email address"
                        required />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="inputPassword"> Password </Label>
                    <Input ref={password} type="password"
                        name="password"
                        placeholder="Password"
                        required />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="verifyPassword"> Verify Password </Label>
                    <Input ref={verifyPassword} type="password"
                        name="verifyPassword"
                        placeholder="Verify password"
                        required />
                </FormGroup>
                <FormGroup>
                    <Button type="submit">
                        Register
                    </Button>
                </FormGroup>
            </Form>
    )
}

