import React from "react"

/**
 * InventoryList will pass keys to the Inventory object
 */

 export const Inventory = (inventory) => (
    <section className="inventory">
        <div className="inventory__name">{inventory.make} {inventory.model}</div>
        <div className="inventory__rentalPrice">{inventory.rentalPrice}</div>
        <div className="inventory__description">{inventory.description}</div>
    </section>
 )