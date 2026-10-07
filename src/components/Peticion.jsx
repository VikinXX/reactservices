import React, { Component } from 'react'
import axios from 'axios'

export default class Peticion extends Component {

    peticion = () => {
        axios.get("https://services.odata.org/V4/Northwind/Northwind.svc/Employees").then((response) => {
            console.log(response.data)
        })
    }

    render() {
        return (
        <div>
            <h1>Peticion</h1>
            <button onClick={this.peticion}>Realizar petición</button>
        </div>
        )
    }
}
