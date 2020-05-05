import React, { useState, useEffect } from "react"

//Context is exported to components that need access to the order

export const OrderContext = React.createContext()

//OrderProvider decides what can be used by other components

export const OrderProvider = (props) => {

    //order = data
    //setOrder sets the state of the order

    const [orders, setOrders] = useState([])

    const getOrders = () => {
        return fetch("http://localhost:8088/orders")
            .then(response => response.json())
            .then(setOrders)
    }

    const addOrder = (order) => {
        return fetch("http://localhost:8088/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(order)
        })
            .then(getOrders)
    }

    const deleteOrder = (orderId) => {
        return fetch(`http://localhost:8088/orders/${orderId}`, {
            method: "DELETE"
        })
            .then(getOrders)
    }

    const updateOrder = order => {
        return fetch(`http://localhost:8088/orders/${order.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(order)
        })
            .then(getOrders)
    }

    /*
        Load the order when the component is initialized. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */

        useEffect( () => { getOrders() }, [] )

    return (
        <OrderContext.Provider value ={
            {
                orders,
                addOrder,
                deleteOrder,
                updateOrder
            }
        }>
            {props.children}
        </OrderContext.Provider>
    )
}