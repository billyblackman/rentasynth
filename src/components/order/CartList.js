import React, { useContext } from "react"
import { OrderItemContext } from "./OrderItemProvider"
import "./Cart.css"
import { ListGroup, ListGroupItem, Row, Col } from "reactstrap"
import { CartTableItem } from "./CartTableItem"

export default () => {

    const { orderItems } = useContext(OrderItemContext)

    const userId = sessionStorage.getItem("rentasynth__customer")
    
    const theMatchingOrderItems = orderItems.filter( item => {
        return (item.userId === userId && item.ordered === false)
    })

    const orderSubTotalFunction = () => {
        let costArray = []
        theMatchingOrderItems.map( item => {
            costArray.push(item.totalRentalPrice)
        })
        const costArraySum = costArray.reduce((a,b) => a + b, 0)
        return costArraySum
    }
    
    const orderSubTotal = orderSubTotalFunction()
    debugger

    return (
        <>
            <ListGroup>
                {
                    theMatchingOrderItems.map( orderItem => {
                        return <CartTableItem key={orderItem.id} orderItem={orderItem} />
                    })
                }
                <Row>
                    <Col>Total: ${orderSubTotal}</Col>
                </Row>
            </ListGroup>
        </>
    )

}