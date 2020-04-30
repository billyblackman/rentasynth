import React, { useState } from "react"
import { Card, CardTitle, CardSubtitle, CardBody, CardImg, Modal, Button, ModalBody, ModalHeader } from "reactstrap"
import "./Inventory.css"
import { DatePickerComponent } from "./RentalForm"


/**
 * InventoryList will pass keys to the Inventory object
 */

 export const InventoryItem = ({inventory}) => {

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    return (
        <>
            <Card className="inventory">
                <CardImg src={inventory.picture} />
                <CardBody>
                    <CardTitle className="inventory__name">{inventory.make} {inventory.model}</CardTitle>
                    <CardSubtitle className="inventory__rentalPrice">${inventory.rentalPrice}/day</CardSubtitle>
                    <Button color="secondary" onClick={toggle}>Rent me</Button>
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalBody>
                            <DatePickerComponent toggle={toggle}/>
                        </ModalBody>
                    </Modal>
                </CardBody>
            </Card>

            
        </>
    )
 }
 