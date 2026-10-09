import axios from 'axios'
import React, { Component } from 'react'
import Global from '../../Global'

export default class EmpleadosComponent extends Component {
    
    state = {
        empleados: [],
        texto: this.props.empleo
    }
    empleoID = this.props.empleo;

    loadEmpleados = () => {
        var empleados = [];
        axios.get(Global.urlEmpleados + "api/Empleados/EmpleadosDepartamento/" + this.props.empleo).then((response) => {
            empleados = response.data
            this.setState({
                empleados: empleados
            })
            
        })
    }
    
    componentDidMount = () => {
        this.loadEmpleados();
    }

    componentDidUpdate = (oldProps) => {
        // oldProps son los valores anteriores a props
        if(this.props.empleo !== oldProps.empleo){
            this.loadEmpleados();
            this.setState({
                texto: this.props.empleo
            })
            console.log(this.state.texto);
            
        }
    }

    render() {
        return (
        <div>
            <h1>Empleados Component</h1>
            <h2>ID Departamento: {this.state.texto}</h2>
            {
                this.state.empleados.length !== 0 ? 
                <ul>
                    {
                        this.state.empleados.map((empleado, index) => {
                            return(<li key={index}>{empleado.idEmpleado}. {empleado.apellido} ({empleado.salario})</li>)
                        })
                    }
                </ul>
                : ""
            }
        </div>
        )
    }
}
