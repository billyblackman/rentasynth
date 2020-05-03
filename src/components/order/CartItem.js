import React, { useContext } from "react"
import { Card } from "reactstrap"
import { OrderItemContext } from "./OderItemProvider"

//CartList will pass keys to Cart object

export const CartItem =({inventory, orderItem}) => {

    const { deleteOrderItem } = useContext(OrderItemContext)

    const totalRentalPrice = (inventory.rentalPrice * orderItem.rentalLength)

    return (
        <>
            <Card className="cartItem">
                <CardImg src={inventory.picture} />
                <CardTitle className="inventory__name">{inventory.make} {inventory.model}</CardTitle>
                <CardSubtitle className="orderItem__price">${inventory.rentalPrice} x {orderItem.rentalLength} = ${totalRentalPrice}</CardSubtitle>
                <Button color="danger" onClick={deleteOrderItem(orderItem.id)}>Remove from cart</Button>
            </Card>
        </>
    )
}
