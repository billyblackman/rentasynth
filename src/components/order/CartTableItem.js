import React, { useContext } from "react"
import { ListGroupItemHeading, ListGroupItemText, ListGroupItem, Button } from "reactstrap"
import { OrderItemContext } from "./OrderItemProvider"
import { InventoryContext } from "../inventory/InventoryProvider"

//CartList will pass keys to Cart object

export const CartTableItem =({orderItem}) => {

    const { deleteOrderItem } = useContext(OrderItemContext)
    const deleteButton = () => deleteOrderItem(orderItem.id)

    const { inventory } = useContext(InventoryContext)

    const inventoryItem = (inventory.find( item => {
        return (item.id === orderItem.inventoryId)
    }))

    const totalRentalPrice = (inventoryItem.rentalPrice * orderItem.rentalLength)

    return (
        <>
                <ListGroupItem className="list-group-item d-flex justify-content-around align-items-center">
                    <ListGroupItemHeading className="inventoryItem__name">{inventoryItem.make} {inventoryItem.model}</ListGroupItemHeading>
                    <ListGroupItemText className="orderItem__price">${inventoryItem.rentalPrice} x {orderItem.rentalLength} days = ${totalRentalPrice}</ListGroupItemText>
                    <Button color="danger" onClick={deleteButton}>Remove from cart</Button>
                </ListGroupItem>
        </>
    )
}
