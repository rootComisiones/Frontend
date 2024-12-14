import React, { FC, useContext, useEffect, useState } from "react";
import { Coordinador, FormCrearAsesorProps } from "../../../../Types/Types";
import { handleSubmit } from "../../../../Utils/handleSubmit";
import { handleInputChange } from "../../../../Utils/handleInputChange";
import '../../Administration.css'
import getCoordinadores from "../../../../DbFunctions/getCoordinadores";
import { UserContext } from "../../../../Context/UserContext";
import FormCrear from "../FormCrear";
import postAsesor from "../../../../DbFunctions/postAsesor";
import { validateFormFields } from "../../../../Utils/handleValidateEmptyForm";
import editAsesor from "../../../../DbFunctions/editAsesor";

interface Company {
    name: String;
    number: String;
}

const FormCrearAsesor = () => {
    const { allTeams, setLoaderOn, edicion } = useContext(UserContext);
    const [selectedAsesor, setSelectedAsesor] = useState({
        role: "",
        manager_id: 0,
    });

    const [selectedCompanies, setSelectedCompanies] = useState<Company[]>([]);

    const [coordinadores, setCoordinadores] = useState<Coordinador[]>([]);

    const handleSelectedCompanies = (e: any) => {
        const value = e.target.value;
        const number = value === "AR Partners" ? "1" : value === "Inviu" ? "2" : "3";
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
    };

    const handleGetCoordinadores = async (manager_id: string) => {
        setLoaderOn(true);
        const equipo = await getCoordinadores(Number(manager_id));
        setCoordinadores(equipo.coordinadores);
        setLoaderOn(false);
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoaderOn(true)

        const formData = new FormData(e.currentTarget);
        const postData = Array.from(formData.entries());

        const formObject = postData.reduce((acc, [fieldName, value]) => {
            let newValue;
            const comisiones = ["comisionEmpresa1", "comisionEmpresa2", "comisionEmpresa3", "comisionManager1", "comisionManager2", "comisionManager3", "comisionCoordinador1", "comisionCoordinador2", "comisionCoordinador3"];
            const ids = ["manager_id", "coordinador_id"];

            if (fieldName === "inscripto_iva" && value === "true") {
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

        const errores = validateFormFields(formObject);

        if (errores.length) {
            console.error('Faltan completar los siguientes campos: ' + errores.toString());
        } else {
            console.log(formObject);
            if (edicion !== null) {
                await editAsesor(formObject, edicion.id)
            } else {
                await postAsesor(formObject, formObject.role);
            }
        }

        setLoaderOn(false)
    };

    useEffect(() => {
        let companias = [];


        edicion !== null && edicion?.comisionEmpresa2 !== null && companias.push({ name: 'Inviu', number: '1' })
        edicion !== null && edicion?.comisionEmpresa3 !== null && companias.push({ name: 'Grupo IEB', number: '2' })

        console.log("compamoas:", companias);
        console.log("edicion:", edicion);


        setSelectedCompanies(companias)
    }, [])

    return (
        <form className="formContainer" onSubmit={handleFormSubmit}>
            <FormCrear label="Username" name="username" type="text" value={edicion !== null ? edicion : ''} />
            <FormCrear label="Apellido" name="apellido" type="text" value={edicion !== null ? edicion : ''} />
            <FormCrear label="Nombre" name="nombre" type="text" value={edicion !== null ? edicion : ''} />
            {
                edicion === null &&
                <>
                    <FormCrear label="Fecha de nacimiento" name="fecha_nacimiento" type="date" value={edicion !== null ? edicion : ''} />
                    <FormCrear label="Fecha de ingreso" name="fecha_ingreso" type="date" value={edicion !== null ? edicion : ''} />
                </>
            }

            <div className="inputContainer">
                <label className="label" htmlFor="inscripto_iva">Inscripto/IVA</label>
                <select name="inscripto_iva" className="input" defaultValue={edicion !== null ? edicion.inscripto_iva || '' : ''}>
                    <option value="false">No</option>
                    <option value="true">Sí</option>
                </select>
            </div>

            <FormCrear label="CUIT" name="cuit" type="text" value={edicion !== null ? edicion : ''} />
            <FormCrear label="Email" name="email" type="text" value={edicion !== null ? edicion : ''} />

            <div className="inputContainer">
                <label className="label" htmlFor="interno_externo">Interno/Externo</label>
                <select className="input" name="interno_externo" defaultValue={edicion !== null ? edicion.interno_externo || '' : ''}>
                    <option value="interno">Interno</option>
                    <option value="externo">Externo</option>
                </select>
            </div>

            {
                edicion === null &&
                <FormCrear label="Contraseña" name="contrasena" type="text" value={edicion !== null ? edicion : ''} />
            }

            <div className="inputContainer">
                <label className="label" htmlFor="role">Rol</label>
                <select onChange={handleRole} className="input" name="role" defaultValue={edicion !== null ? edicion.rol || '' : ''}>
                    <option value="">Seleccione un rol</option>
                    <option value="asesor">Asesor</option>
                    <option value="coordinador">Coordinador</option>
                    <option value="manager">Manager</option>
                </select>
            </div>

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

            <div className="comsContainer marginYRegular">
                <div className="inputContainer">
                    <label className="label" htmlFor="checkIeb">Grupo IEB</label>
                    <input onChange={handleSelectedCompanies} className="checkbox" value={"Grupo IEB"} type="checkbox" name="checkIeb"
                        defaultChecked={edicion === null ? false : edicion?.comisionEmpresa1 !== null ? true : false}
                    />
                </div>
                <div className="inputContainer">
                    <label className="label" htmlFor="checkInviu">Inviu</label>
                    <input onChange={handleSelectedCompanies} className="checkbox" value={"Inviu"} type="checkbox" name="checkInviu"
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

            <div className="formBtnContainer">
                <button type="submit" className="btn xl btnDarkGreen">{edicion !== null ? 'Editar asesor' : `Crear asesor`}</button>
            </div>
        </form>
    );
};

export default FormCrearAsesor;
