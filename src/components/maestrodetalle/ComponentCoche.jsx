import axios from 'axios'
import React, { Component } from 'react'
import Global from '../../Global'

export default class ComponentCoche extends Component {
    
    state = {
        idCoche: this.props.id,
        datos: []
    }

    loadCoche = () => {
        axios.get(Global.urlCoches + "api/Coches/findCoche/" + this.props.id).then((response) => {
            this.setState({
                datos: response.data
            })
        })
    }

    componentDidMount = () => {
        this.loadCoche();
    }

    componentDidUpdate = (oldProps) => {
        if(oldProps.id !== this.props.id){
            this.loadCoche();
        }
    }

    render() {
        return (
        <div>
            <h1>Id: {this.state.datos.idCoche}</h1>
            <h2>{this.state.datos.marca} {this.state.datos.modelo}</h2>
            <h3>Conductor: {this.state.datos.conductor}</h3>
            <img src={this.state.datos.imagen} alt="Coche" />
        </div>
        )
    }
}
