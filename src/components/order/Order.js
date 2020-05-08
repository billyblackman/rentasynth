import React, { useContext } from "react"
import { OrderItemContext } from "./OrderItemProvider"
import { Card, CardBody, CardTitle, CardSubtitle, Badge, Button } from "reactstrap"
import { orderSubTotalFunction, orderShippingCostFunction } from "./CartList"
import "./Cart.css"
import { OrderContext } from "./OrderProvider"

export const Order = ({order, userId}) => {
    
//Imports completeOrder function from OrderProvider

    const { completeOrder } = useContext(OrderContext)

//Function to complete order upon button click

    const completeOrderButtonFunction = () => {
        completeOrder(order)
    }

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

//If statement function to render correct elements

    const conditionalOrderDisplay = () => {
        if (userId === "1" && order.resolved === false) {
            return <Button outline color="primary" onClick={completeOrderButtonFunction}>Complete Order</Button>
        } else if (userId === "1" && order.resolved === true) {
            return <h4><Button color="success" disabled>Order Completed</Button></h4>
        } else if (userId !== "1" && order.resolved === false) {
            return <h4><Button color="primary">Active</Button></h4>
        } else if (userId !== "1" && order.resolved === true) {
            return <h4><Button color="success" disabled>Completed</Button></h4>
        }
    }

    return (
        <>
            <Card className="order">
                <CardBody className="cardBody">
                    <CardTitle>Order #{order.id}</CardTitle>
                    <CardSubtitle>Total: ${orderTotal}</CardSubtitle>
                    {conditionalOrderDisplay()}
                </CardBody>
            </Card>
        </>
    )

}