import React, { useState, useEffect } from "react"

//Context is exported to components that need access to the orderItem

export const OrderItemContext = React.createContext()

//InvetoryProvider decides what can be used by other components

export const OrderItemProvider = (props) => {

    //orderItem = data
    //setOrderItem sets the state of the orderItem

    const [orderItem, setOrderItem] = useState([])

    const getOrderItem = () => {
        return fetch("http://localhost:8088/orderItems")
            .then(response => response.json())
            .then(setOrderItem)
    }

    const addOrderItem = (orderItem) => {
        return fetch("http://localhost:8088/orderItems", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderItem)
        })
            .then(getOrderItem)
    }

    const deleteOrderItem = (orderItemId) => {
        return fetch(`http://localhost:8088/orderItem/${orderItemId}`, {
            method: "DELETE"
        })
            .then(getOrderItem)
    }

    const updateOrderItem = orderItem => {
        return fetch(`http://localhost:8088/orderItems/${orderItem.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderItem)
        })
            .then(getOrderItem)
    }

    /*
        Load the orderItem when the component is initialized. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */

        useEffect( () => { getOrderItem() }, [] )

    return (
        <OrderItemContext.Provider value ={
            {
                orderItem,
                addOrderItem,
                deleteOrderItem,
                updateOrderItem
            }
        }>
            {props.children}
        </OrderItemContext.Provider>
    )
}