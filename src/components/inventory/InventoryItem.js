import React, { useState, useEffect, useContext } from "react"
import { Card, CardTitle, CardSubtitle, CardBody, CardImg, Modal, Button, ModalHeader } from "reactstrap"
import "./Inventory.css"
import { DatePickerComponent } from "./RentalForm"
import { EditInventoryForm } from "./EditInventoryForm"
import { InventoryContext } from "./InventoryProvider"


//InventoryList will pass keys to the Inventory object

export const InventoryItem = ({inventory}) => {
    
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    
//Handles userId state
    
    const sessionUser = sessionStorage.getItem("rentasynth__customer")
        
    const [userId, setUserId] = useState(null)
        
    useEffect(() => {
        setUserId(sessionUser)
    }, [sessionUser])

//Delete inventory item button function

    const { deleteInventory } = useContext(InventoryContext)

    const deleteInventoryItemButtonFunction = () => {
        deleteInventory(inventory.id)
    }

//Conditional button render function

    const conditionalButtonRenderFunction = () => {
        if (userId === "1") {
            return (
                <>
                    <Button className="button" color="secondary" onClick={toggle}>Edit</Button>
                    <Button className="button" color="danger" onClick={deleteInventoryItemButtonFunction}>Delete</Button>
                </>
            )
        } else {
            return <Button color="primary" onClick={toggle}>Rent me</Button>
        }
    }

    return (
        <>
            <Card className="inventory">
                <CardBody className="cardBody">
                    <div className="cardImageContainer">
                        <CardImg className="cardImage" src={inventory.picture} />
                    </div>
                    <CardTitle className="inventory__name">{inventory.make} {inventory.model}</CardTitle>
                    <CardSubtitle className="inventory__rentalPrice">${inventory.rentalPrice}/day</CardSubtitle>
                    
                    {conditionalButtonRenderFunction()}
                    
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