import React, { useState, useEffect } from "react"
import { InventoryProvider } from "./inventory/InventoryProvider"
import InventoryList from "./inventory/InventoryList"
import { OrderItemProvider } from "./order/OderItemProvider"
import { Navbar, NavbarBrand, NavLink } from "reactstrap"
import "./navbar.css"

export default (props) => {

//State variables

    const [activeList, setActiveList] = useState("inventory")
    const [components, setComponents] = useState()

//Logout function

    const logout = () => {
        sessionStorage.removeItem("rentasynth__customer")
        props.toggle()
    }

//Inventory list function

    const showInventoryList = () => (

        <InventoryProvider>
            <OrderItemProvider>
                <InventoryList />
            </OrderItemProvider>
        </InventoryProvider>
    )

//useEffect hook changes active component upon nav bar click

    useEffect(() => {
        if (activeList === "inventory") {
            setComponents(showInventoryList)
        }
    }, [activeList])

//Returns active view

    return (
        <>
            <Navbar className="navBar" light expand="md">
                <NavbarBrand>
                    <img className="navImage" src="https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/51683371_356044501904831_6885513495308140544_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_oc=AQlZ3Ct4150viztkSmDHvcb5VZj9BR_tFReex_oPZl4UkAJsbvqo071ai2jBq6v765s&_nc_ht=scontent-ort2-1.xx&oh=a2d476ae4213e52049594ccacd1f6fee&oe=5ED1DD47"></img>
                </NavbarBrand>
                <NavLink className="navLink" href="#" onClick={() => setActiveList("inventory")}>Browse</NavLink>
                <NavLink className="navLink" href="#">Cart</NavLink>
                <NavLink className="navLink" href="#" onClick={logout}>Logout</NavLink>
            </Navbar>
            <div>
                {components}
            </div>
        </>
    )


} 