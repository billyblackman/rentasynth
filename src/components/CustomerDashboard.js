import React from "react"
import { InventoryProvider } from "./inventory/InventoryProvider"
import InventoryList from "./inventory/InventoryList"
import { OrderItemProvider } from "./order/OderItemProvider"

export default () => {
    return (
        <InventoryProvider>
            <OrderItemProvider>
                <InventoryList />
            </OrderItemProvider>
        </InventoryProvider>
    )
} 