import React, { useContext, useRef } from "react"
import { InventoryContext } from "./InventoryProvider"
import { Form, FormGroup, Label, Input, Button } from "reactstrap"
import "./Inventory.css"

export const NewInventoryForm = ({ toggle }) => {

    const { addInventory } = useContext(InventoryContext)

    const make = useRef()
    const model = useRef()
    const type = useRef()
    const rentalPrice = useRef()
    const shippingPrice = useRef()
    const picture = useRef()
    const soundDemo = ""
    const description = useRef()

    const addInventoryItem = () => {

        const newInventoryItem = {
            make: make.current.value,
            model: model.current.value,
            type: type.current.value,
            rentalPrice: parseInt(rentalPrice.current.value),
            shippingPrice: parseInt(shippingPrice.current.value),
            picture: picture.current.value,
            soundDemo: soundDemo,
            description: description.current.value
        }
        console.log(newInventoryItem)
        addInventory(newInventoryItem)
            .then(toggle)
    }

    return (
        <Form className="newInventoryForm">
            <FormGroup>
                <Label htmlFor="make">Make</Label>
                <Input type="text"
                        name="make"
                        innerRef={make}
                        required
                        autoFocus
                        placeholder="make"/>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="model">Model</Label>
                <Input type="text"
                        name="model"
                        innerRef={model}
                        required
                        autoFocus
                        placeholder="model" />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="type">Type</Label>
                <Input type="select"
                        name="type"
                        innerRef={type}
                        required
                        autoFocus
                        placeholder="type">
                    <option>analog synthesizer</option>
                    <option>digital synthesizer</option>
                    <option>dynamic microphone</option>
                    <option>condenser microphone</option>
                    <option>drum machine</option>
                    <option>sequencer</option>
                    <option>preamp</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="rentalPrice">Rental Price</Label>
                <Input type="number"
                        name="rentalPrice"
                        innerRef={rentalPrice}
                        required
                        autoFocus
                        placeholder="rentalPrice"/>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="shippingPrice">Shipping Price</Label>
                <Input type="number"
                        name="shippingPrice"
                        innerRef={shippingPrice}
                        required
                        autoFocus
                        placeholder="shippingPrice"/>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="picture">Picture</Label>
                <Input type="text"
                        name="picture"
                        innerRef={picture}
                        required
                        autoFocus
                        defaultValue="https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/p960x960/53211103_359484971560784_3412520596649541632_o.jpg?_nc_cat=109&_nc_sid=dd9801&_nc_oc=AQlrGKXKc_0GXJ4M65vL8_oqgVBsxe4c90QnkYU4v9dvjOqCRXye3OQkhvp1ydcCQuA&_nc_ht=scontent-ort2-1.xx&_nc_tp=6&oh=3fd08fbb6510cbc685b008c483b29e43&oe=5ECEBCEC"
                        placeholder="picture"/>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="description">Description</Label>
                <Input type="textarea"
                        name="description"
                        innerRef={description}
                        required
                        autoFocus
                        placeholder="description" />
            </FormGroup>
            <Button color="success" type="submit"
            onClick={event => {
                event.preventDefault()
                addInventoryItem()
            }}>
                Save
            </Button>
        </Form>
    )
}