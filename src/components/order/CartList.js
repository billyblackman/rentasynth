import React, { useContext } from "react"
import { OrderItemContext } from "./OrderItemProvider"
import "./Cart.css"
import { ListGroup, Row, Col, Button, ListGroupItem } from "reactstrap"
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
    
    const { orders } = useContext(OrderContext)

    const { orderItems } = useContext(OrderItemContext)

    const userId = sessionStorage.getItem("rentasynth__customer")
    
//Loops through all order items and returns an array of those that match the user

    const theMatchingUnorderedItems = orderItems.filter( item => {
        return (item.userId === userId && item.ordered === false)
    })

    const theMatchingOrderedItems = orderItems.filter( item => {
        return (item.userId === userId && item.ordered === true)
    })


//Adds all of the order rental costs
    
    const orderedSubTotal = orderSubTotalFunction(theMatchingOrderedItems)
    const unorderedSubTotal = orderSubTotalFunction(theMatchingUnorderedItems)

//Shipping totals for ordered and unordered items
    
    const unorderedShippingTotal = orderShippingCostFunction(theMatchingUnorderedItems)
    const orderedShippingTotal = orderShippingCostFunction(theMatchingOrderedItems)

//Adds the subtotal and shipping

    const orderedTotal = (orderedSubTotal + orderedShippingTotal)
    const unorderedTotal = (unorderedSubTotal + unorderedShippingTotal)

    return (
        <>
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
                        <Col><Button className="button" color="primary">Place Order</Button></Col>
                    </Row>
                </ListGroupItem>
            </ListGroup>
            <ul>
                {
                    orders.map( order => {
                        return <Order key={order.id} order={order}/>
                    })
                }
            </ul>
        </>
    )

}