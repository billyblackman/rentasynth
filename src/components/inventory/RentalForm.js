import DatePicker from "react-datepicker"
import { addDays } from "date-fns"
import React, { useState, useContext } from "react"
import { Button } from "reactstrap"
import "./Inventory.css"
import { OrderItemContext } from "../order/OderItemProvider"

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

//Sets state for date picker

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

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
                rentalLength: rentalLength()
            })
            .then(toggle)
        }
    }

    return (
        <>
            
                <DatePicker selected={startDate}
                            className="datePicker"
                            id="datePicker"
                            dateFormat="yyyy-MM-dd"
                            minDate={addDays(new Date(), 1)}
                            placeholderText="Start Date"
                            fixedHeight
                            onChange={date => setStartDate(date)} />
            <br />

                <DatePicker selected={endDate}
                            className="datePicker"
                            id="datePicker"
                            dateFormat="yyyy-MM-dd"
                            minDate={addDays(new Date(), 2)}
                            placeholderText="Return Date"
                            fixedHeight
                            onChange={date => setEndDate(date)} />

            <br />

                <Button onClick={constructOrderItem} color="primary">Add to cart</Button>

        </>
    )
}