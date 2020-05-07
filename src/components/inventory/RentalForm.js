import DatePicker from "react-datepicker"
import { addDays } from "date-fns"
import React, { useState, useContext, useEffect } from "react"
import { Button, ButtonGroup } from "reactstrap"
import "./Inventory.css"
import { OrderItemContext } from "../order/OrderItemProvider"
import { OrderContext } from "../order/OrderProvider"


export const DatePickerComponent = ({inventory, toggle}) => {

//Imports from OrderItemProvider and OrderProvider

    const { addOrderItem, orderItems } = useContext(OrderItemContext)
    const { addOrder, orders } = useContext(OrderContext)

//Grabs user ID from session storage

    const userId = sessionStorage.getItem("rentasynth__customer")

//Function to convert length of rental to days integer

    const rentalLength = () => {
        const startDateTimeStamp = Date.parse(startDate)
        const endDateTimeStamp = Date.parse(endDate)
        const rentalLengthTimeStamp = (endDateTimeStamp - startDateTimeStamp)
        const rentalLengthDays = (rentalLengthTimeStamp / (60*60*24*1000))
        return rentalLengthDays
    }
    
//useEffect watches for changes in orders and sets the state of the matching order ID, to be passed to the order item created

const [matchingOrderId, setMatchingOrderId] = useState(null)

useEffect(() => {
       
            let theMatchingOrder = (orders.find( order => order.userId === userId && order.ordered === false))
            
            if (typeof theMatchingOrder !== "undefined") {
                setMatchingOrderId(theMatchingOrder.id)
            } else {
                    addOrder({
                        userId: userId,
                        totalPrice: ((rentalLength() * inventory.rentalPrice) + shippingCost),
                        resolved: false,
                        ordered: false,
                        shippingCost: shippingCost
                    })
            }
        
    }, [orders, orderItems])



//Function to create an order item

    const constructOrderItem = () => {

        if (startDate === null && endDate !== null) {
            window.alert("Please select start date")
        } else if (endDate === null && startDate !== null) {
            window.alert("Please select return date")
        } else if (startDate === null && endDate === null) {
            window.alert("Please select dates")
        } else {

            addOrderItem({
                userId: userId,
                orderId: matchingOrderId,
                inventoryId: inventory.id,
                orderStartDate: startDate,
                orderEndDate: endDate,
                ordered: false,
                shipping: shipping,
                shippingCost: shippingCost,
                rentalLength: rentalLength(),
                totalRentalPrice: (rentalLength() * inventory.rentalPrice)
            })
            .then(toggle)
        }
    }   

//Defines unavailable dates for each inventory item

    const theMatchingOrderItems = orderItems.filter( orderItem => orderItem.inventoryId === inventory.id)
    
    let theUnavailableDates = []

    theMatchingOrderItems.map( orderItem => {

        const orderItemStartDate = new Date(orderItem.orderStartDate)
        const rentalLengthAmount = orderItem.rentalLength

        for (let i = 0; i < rentalLengthAmount; i++) {
            theUnavailableDates.push(new Date(addDays(orderItemStartDate, i)))
        }
    })

//Sets state for date picker

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

//Sets state for pickup/ship method

    const [shipping, setShipping] = useState(false)
    const [shippingCost, setShippingCost] = useState(0)

    const setShippingTrue = () => {
        setShipping(true)
        setShippingCost(inventory.shippingPrice)
    }

    const setShippingFalse = () => {
        setShipping(false)
        setShippingCost(0)
    }

    return (
        <>
            
                <DatePicker selected={startDate}
                            withPortal
                            className="datePicker"
                            id="datePicker"
                            required
                            dateFormat="yyyy-MM-dd"
                            minDate={addDays(new Date(), 1)}
                            excludeDates={theUnavailableDates}
                            placeholderText="Start Date"
                            onChange={date => setStartDate(date)} />
            <br />

                <DatePicker selected={endDate}
                            withPortal
                            className="datePicker"
                            id="datePicker"
                            dateFormat="yyyy-MM-dd"
                            minDate={addDays(startDate, 3)}
                            excludeDates={theUnavailableDates}
                            placeholderText="Return Date"
                            onChange={date => setEndDate(date)} />

            <br />

                <ButtonGroup className="button">
                    <Button color="secondary" onClick={setShippingFalse} active={shipping === false}>Pickup</Button>
                    <Button color="secondary" onClick={setShippingTrue} active={shipping === true}>Ship</Button>
                </ButtonGroup>
                <Button className="button" onClick={constructOrderItem} color="primary">Add to cart</Button>

        </>
    )
}



