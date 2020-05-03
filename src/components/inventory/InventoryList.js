import React, { useContext } from "react"
import { InventoryContext } from "./InventoryProvider"
import { InventoryItem } from "./InventoryItem"
import "./Inventory.css"


export default () => {

    const { inventory } = useContext(InventoryContext)

    return (
        <>
            <ul className="inventoryList">
                {
                    inventory.map( item => {
                        return <InventoryItem key={item.id} inventory={item} />
                    })
                }
            </ul>
        </>
    )
}