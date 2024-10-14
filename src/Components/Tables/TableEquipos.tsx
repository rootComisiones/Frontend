import React, { useContext } from "react";
import '../../Styles/Reutilized.css'
import { UserContext } from "../../Context/UserContext";


const TableEquipos = ({ setDetalleEquipo, setIsDetalleOn } : { setDetalleEquipo: any, setIsDetalleOn: any }) => {

    const { allTeams } = useContext(UserContext)

    const handleDetalle = (detalle: any) => {
        setIsDetalleOn(true)
        setDetalleEquipo(detalle)
    }

    return (
        <table className="table marginYBox">
            <thead>
                <tr>
                    <th>Equipo</th>
                    <th>Manager</th>
                    <th>Email</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    allTeams.length &&
                    allTeams.map((equipo)=> {
                        return <tr key={"tabla_equipo_"+equipo.username}>
                            <td>{equipo.username}</td>
                            <td>{equipo.nombre+" "+equipo.apellido}</td>
                            <td>{equipo.email}</td>
                            <td className="tdContainer">
                                <p onClick={()=>handleDetalle(equipo)}>Detalle</p>
                                <p>Editar</p>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    )
}

export default TableEquipos;