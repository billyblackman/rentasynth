import React, { useContext } from "react"
import { Row, Button, Col } from "reactstrap"
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
                <Row className="list-group-item d-flex justify-content-around align-items-center">
                    <Col className="inventoryItem__name">{inventoryItem.make} {inventoryItem.model}</Col>
                    <Col className="orderItem__price">${inventoryItem.rentalPrice} x {orderItem.rentalLength} days = ${totalRentalPrice}</Col>
                    {
                        (orderItem.shipping === true ? <Col>Shipping = ${inventoryItem.shippingPrice}</Col> : <Col>Pickup</Col>)
                    }
                    <Col>
                        <Button color="danger" onClick={deleteButton}>Remove from cart</Button>
                    </Col>
                </Row>
        </>
    )
}
