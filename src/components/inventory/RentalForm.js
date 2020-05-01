import DatePicker from "react-datepicker"
import { addDays } from "date-fns"
import React, { useState, useRef, useContext } from "react"
import { Button } from "reactstrap"
import "./Inventory.css"
import { OrderItemContext } from "../order/OderItemProvider"

export const DatePickerComponent = ({inventory, toggle}) => {

    const { addOrderItem } = useContext(OrderItemContext)

    const userId = sessionStorage.getItem("rentasynth__customer")
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
                orderEndDate: endDate
            })
            .then(toggle)
        }
    }
// debugger

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