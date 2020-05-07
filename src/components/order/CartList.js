import React, { useContext } from "react"
import { OrderItemContext } from "./OrderItemProvider"
import "./Cart.css"
import { ListGroup, Row, Col, Button, ListGroupItem, Alert } from "reactstrap"
import { CartTableItem } from "./CartTableItem"
import { OrderContext } from "./OrderProvider"
import { Order } from "./Order"

//Adds all of the order subtotals

    export const orderSubTotalFunction = (items) => {
        let costArray = []
        items.map( item => {
            costArray.push(item.totalRentalPrice)
        })
        const costArraySum = costArray.reduce((a,b) => a + b, 0)
        return costArraySum
    }

//Adds all of the order shipping costs

    export const orderShippingCostFunction = (items) => {
        let costArray = []
        items.map( item => {
            costArray.push(item.shippingCost)
        })
        const costArraySum = costArray.reduce((a,b) => a + b, 0)
        return costArraySum
    }

export default () => {
    
    const { orders, orderOrder } = useContext(OrderContext)

    const { orderItems, orderOrderItem } = useContext(OrderItemContext)

    const userId = sessionStorage.getItem("rentasynth__customer")

//Loops through all orders and returns the user's unordered order

    const theOrderedOrders = orders.filter( order => {
        return (order.userId === userId && order.ordered === true)
    })
    
//Loops through all order items and returns an array of those that match the user

    const theMatchingUnorderedItems = orderItems.filter( item => {
        return (item.userId === userId && item.ordered === false)
    })

//Adds all of the order rental costs
    
    const unorderedSubTotal = orderSubTotalFunction(theMatchingUnorderedItems)

//Shipping totals for ordered and unordered items
    
    const unorderedShippingTotal = orderShippingCostFunction(theMatchingUnorderedItems)

//Adds the subtotal and shipping

    const unorderedTotal = (unorderedSubTotal + unorderedShippingTotal)

//Function to update ordered status of order and order items

    const theMatchingOrder = orders.find( order => {
        return (order.userId === userId && order.ordered === false)
    })

    const updateOrderItems = () => {
        theMatchingUnorderedItems.map( item => {
            orderOrderItem(item)
        })
        orderOrder(theMatchingOrder)
    }

    return (
        <>
            {
                (theMatchingOrder === undefined ?
                    <Alert color="secondary">Cart is empty</Alert> :
                    
                    <ListGroup>
                        {
                            theMatchingUnorderedItems.map( orderItem => {
                                return <CartTableItem key={orderItem.id} orderItem={orderItem} />
                            })
                        }
                        
                        <ListGroupItem>
                            <Row className="text-primary d-flex justify-content-around align-items-center">
                                <Col>Subtotal: ${unorderedSubTotal}</Col>
                                <Col>Shipping: ${unorderedShippingTotal}</Col>
                                <Col><h6>Total: ${unorderedTotal}</h6></Col>
                                <Col><Button className="button" color="primary" onClick={updateOrderItems}>Place Order</Button></Col>
                            </Row>
                        </ListGroupItem>
                    </ListGroup>)
            }
            
            <h2 className="orderHeader">My Orders</h2>

            {
               theOrderedOrders.map( order => {
                    return <Order key={order.id} order={order}/>
                })
            }
        </>
    )

}