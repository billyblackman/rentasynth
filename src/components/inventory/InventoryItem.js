import React from "react"
import { Card, CardTitle, CardSubtitle, CardText, CardBody, CardImg } from "reactstrap"
import "./Inventory.css"

/**
 * InventoryList will pass keys to the Inventory object
 */

 export const InventoryItem = ({inventory}) => (
    <Card className="inventory">
        <CardImg src={inventory.picture} />
        <CardBody>
            <CardTitle className="inventory__name">{inventory.make} {inventory.model}</CardTitle>
            <CardSubtitle className="inventory__rentalPrice">${inventory.rentalPrice}/day</CardSubtitle>
        </CardBody>
    </Card>
 )