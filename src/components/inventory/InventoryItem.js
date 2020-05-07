import React, { useState, useEffect } from "react"
import { Card, CardTitle, CardSubtitle, CardBody, CardImg, Modal, Button, ModalHeader } from "reactstrap"
import "./Inventory.css"
import { DatePickerComponent } from "./RentalForm"
import { EditInventoryForm } from "./EditInventoryForm"


//InventoryList will pass keys to the Inventory object

export const InventoryItem = ({inventory}) => {
    
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    
    const [userId, setUserId] = useState(null)
    
    const sessionUser = sessionStorage.getItem("rentasynth__customer")
    
    useEffect(() => {
        setUserId(sessionUser)
    }, [sessionUser])
    
    return (
        <>
            <Card className="inventory">
                <CardImg src={inventory.picture} />
                <CardBody className="cardBody">
                    <CardTitle className="inventory__name">{inventory.make} {inventory.model}</CardTitle>
                    <CardSubtitle className="inventory__rentalPrice">${inventory.rentalPrice}/day</CardSubtitle>
                    {
                        (userId === "1" ? 
                        <Button color="secondary" onClick={toggle}>Edit</Button> :
                        <Button color="secondary" onClick={toggle}>Rent me</Button> ) 
                    }
                    
                </CardBody>
            </Card>
            <Modal id="datePickerModal" isOpen={modal} size="sm" centered={modal} toggle={toggle}>
                <ModalHeader>
                    {
                        (userId === "1" ? 
                        <EditInventoryForm inventory={inventory} toggle={toggle}/> :
                        <DatePickerComponent inventory={inventory} toggle={toggle}/> )
                    }
                    
                </ModalHeader>
            </Modal>

        </>
    )
}