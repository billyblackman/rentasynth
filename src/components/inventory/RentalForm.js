import DatePicker from "react-datepicker"
import { addDays } from "date-fns"
import React, { useState } from "react"
import { Button } from "reactstrap"

export const DatePickerComponent = () => {

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    return (
        <>
            <form className="rentalForm">
                <DatePicker selected={startDate}
                            dateFormat="yyyy-MM-dd"
                            minDate={addDays(new Date(), 1)}
                            placeholderText="Start Date"
                            onChange={date => setStartDate(date)} />

                <DatePicker selected={endDate}
                            dateFormat="yyyy-MM-dd"
                            minDate={addDays(new Date(), 2)}
                            placeholderText="Return Date" 
                            onChange={date => setEndDate(date)} />

                <Button color="primary">Add to cart</Button>
            </form>
        </>
    )
}