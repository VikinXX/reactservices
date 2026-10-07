import axios from 'axios';
import React, { Component } from 'react'
import Global from '../Global';

export default class EmpleadosOficios extends Component {
    
    state = {
        oficios: [],
        empleados: []
    }

    empleo = React.createRef();

    loadOficios = () => {
        let end = "api/Empleados";
        axios.get(Global.urlEmpleados + end).then((response) => {
            var empleos = [];
            response.data.forEach(empleado => {
                if(!empleos.includes(empleado.oficio)){
                    empleos.push(empleado.oficio);
                }
            });
            this.setState({
                oficios: empleos
            })
        });
    }

    loadEmpleadosOficio = (e) => {
        e.preventDefault();
        let end = "api/Empleados/EmpleadosOficio/";
        let empleados = [];

        axios.get(Global.urlEmpleados + end + this.empleo.current.value).then((response) => {
            response.data.forEach(empleado => {
                empleados.push(empleado);
            });
            this.setState({
                empleados: empleados
            })
        });

    }

    componentDidMount = () => {
        this.loadOficios();
    }
    
    render() {
        return (
        <div>
            <form onSubmit={this.loadEmpleadosOficio}>
                <label>Oficios: </label>
                <select ref={this.empleo}>
                    {
                        this.state.oficios.map((oficio, index) => {
                            return(<option key={index} value={oficio}>{oficio}</option>)
                        })
                    }
                </select>
                <button>Enviar</button>
            </form>
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
