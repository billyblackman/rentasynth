import DatePicker from "react-datepicker"
import { addDays } from "date-fns"
import React, { useState, useContext } from "react"
import { Button, ButtonGroup } from "reactstrap"
import "./Inventory.css"
import { OrderItemContext } from "../order/OrderItemProvider"

export const DatePickerComponent = ({inventory, toggle}) => {

//Imports functions from OrderItemProvider

    const { addOrderItem } = useContext(OrderItemContext)

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
                inventoryId: inventory.id,
                orderStartDate: startDate,
                orderEndDate: endDate,
                ordered: false,
                shipping: shipping,
                rentalLength: rentalLength(),
                totalRentalPrice: (rentalLength() * inventory.rentalPrice)
            })
            .then(toggle)
        }
    }

//Sets state for date picker

const [startDate, setStartDate] = useState(null)
const [endDate, setEndDate] = useState(null)

//Sets state for pickup/ship method

    const [shipping, setShipping] = useState(false)

    return (
        <>
            
                <DatePicker selected={startDate}
                            withPortal
                            className="datePicker"
                            id="datePicker"
                            dateFormat="yyyy-MM-dd"
                            minDate={addDays(new Date(), 1)}
                            placeholderText="Start Date"
                            onChange={date => setStartDate(date)} />
            <br />

                <DatePicker selected={endDate}
                            withPortal
                            className="datePicker"
                            id="datePicker"
                            dateFormat="yyyy-MM-dd"
                            minDate={addDays(startDate, 3)}
                            placeholderText="Return Date"
                            onChange={date => setEndDate(date)} />

            <br />

                <ButtonGroup className="button">
                    <Button color="secondary" onClick={() => setShipping(false)} active={shipping === false}>Pickup</Button>
                    <Button color="secondary" onClick={() => setShipping(true)} active={shipping === true}>Ship</Button>
                </ButtonGroup>
                <Button className="button" onClick={constructOrderItem} color="primary">Add to cart</Button>

        </>
    )
}



