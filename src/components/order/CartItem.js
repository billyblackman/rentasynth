import React, { useContext } from "react"
import { Card, CardImg, CardTitle, CardSubtitle, Button, CardBody } from "reactstrap"
import { OrderItemContext } from "./OrderItemProvider"
import { InventoryContext } from "../inventory/InventoryProvider"

//CartList will pass keys to Cart object

export const CartItem =({orderItem}) => {

    const { deleteOrderItem } = useContext(OrderItemContext)

    const { inventory } = useContext(InventoryContext)

    const inventoryItem = (inventory.find( item => {
        return (item.id === orderItem.inventoryId)
    }))

    const totalRentalPrice = (inventoryItem.rentalPrice * orderItem.rentalLength)

    const deleteButton = () => deleteOrderItem(orderItem.id)

    return (
        <>
            <Card className="cartItem">
                <CardBody>
                    <CardTitle className="inventoryItem__name">{inventoryItem.make} {inventoryItem.model}</CardTitle>
                    <CardSubtitle className="orderItem__price">${inventoryItem.rentalPrice} x {orderItem.rentalLength} days = ${totalRentalPrice}</CardSubtitle>
                    <Button color="danger" onClick={deleteButton}>Remove from cart</Button>
                </CardBody>
            </Card>
        </>
    )
}
