import React, { useContext, useState } from "react"
import { InventoryContext } from "./InventoryProvider"
import { InventoryItem } from "./InventoryItem"


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