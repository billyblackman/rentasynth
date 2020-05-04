import React, { useContext } from "react"
import { OrderItemContext } from "./OrderItemProvider"
import "./Cart.css"
import { ListGroup } from "reactstrap"
import { CartTableItem } from "./CartTableItem"

export default () => {

    const { orderItems } = useContext(OrderItemContext)

    const userId = sessionStorage.getItem("rentasynth__customer")
    
    const theMatchingOrderItems = orderItems.filter( item => {
        return (item.userId === userId && item.ordered === false)
    })

    return (
        <>
            <ListGroup>
                {
                    theMatchingOrderItems.map( orderItem => {
                        return <CartTableItem key={orderItem.id} orderItem={orderItem} />
                    })
                }
            </ListGroup>
        </>
    )

}