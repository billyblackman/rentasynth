import React, { useContext, useState } from "react"
import { InventoryContext } from "./InventoryProvider"
import { Form, FormGroup, Label, Input, Button } from "reactstrap"

export const EditInventoryForm = ({ inventory, toggle }) => {

    const { updateInventory } = useContext(InventoryContext)

//State variable to track inventory item as it is edited

    const [ updatedInventory, setInventory] = useState(inventory)

//Create new item and change state instead of modifying current item

    const handleControlledInputChange = (event) => {

//Create copy of inventory item

        const newInventory = Object.assign({}, updatedInventory)

//Change property on item copy

        newInventory[event.target.name] = event.target.value

//Set copy as new state

        setInventory(newInventory)

    }

    const editInventory = () => {
        updateInventory({
            id: updatedInventory.id,
            make: updatedInventory.make,
            model: updatedInventory.model,
            type: updatedInventory.type,
            rentalPrice: parseInt(updatedInventory.rentalPrice),
            shippingPrice: parseInt(updatedInventory.shippingPrice),
            picture: updatedInventory.picture,
            soundDemo: updatedInventory.soundDemo,
            description: updatedInventory.description
        })
            .then(toggle)
    }

    return (
        <Form>
            <FormGroup>
                <Label htmlFor="make">Make</Label>
                <Input type="text"
                        name="make"
                        required
                        autoFocus
                        placeholder="make"
                        defaultValue={inventory.make}
                        onChange={handleControlledInputChange} />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="model">Model</Label>
                <Input type="text"
                        name="model"
                        required
                        autoFocus
                        placeholder="model"
                        defaultValue={inventory.model}
                        onChange={handleControlledInputChange} />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="type">Type</Label>
                <Input type="text"
                        name="type"
                        required
                        autoFocus
                        placeholder="type"
                        defaultValue={inventory.type}
                        onChange={handleControlledInputChange} />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="rentalPrice">Rental Price</Label>
                <Input type="number"
                        name="rentalPrice"
                        required
                        autoFocus
                        placeholder="rentalPrice"
                        defaultValue={inventory.rentalPrice}
                        onChange={handleControlledInputChange} />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="shippingPrice">Shipping Price</Label>
                <Input type="number"
                        name="shippingPrice"
                        required
                        autoFocus
                        placeholder="shippingPrice"
                        defaultValue={inventory.shippingPrice}
                        onChange={handleControlledInputChange} />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="description">Description</Label>
                <Input type="textarea"
                        name="description"
                        required
                        autoFocus
                        placeholder="description"
                        defaultValue={inventory.description}
                        onChange={handleControlledInputChange} />
            </FormGroup>
            <Button color="success" type="submit"
            onClick={event => {
                event.preventDefault()
                editInventory()
            }}>
                Save
            </Button>
        </Form>
    )
}