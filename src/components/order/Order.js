import React, { useContext, useState } from "react"
import { OrderItemContext } from "./OrderItemProvider"
import { Card, CardBody, CardTitle, CardSubtitle, Button, Modal, ModalBody, ListGroup, ListGroupItem, Row, Col } from "reactstrap"
import { orderSubTotalFunction, orderShippingCostFunction } from "./CartList"
import "./Cart.css"
import { OrderContext } from "./OrderProvider"
import { InventoryContext } from "../inventory/InventoryProvider"

export const Order = ({order, userId}) => {
    
//Imports from providers

    const { inventory } = useContext(InventoryContext)
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

//Sets state for modal
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    return (
        <>
            <Card className="order">
                <CardBody className="orderCardBody">
                    <CardTitle>Order #{order.id}</CardTitle>
                    <CardSubtitle>Total: ${orderTotal}</CardSubtitle>
                    {conditionalOrderDisplay()}
                </CardBody>
                <Button onClick={toggle}>Details</Button>
            </Card>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalBody>
                    <ListGroup>
                        {
                            theMatchingItems.map( item => {

                                const matchingInventoryItem = inventory.find(inventory => item.inventoryId === inventory.id)
                                
                                return (
                                    <>
                                        <ListGroupItem>
                                            <Row className="list-group-item d-flex justify-content-around align-items-center">
                                                <Col>{matchingInventoryItem.make} {matchingInventoryItem.model}</Col>
                                                <Col>{item.rentalLength} days</Col>
                                                {
                                                    (item.shipping === true ?
                                                        <Col>Ship</Col> :
                                                        <Col>Pickup</Col>)
                                                }
                                                <Col>${item.totalRentalPrice}</Col>
                                            </Row>
                                        </ListGroupItem>
                                    </>
                                )
                            })
                        }
                    </ListGroup>
                </ModalBody>
            </Modal>
        </>
    )

}