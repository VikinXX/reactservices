import React, { Component } from 'react'
import axios from 'axios'

export default class ComponentServiceCustomer extends Component {
    
    state = {
        customers: []
    }

    url = "https://services.odata.org/V4/Northwind/Northwind.svc/Customers";
    getCustomers = () => {
        console.log("Antes")
        axios.get(this.url).then((response) => {
            
            console.log(response);
            // Los datos del servicio con axios siempre vienen dentro de la propiedad data.
            this.setState({
                customers: response.data.value
            })

        })
        console.log("Después");
    }

    

    componentDidMount = () => {
        this.getCustomers();
    }
    
    render() {
        return (
        <div>
            <h1>Component Service Customer</h1>
            {
                this.state.customers.length !== 0 ?
            <ul>
            {
                this.state.customers.map((cliente, index) => {
                    return(<li key={index}>{cliente.ContactName}</li>)
                })
            }
            </ul>
            : ""
            }
        </div>
        )
    }
}
