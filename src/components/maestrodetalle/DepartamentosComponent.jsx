import axios from 'axios'
import React, { Component } from 'react'
import Global from '../../Global'
import EmpleadosComponent from './EmpleadosComponent'

export default class DepartamentosComponent extends Component {
    
    empleo = React.createRef();
    state = {
        departamentos: [],
        empleo: 0
    }

    loadDepartamentos = () => {
        axios.get(Global.urlDepartamentos + "webresources/departamentos").then((response) => {
            
            this.setState({
                departamentos: response.data
            })
        })
        
    }

    cargarComponent = (e) => {
        e.preventDefault();
        this.setState({
            empleo: parseInt(this.empleo.current.value)
        })
        
    }

    componentDidMount = () => {
        this.loadDepartamentos();
    }

    render() {
        return (
        <div>
            <form>
                <label>Oficios: </label>
                <select ref={this.empleo}>
                    {
                        this.state.departamentos.map((oficio, index) => {
                            return(<option key={index} value={oficio.numero}>{oficio.nombre}</option>)
                        })
                    }
                </select>
                <button onClick={this.cargarComponent}>Enviar</button>
            </form>
            {
                this.state.empleo !== 0 ?
            
            <EmpleadosComponent empleo={this.state.empleo}/>
            
                : ""
            }
        </div>
        )
    }
}