import React, { useContext } from "react"
import { OrderItemContext } from "./OrderItemProvider"
import { Card, CardBody, CardTitle, CardSubtitle, Badge, Collapse, Button, ListGroup, ListGroupItem } from "reactstrap"
import { orderSubTotalFunction, orderShippingCostFunction } from "./CartList"
import "./Cart.css"

export const Order = ({order}) => {

//Get all of the order items

    const { orderItems } = useContext(OrderItemContext)

//Find all the order items included in the order

    const theMatchingItems = orderItems.filter( orderItem => {
        return (orderItem.orderId === order.id)
    })  

//Adds all of the orderItem subtotals and shipping

    const orderSubTotal = orderSubTotalFunction(theMatchingItems)
    const orderShippingTotal = orderShippingCostFunction(theMatchingItems)
    const orderTotal = (orderSubTotal + orderShippingTotal)

//Sets state for collapse

    return (
        <>
            <Card className="order">
                <CardBody className="cardBody">
                    <CardTitle>Order #{order.id}</CardTitle>
                    <CardSubtitle>Total: ${orderTotal}</CardSubtitle>
                    {
                        (order.resolved === false ? 
                        <Badge color="secondary">Order Active</Badge> :
                        <Badge color="success">Order Complete</Badge>)
                    }
                </CardBody>
            </Card>
        </>
    )

}