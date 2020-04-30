import React, { useState, useEffect } from "react"

//Context is exported to components that need access to the inventory

export const InventoryContext = React.createContext()

//InvetoryProvider decides what can be used by other components

export const InventoryProvider = (props) => {

    //inventory = data
    //setInventory sets the state of the inventory

    const [inventory, setInventory] = useState([])

    const getInventory = () => {
        return fetch("http://localhost:8088/inventory")
            .then(response => response.json())
            .then(setInventory)
    }

    const addInventory = (inventory) => {
        return fetch("http://localhost:8088/inventory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inventory)
        })
            .then(getInventory)
    }

    const deleteInventory = (inventoryId) => {
        return fetch(`http://localhost:8088/inventory/${inventoryId}`, {
            method: "DELETE"
        })
            .then(getInventory)
    }

    const updateInventory = inventory => {
        return fetch(`http://localhost:8088/inventorys/${inventory.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inventory)
        })
            .then(getInventory)
    }

    /*
        Load the inventory when the component is initialized. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */

        useEffect( () => { getInventory() }, [] )

    return (
        <InventoryContext.Provider value ={
            {
                inventory,
                addInventory,
                deleteInventory,
                updateInventory
            }
        }>
            {props.children}
        </InventoryContext.Provider>
    )
}