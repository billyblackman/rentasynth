import React from "react"
import { InventoryProvider } from "./inventory/InventoryProvider"
import InventoryList from "./inventory/InventoryList"

export default () => {
    return (
        <InventoryProvider>
            <InventoryList />
        </InventoryProvider>
    )
} 