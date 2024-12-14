import React, { useContext, useEffect, useState } from "react";

import '../../Styles/Reutilized.css'
import { UserContext } from "../../Context/UserContext";

const AdminComissions = () => {

    const { adminComState, setAdminComState } = useContext(UserContext);
    const [editing, setEditing] = useState(false)

    const changeAdminComState = (type: string, value: string) => {
        setAdminComState((prevState) => {
            return {
                ...prevState,
                [type]: value,
            };
        });
    }

    useEffect(() => {
        setAdminComState({
            compañía: "grupoieb",
            equipo: "",
            vendedor: "manager",
        })
    }, [])

    return (
        <>
            <div className="filterContainer marginYTitle">
                <p className="subtitle marginYBtn">Seleccione un equipo:</p>
                <div className="inputContainer lg flexStart marginYTitle">
                    <label className="label" htmlFor="teamComission">Equipo</label>
                    <select className="input" name="teamComission" id="teamComission">
                        <option value="">Seleccione un equipo</option>
                        <option value="">Tobias Mancini</option>
                    </select>
                </div>

                <p className="subtitle marginYBtn">Si el rol del vendedor fuera:</p>

                <div className="btnsContainer marginYTitle">
                    <button
                        onClick={() => changeAdminComState('vendedor', 'manager')}
                        className={`btn btnWhite marginXBtn ${adminComState.vendedor === "manager" && "active"}`}>
                        Manager
                    </button>
                    <button
                        onClick={() => changeAdminComState('vendedor', 'coordinador')}
                        className={`btn btnWhite marginXBtn ${adminComState.vendedor === "coordinador" && "active"}`}>
                        Coordinador
                    </button>
                    <button
                        onClick={() => changeAdminComState('vendedor', 'asesor')}
                        className={`btn btnWhite marginXBtn ${adminComState.vendedor === "asesor" && "active"}`}>
                        Asesor
                    </button>
                    <button
                        onClick={() => changeAdminComState('vendedor', 'asesorsc')}
                        className={`btn btnWhite marginXBtn ${adminComState.vendedor === "asesorsc" && "active"}`}>
                        Asesor SC
                    </button>
                </div>
            </div>

            <form className="formContainer small marginYRegular">
                <div className="flexRow centerCenter">
                    <div className="inputContainer sm">
                        <label className="label" htmlFor="managerComission">Comisión Manager(%)</label>
                        {
                            editing ?
                                <input className="input sm" type="number" name="managerComission" id="managerComission" placeholder="30" />
                                :
                                <div className="input sm">30</div>
                        }
                    </div>
                </div>

                <div className="flexRow centerCenter">
                    <div className="inputContainer sm">
                        <label className="label" htmlFor="managerComission">Comisión Coordinador(%)</label>
                        {
                            editing ?
                                <input className="input sm" type="number" name="managerComission" id="managerComission" placeholder="10" />
                                :
                                <div className="input sm">10</div>
                        }
                    </div>
                </div>

                <div className="flexRow centerCenter">
                    <div className="inputContainer sm">
                        <label className="label" htmlFor="managerComission">Comisión Asesor(%)</label>
                        {
                            editing ?
                                <input className="input sm" type="number" name="managerComission" id="managerComission" placeholder="10" />
                                :
                                <div className="input sm">10</div>
                        }
                    </div>
                </div>
                <div className="formBtnContainer">
                    {
                        editing ?
                            <button onClick={() => setEditing(false)} type="button" className="btn xl btnDarkGreen">Guardar cambios</button>
                            :
                            <button onClick={() => setEditing(true)} type="button" className="btn xl btnDarkGreen">Editar comisiones</button>
                    }
                </div>
            </form>
        </>
    )
}

export default AdminComissions;