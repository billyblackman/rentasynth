import React, { useState, useEffect } from "react"

//Context is exported to components that need access to the orderItem

export const OrderItemContext = React.createContext()

//InvetoryProvider decides what can be used by other components

export const OrderItemProvider = (props) => {

    //orderItem = data
    //setOrderItem sets the state of the orderItem

    const [orderItems, setOrderItems] = useState([])

    const getOrderItems = () => {
        return fetch("http://localhost:8088/orderItems")
            .then(response => response.json())
            .then(setOrderItems)
    }

    const addOrderItem = (orderItem) => {
        return fetch("http://localhost:8088/orderItems", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderItem)
        })
            .then(getOrderItems)
    }

    const deleteOrderItem = (orderItemId) => {
        return fetch(`http://localhost:8088/orderItems/${orderItemId}`, {
            method: "DELETE"
        })
            .then(getOrderItems)
    }

    const orderOrderItem = orderItem => {
        return fetch(`http://localhost:8088/orderItems/${orderItem.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                ordered: true
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(getOrderItems)
    }

    /*
        Load the orderItem when the component is initialized. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */

        useEffect( () => { getOrderItems() }, [] )

    return (
        <OrderItemContext.Provider value ={
            {
                orderItems,
                addOrderItem,
                deleteOrderItem,
                orderOrderItem
            }
        }>
            {props.children}
        </OrderItemContext.Provider>
    )
}