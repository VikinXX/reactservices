import axios from 'axios'
import React, { Component } from 'react'
import Global from '../../Global'
import ComponentCoche from './ComponentCoche';

export default class ComponentCoches extends Component {

    cocheID = React.createRef();
    state = {
        coches: [],
        coche: 0
    }
    
    loadCoches = () => {
        axios.get(Global.urlCoches + "api/Coches").then((response) => {
            this.setState({
                coches: response.data
            })
        })
    }

    componentDidMount = () => {
        this.loadCoches();
    }

    cargarComponent = (e) => {
        e.preventDefault();
        this.setState({
            coche: this.cocheID.current.value
        })
    }

    render() {
        return (
        <div>
            <form>
                <select ref={this.cocheID}>
                {
                    this.state.coches.map((coche, index) => {
                        return(<option key={index} value={coche.idCoche}>{coche.marca} {coche.modelo}</option>)
                    })
                }
                </select>
                <button onClick={this.cargarComponent}>Enviar</button>
                {
                    this.state.coche !== 0 ?

                    <ComponentCoche id={this.state.coche}/>

                    : ""
                }
            </form>
        </div>
        )
    }
}
