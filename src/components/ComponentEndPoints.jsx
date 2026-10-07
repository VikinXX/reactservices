import React, { Component } from 'react'
import Global from '../Global'
import axios from 'axios';

export default class ComponentEndPoints extends Component {

    numeroDep = React.createRef();

    state = {
        empleados: [],
        departamentos: []
    }

    loadEmpleadosDepartamento = (e) => {
        e.preventDefault();
        let endPoint = "api/Empleados/EmpleadosDepartamento/"
        axios.get(Global.urlEmpleados + endPoint + this.numeroDep.current.value).then((response) => {
            this.setState({
                empleados: response.data
            })
        })
    }

    loadDepartamentos = () => {
        let endPoint = "webresources/departamentos"
        axios.get(Global.urlDepartamentos + endPoint).then((response) => {
            this.setState({
                departamentos: response.data
            })
        })
    }

    componentDidMount = () => {
        this.loadDepartamentos();
    }

    render() {
        return (
        <div>
            <form onSubmit={this.loadEmpleadosDepartamento}>
                <label>Número de departamento: </label>
                <select ref={this.numeroDep}>
                    {
                    this.state.departamentos.map((dep, index) => {
                        return(<option key={index} value={dep.numero}>{dep.numero}. {dep.nombre} ({dep.localidad})</option>)
                    })
                }
                </select>
                <button>Enviar</button>
            </form>
            <ul>
                {
                    this.state.empleados.map((empleado, index) => {
                        return(<li key={index}>{empleado.idEmpleado}. {empleado.apellido}</li>)
                    })
                }
            </ul>
        </div>
        )
    }
}
