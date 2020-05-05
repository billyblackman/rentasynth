import React, { useContext } from "react"
import { OrderItemContext } from "./OrderItemProvider"
import "./Cart.css"
import { ListGroup, Row, Col, Button, ListGroupItem } from "reactstrap"
import { CartTableItem } from "./CartTableItem"

export default () => {

    const { orderItems } = useContext(OrderItemContext)

    const userId = sessionStorage.getItem("rentasynth__customer")
    
//Loops through all order items and returns an array of those that match the user

    const theMatchingOrderItems = orderItems.filter( item => {
        return (item.userId === userId && item.ordered === false)
    })

//Adds all of the order rental costs

    const orderSubTotalFunction = () => {
        let costArray = []
        theMatchingOrderItems.map( item => {
            costArray.push(item.totalRentalPrice)
        })
        const costArraySum = costArray.reduce((a,b) => a + b, 0)
        return costArraySum
    }
    
    const orderSubTotal = orderSubTotalFunction()

//Adds all of the order shipping costs

    const orderShippingCostFunction = () => {
        let costArray = []
        theMatchingOrderItems.map( item => {
            costArray.push(item.shippingCost)
        })
        const costArraySum = costArray.reduce((a,b) => a + b, 0)
        return costArraySum
    }
    
    const orderShippingTotal = orderShippingCostFunction()

//Adds the subtotal and shipping

    const orderTotal = (orderSubTotal + orderShippingTotal)

//


    return (
        <>
            <ListGroup>
                {
                    theMatchingOrderItems.map( orderItem => {
                        return <CartTableItem key={orderItem.id} orderItem={orderItem} />
                    })
                }
                
                <ListGroupItem>
                    <Row className="text-primary d-flex justify-content-around align-items-center">
                        <Col>Subtotal: ${orderSubTotal}</Col>
                        <Col>Shipping: ${orderShippingTotal}</Col>
                        <Col><h6>Total: ${orderTotal}</h6></Col>
                        <Col><Button className="button" color="primary">Place Order</Button></Col>
                    </Row>
                </ListGroupItem>
            </ListGroup>
        </>
    )

}