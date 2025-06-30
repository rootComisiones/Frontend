import React, { FC, useContext, useEffect, useState } from "react";
import { Coordinador } from "../../../../Types/Types";
import '../../Administration.css'
import getCoordinadores from "../../../../DbFunctions/getCoordinadores";
import { UserContext } from "../../../../Context/UserContext";
import FormCrear from "../FormCrear";
import postAsesor from "../../../../DbFunctions/postAsesor";
import { validateFormFields } from "../../../../Utils/handleValidateEmptyForm";
import editAsesor from "../../../../DbFunctions/editAsesor";
import { useNavigate } from "react-router-dom";
import getAllAsesores from "../../../../DbFunctions/getAllAsesores";
import getTeams from "../../../../DbFunctions/getTeams";
import getAllSagencias from "../../../../DbFunctions/getAllSagencias";
import { useNotification } from "../../../../Context/NotificationContext";

interface Company {
    name: String;
    number: String;
}

const FormCrearAsesor = () => {
    const { allTeams, setLoaderOn, edicion, setAllTeams, setAllAsesores, allSagencias, setAllSagencias } = useContext(UserContext);
    const [selectedAsesor, setSelectedAsesor] = useState({
        role: "",
        manager_id: 0,
    });

    const { showNotification } = useNotification();

    const [selectedCompanies, setSelectedCompanies] = useState<Company[]>([]);

    const [coordinadores, setCoordinadores] = useState<Coordinador[]>([]);

    const navigate = useNavigate();

    const handleGetData = async () => {
        setLoaderOn(true);
        await getAllAsesores(setAllAsesores, showNotification)
        await getTeams(setAllTeams, showNotification)
        const sagencias = await getAllSagencias(showNotification)
        setAllSagencias(sagencias)
        setLoaderOn(false)
    }

    const handleSelectedCompanies = (value: any) => {
        const number = value === "Grupo IEB" ? "2" : "1";
        let companies = selectedCompanies;

        if (!companies.some(company => company.name === value)) {
            setSelectedCompanies([...companies, { name: value, number }]);
        } else {
            setSelectedCompanies(companies.filter(company => company.name !== value));
        }
    };

    const handleRole = (e: any) => {
        let newAsesor = { ...selectedAsesor };
        const newRole = e.target.value;
        newAsesor.role = newRole;
        setSelectedAsesor(newAsesor);
    };

    const renderComisiones = (company: Company) => {
        if (edicion === null) {
            return (
                <>
                    <p>Comisiones para {company.name}</p>
                    <div className="comsContainer">
                        {selectedAsesor.role === "coordinador" ? (
                            <>
                                <FormCrear label="Comisión Manager(%)" name={`comisionManager${company.number}`} type="number" value={edicion !== null ? edicion : ''} />
                                <FormCrear label="Comisión Coordinador(%)" name={`comisionEmpresa${company.number}`} type="number" value={edicion !== null ? edicion : ''} />
                            </>
                        ) : selectedAsesor.role === "manager" ? (
                            <FormCrear label="Comisión Manager(%)" name={`comisionEmpresa${company.number}`} type="number" value={edicion !== null ? edicion : ''} />
                        ) : (
                            <>
                                <FormCrear label="Comisión Manager(%)" name={`comisionManager${company.number}`} type="number" value={edicion !== null ? edicion : ''} />
                                <FormCrear label="Comisión Coordinador(%)" name={`comisionCoordinador${company.number}`} type="number" value={edicion !== null ? edicion : ''} />
                                <FormCrear label="Comisión Asesor(%)" name={`comisionEmpresa${company.number}`} type="number" value={edicion !== null ? edicion : ''} />
                            </>
                        )}
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <p>Comisiones para {company.name}</p>
                    <div className="comsContainer">
                        {edicion.rol === "coordinador" ? (
                            <>
                                <FormCrear label="Comisión Manager(%)" name={`comisionManager${company.number}`} type="number" value={edicion !== null ? edicion : ''} />
                                <FormCrear label="Comisión Coordinador(%)" name={`comisionEmpresa${company.number}`} type="number" value={edicion !== null ? edicion : ''} />
                            </>
                        ) : edicion.rol === "manager" ? (
                            <FormCrear label="Comisión Manager(%)" name={`comisionEmpresa${company.number}`} type="number" value={edicion !== null ? edicion : ''} />
                        ) : (
                            <>
                                <FormCrear label="Comisión Manager(%)" name={`comisionManager${company.number}`} type="number" value={edicion !== null ? edicion : ''} />
                                <FormCrear label="Comisión Coordinador(%)" name={`comisionCoordinador${company.number}`} type="number" value={edicion !== null ? edicion : ''} />
                                <FormCrear label="Comisión Asesor(%)" name={`comisionEmpresa${company.number}`} type="number" value={edicion !== null ? edicion : ''} />
                            </>
                        )}
                    </div>
                </>
            );
        }
    };

    const handleGetCoordinadores = async (manager_id: string) => {
        setLoaderOn(true);
        const equipo = await getCoordinadores(Number(manager_id), showNotification);
        console.log(equipo, 'equipitooo');
        equipo !== null ? setCoordinadores(equipo.coordinadores) : setCoordinadores([]);
        setLoaderOn(false);
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoaderOn(true)

        const formData = new FormData(e.currentTarget);
        const postData = Array.from(formData.entries());

        const formObject = postData.reduce((acc, [fieldName, value]) => {
            let newValue;
            const comisiones = ["comisionEmpresa1", "comisionEmpresa2", "comisionManager1", "comisionManager2", "comisionCoordinador1", "comisionCoordinador2", "porcentaje_neto"];
            const ids = ["manager_id", "coordinador_id"];

            if (fieldName === "a_cargo_mono") {
                newValue = value === "true" ? true : false;
            } else if (fieldName === "inscripto_iva" && value === "true") {
                newValue = true;
            } else if (fieldName === "inscripto_iva" && value === "false") {
                newValue = false;
            } else {
                newValue = value;
            }

            if (ids.includes(fieldName) || comisiones.includes(fieldName)) {
                newValue = Number(value);
            }

            acc[fieldName] = newValue;
            return acc;
        }, {} as any);

        console.log('formObject', formObject);

        const errores = validateFormFields(formObject, 'asesor');

        if (errores.length) {
            console.error('Faltan completar los siguientes campos: ' + errores.toString());
        } else {
            console.log(formObject);
            if (edicion !== null) {
                let veredicto;
                if (edicion.rol !== undefined) {
                    console.log('ASESOR COMISIONES', formObject);
                    const { comisionEmpresa1, comisionEmpresa2 } = formObject;

                    const formAsesor = formObject;

                    if (comisionEmpresa1 === undefined) {

                        formAsesor.comisionEmpresa1 = null;
                    }
                    if (comisionEmpresa2 === undefined) {

                        formAsesor.comisionEmpresa2 = null;
                    }

                    veredicto = await editAsesor(formAsesor, edicion.id, edicion.rol, showNotification)
                } else {
                    veredicto = await editAsesor(formObject, edicion.id, 'sagencia', showNotification)
                }

                if (veredicto) {
                    handleGetData()
                    navigate('/administracion')
                }
            } else {
                const veredicto = await postAsesor(formObject, formObject.role, showNotification);
                if (veredicto) {
                    handleGetData()
                    navigate('/administracion')
                }
            }
        }

        setLoaderOn(false)
    };

    useEffect(() => {
        let companias = [];
        if (edicion !== null) {
            edicion?.rol === undefined && setSelectedAsesor({
                manager_id: 0,
                role: 'sagencia'
            })
        }


        edicion !== null && edicion?.comisionEmpresa1 !== null && companias.push({ name: 'Grupo IEB', number: '2' })
        edicion !== null && edicion?.comisionEmpresa2 !== null && companias.push({ name: 'Inviu', number: '1' })

        console.log("compamoas:", companias);
        console.log("edicion:", edicion);


        setSelectedCompanies(companias)
    }, [])

    return (
        <form className="formContainer" onSubmit={handleFormSubmit}>
            {
                (edicion !== null && selectedAsesor.role !== 'sagencia') &&
                <>
                    <div className="inputContainer">
                        <label className="label" htmlFor="role">Rol</label>
                        <select onChange={handleRole} className="input" name="role" defaultValue={edicion !== null ? edicion.rol || '' : ''}>
                            <option value="">Seleccione un rol</option>
                            <option value="asesor">Asesor</option>
                            <option value="coordinador">Coordinador</option>
                            <option value="manager">Manager</option>
                            <option value="sagencia">Sub Agencia</option>
                        </select>
                    </div>
                </>
            }

            {
                edicion === null &&
                <>
                    <div className="inputContainer">
                        <label className="label" htmlFor="role">Rol</label>
                        <select onChange={handleRole} className="input" name="role" defaultValue={edicion !== null ? edicion.rol || '' : ''}>
                            <option value="">Seleccione un rol</option>
                            <option value="asesor">Asesor</option>
                            <option value="coordinador">Coordinador</option>
                            <option value="manager">Manager</option>
                            <option value="sagencia">Sub Agencia</option>
                        </select>
                    </div>
                </>
            }

            {
                selectedAsesor.role !== 'sagencia' &&
                <div className="inputContainer">
                    <label className="label" htmlFor="sagencia_id">Sub Agencia</label>
                    <select className="input" name="sagencia_id" defaultValue={edicion !== null ? edicion.sagencia_id || '' : ''}>
                        <option value="0">Seleccione una Sub Agencia</option>
                        {allSagencias.map((sagencia) => (
                            <option key={sagencia.username} value={sagencia.id}>
                                {sagencia.nombre_agencia}
                            </option>
                        ))}
                    </select>
                </div>
            }

            {selectedAsesor.role === "coordinador" ? (
                <div className="inputContainer">
                    <label className="label" htmlFor="manager_id">Equipo</label>
                    <select className="input" name="manager_id" defaultValue={edicion !== null ? edicion.manager_id || '' : ''}>
                        <option value="0">Seleccione un equipo</option>
                        {allTeams.map((equipo) => (
                            <option key={equipo.username} value={equipo.id}>
                                {equipo.username}
                            </option>
                        ))}
                    </select>
                </div>
            ) : selectedAsesor.role === "asesor" ? (
                <>
                    <div className="inputContainer">
                        <label className="label" htmlFor="manager_id">Equipo</label>
                        <select className="input" name="manager_id" onChange={(e) => handleGetCoordinadores(e.target.value)} defaultValue={edicion !== null ? edicion.manager_id || '' : ''} >
                            <option value="0">Seleccione un equipo</option>
                            {allTeams.map((equipo) => (
                                <option key={equipo.username} value={equipo.id}>
                                    {equipo.username}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="inputContainer">
                        <label className="label" htmlFor="coordinador_id">Coordinador</label>
                        <select className="input" name="coordinador_id" defaultValue={edicion !== null ? edicion.coordinador_id || '' : ''}>
                            <option value="0">Seleccione un coordinador</option>
                            {coordinadores.map((coordinador) => (
                                <option key={coordinador.username} value={coordinador.id}>
                                    {coordinador.username}
                                </option>
                            ))}
                        </select>
                    </div>
                </>
            ) : null}


            <FormCrear label="Username" name="username" type="text" value={edicion !== null ? edicion : ''} />
            {
                selectedAsesor.role !== 'sagencia' &&
                <FormCrear label="Apellido" name="apellido" type="text" value={edicion !== null ? edicion : ''} />
            }
            <FormCrear label="Nombre" name={selectedAsesor.role !== 'sagencia' ? 'nombre' : 'nombre_agencia'} type="text" value={edicion !== null ? edicion : ''} />
            {
                edicion === null && selectedAsesor.role !== 'sagencia' &&
                <>
                    <FormCrear label="Fecha de nacimiento" name="fecha_nacimiento" type="date" value={edicion !== null ? edicion : ''} />
                    <FormCrear label="Fecha de ingreso" name="fecha_ingreso" type="date" value={edicion !== null ? edicion : ''} />
                </>
            }

            {
                selectedAsesor.role !== 'sagencia' &&
                <>
                    <div className="inputContainer">
                        <label className="label" htmlFor="inscripto_iva">Categoria fiscal</label>
                        <select name="inscripto_iva" className="input" defaultValue={edicion !== null ? edicion.inscripto_iva || '' : ''}>
                            <option value="false">Monotributista</option>
                            <option value="true">Responsable Inscripto</option>
                        </select>
                    </div>

                    <FormCrear label="CUIT" name="cuit" type="text" value={edicion !== null ? edicion : ''} />
                </>
            }
            {
                selectedAsesor.role === 'manager' &&
                <div className="inputContainer">
                    <label className="label" htmlFor="a_cargo_mono">Se hace cargo de sus monotributistas?</label>
                    <select name="a_cargo_mono" className="input" defaultValue={edicion !== null ? edicion.a_cargo_mono || '' : ''}>
                        <option value="false">No</option>
                        <option value="true">Sí</option>
                    </select>
                </div>
            }

            <FormCrear label="Email" name="email" type="text" value={edicion !== null ? edicion : ''} />

            {
                selectedAsesor.role !== 'sagencia' &&
                <div className="inputContainer">
                    <label className="label" htmlFor="interno_externo">Interno/Externo</label>
                    <select className="input" name="interno_externo" defaultValue={edicion !== null ? edicion.interno_externo || '' : ''}>
                        <option value="interno">Interno</option>
                        <option value="externo">Externo</option>
                    </select>
                </div>
            }

            {
                edicion === null &&
                <FormCrear label="Contraseña" name="contrasena" type="text" value={edicion !== null ? edicion : ''} />
            }

            {
                selectedAsesor.role !== 'sagencia' &&
                <>
                    <div className="comsContainer marginYRegular">
                        <div className="inputContainer">
                            <label className="label" htmlFor="checkIeb">Grupo IEB</label>
                            <input onChange={(e) => handleSelectedCompanies(e.target.value)} className="checkbox" value={"Grupo IEB"} type="checkbox" name="checkIeb"
                                defaultChecked={edicion === null ? false : edicion?.comisionEmpresa1 !== null ? true : false}
                            />
                        </div>
                        <div className="inputContainer">
                            <label className="label" htmlFor="checkInviu">Inviu</label>
                            <input onChange={(e) => handleSelectedCompanies(e.target.value)} className="checkbox" value={"Inviu"} type="checkbox" name="checkInviu"
                                defaultChecked={edicion === null ? false : edicion?.comisionEmpresa2 !== null ? true : false}
                            />
                        </div>
                    </div>
                    {

                        <>
                            {
                                selectedCompanies.length > 0 ? (
                                    selectedCompanies.map((company: any) => (
                                        <div key={company.name} className="manComContainer marginYRegular">
                                            {renderComisiones(company)}
                                        </div>
                                    ))
                                ) : null
                            }
                        </>
                    }
                </>
            }

            {
                selectedAsesor.role === 'sagencia' &&
                <FormCrear label="Comision Sub Agencia(%)" name="porcentaje_neto" type="number" value={edicion !== null ? edicion : ''} />
            }

            <div className="formBtnContainer">
                <button type="submit" className="btn xl btnDarkGreen">{edicion !== null ? 'Editar usuario' : `Crear usuario`}</button>
            </div>
        </form>
    );
};

export default FormCrearAsesor;
