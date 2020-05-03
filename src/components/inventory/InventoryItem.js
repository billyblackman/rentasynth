import React, { useState } from "react"
import { Card, CardTitle, CardSubtitle, CardBody, CardImg, Modal, Button, ModalHeader } from "reactstrap"
import "./Inventory.css"
import { DatePickerComponent } from "./RentalForm"



//InventoryList will pass keys to the Inventory object
 

 export const InventoryItem = ({inventory}) => {

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    return (
        <>
            <Card className="inventory">
                <CardImg src={inventory.picture} />
                <CardBody className="cardBody">
                    <CardTitle className="inventory__name">{inventory.make} {inventory.model}</CardTitle>
                    <CardSubtitle className="inventory__rentalPrice">${inventory.rentalPrice}/day</CardSubtitle>
                    <Button color="secondary" onClick={toggle}>Rent me</Button>
                </CardBody>
            </Card>
            <Modal id="datePickerModal" isOpen={modal} size="sm" centered={modal} toggle={toggle}>
                <ModalHeader>
                    <DatePickerComponent inventory={inventory} toggle={toggle}/>
                </ModalHeader>
            </Modal>

        </>
    )
}