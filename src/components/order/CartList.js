import React, { useContext } from "react"
import { OrderItemContext } from "./OrderItemProvider"
import { CartItem } from "./CartItem"

export default () => {

    const { orderItems } = useContext(OrderItemContext)

    const userId = sessionStorage.getItem("rentasynth__customer")
    
    const theMatchingOrderItems = orderItems.filter( item => {
        return (item.userId === userId && item.ordered === false)
    })
debugger
    return (
        <>
            <ul className="orderItemList">
                {
                    theMatchingOrderItems.map( orderItem => {
                        return <CartItem key={orderItem.id} orderItem={orderItem} />
                       
                    })
                }
            </ul>
        </>
    )

}