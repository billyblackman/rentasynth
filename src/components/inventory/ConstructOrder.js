import React, { useContext } from "react"
import { OrderContext } from "../order/OrderProvider"
const { orders, addOrder } = useContext(OrderContext)

//Function to create an order

const constructOrder = () => {

//Loops through all order to see if the current user has an incomplete order

    const findIncompleteOrder = () => {
        
        orders.find( order => {
            if (order.userId === userId && order.ordered === false) {
                return order.id
            } else {
                addOrder({
                    userId: userId,
                    totalPrice: ((rentalLength() * inventory.rentalPrice) + inventory.shippingPrice),
                    resolved: false,
                    ordered: false,
                    shippingCost: inventory.shippingPrice
                }).then(findIncompleteOrder)
            }
        })
    }
    
}
