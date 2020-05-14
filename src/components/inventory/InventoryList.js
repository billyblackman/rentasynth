import React, { useContext, useState, useEffect } from "react"
import { InventoryContext } from "./InventoryProvider"
import { InventoryItem } from "./InventoryItem"
import "./Inventory.css"
import { Card, CardImg, CardBody, Button, Modal } from "reactstrap"
import { NewInventoryForm } from "./NewInventoryForm"


export default () => {

    const { inventory } = useContext(InventoryContext)
    
//Handles userId state

    const sessionUser = sessionStorage.getItem("rentasynth__customer")

    const [userId, setUserId] = useState(null)
        
    useEffect(() => {
        setUserId(sessionUser)
    }, [sessionUser])

//Toggles new inventory item form

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

//If statement function to render Add card if user is owner

        const conditionalRenderFunction = () => {
            if (userId === "1") {
                return (
                    <>
                        <Card className="inventory">
                            <CardBody className="cardBody">
                            <CardImg src="https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/p960x960/53211103_359484971560784_3412520596649541632_o.jpg?_nc_cat=109&_nc_sid=dd9801&_nc_oc=AQlrGKXKc_0GXJ4M65vL8_oqgVBsxe4c90QnkYU4v9dvjOqCRXye3OQkhvp1ydcCQuA&_nc_ht=scontent-ort2-1.xx&_nc_tp=6&oh=3fd08fbb6510cbc685b008c483b29e43&oe=5ECEBCEC" />
                                <Button className="newItemButton" onClick={toggle} color="primary">New item</Button> 
                            </CardBody>
                        </Card>
                        <Modal isOpen={modal} toggle={toggle}>
                            <NewInventoryForm toggle={toggle}/>
                        </Modal>
                    </>
                )
            }
        }


    return (
        <>
            <ul className="inventoryList">
            {conditionalRenderFunction()}
                {
                    inventory.map( item => {
                        return <InventoryItem key={item.id} inventory={item} userId={userId} />
                    })
                }
            </ul>
        </>
    )
}