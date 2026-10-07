import axios from 'axios'
import React, { Component } from 'react'
import Global from '../Global'

export default class ComponentServiceSuppliers extends Component {

    state = {
        suppliers : []
    }
    idSupply = React.createRef();

    loadSuppliers = () => {
        let request = "Suppliers";
        axios.get(Global.urlNorthwind + request).then((response) => {
            this.setState({
                suppliers: response.data.value
            })
        })
    }

    componentDidMount = () => {
        this.loadSuppliers();
    }

    loadIDSupplier = (event) => {
        event.preventDefault();
        
        this.state.suppliers.forEach(supply => {
            if(supply.SupplierID === parseInt(this.idSupply.current.value)){
                console.log(supply.SupplierID, supply.ContactName);
                
            }
        })
    }

    render() {
        return (
        <div>
            <ul>
                {
                    this.state.suppliers.map((supply, index) => {
                        return(<li key={index}>{supply.SupplierID}. {supply.ContactName}<button onClick={() => this.loadIDSupplier(supply.SupplierID)}>Este</button></li>)
                    })
                }
            </ul>

            <form onSubmit={this.loadIDSupplier}>
                <input type="number" ref={this.idSupply}/>
                <button>Enviar</button>
            </form>
        </div>
        )
    }
}
