import { useContext, useEffect, useState } from "react";
import FormCrear from "../FormCrear";
import { UserContext } from "../../../../Context/UserContext";
import getAllAsesores from "../../../../DbFunctions/getAllAsesores";
import { validateFormFields } from "../../../../Utils/handleValidateEmptyForm";
import postClient from "../../../../DbFunctions/postClient";
import editCliente from "../../../../DbFunctions/editCliente";

const FormCrearCliente = () => {

    const [numeroCompanias, setNumeroCompanias] = useState(1);
    const [rolAsesor, setRolAsesor] = useState('');
    const { allAsesores, edicion, setLoaderOn } = useContext(UserContext);

    const handleNumeroCompanias = (e: any) => {
        const value = e.target.value;
        setNumeroCompanias(Number(value));
    }

    const handleGetKey = (e: any) => {
        const key = e.target.selectedOptions[0].getAttribute('data-key');
        setRolAsesor(key);
    }

    const handleCompanias = () => {
        let innerHtml = [];
        for (let index = 0; index < numeroCompanias; index++) {
            innerHtml.push(
                <div className="comsContainer" key={index + "handleCompanias"}>
                    <div className="inputContainer">
                        <label className="label" htmlFor={`compania_${index + 1}`}>Compañía {index + 1}</label>
                        <select className="input" name={`compania_${index + 1}`}
                            defaultValue={edicion !== null ? edicion.compania_id : ''}
                        >
                            <option value="">Seleccione una compañía</option>
                            <option value="1">Grupo IEB</option>
                            <option value="2">Inviu</option>
                        </select>
                    </div>
                    <div className="inputContainer">
                        <label className="label" htmlFor={`numero_cuenta_${index + 1}`}>Número de cuenta</label>
                        <input className="input" type="text" name={`numero_cuenta_${index + 1}`} id={`numero_cuenta_${index + 1}`}
                            defaultValue={edicion !== null ? edicion[`numero_cuenta`] : ''}
                        />
                    </div>
                </div>
            );
        }
        return innerHtml;
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoaderOn(true);

        const formData = new FormData(e.currentTarget);
        const postData = Array.from(formData.entries());

        const formObject = postData.reduce((acc, [fieldName, value]) => {
            let newValue;

            if (fieldName === "asesor_id" || fieldName === "coordinador_id" || fieldName === "manager_id") {
                newValue = value === "" ? null : Number(value);
            } else if (fieldName.includes("numero_cuenta")) {
                newValue = Number(value);
            } else {
                newValue = value;
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
                await editCliente(formObject, edicion.id)
            } else {
                await postClient(formObject);
            }
        }

        setLoaderOn(false);
    };

    return (
        <form className="formContainer" onSubmit={handleFormSubmit}>
            <FormCrear label="Nombre" name="nombre" type="text" value={edicion !== null ? edicion : ''} />
            <FormCrear label="Apellido" name="apellido" type="text" value={edicion !== null ? edicion : ''} />

            <div className="inputContainer">
                <label className="label" htmlFor="tipo_persona">Tipo de persona</label>
                <select className="input" name="tipo_persona">
                    <option value="Fisica">Fisica</option>
                    <option value="Juridica">Juridica</option>
                </select>
            </div>

            <FormCrear label="CUIT" name="cuit" type="text" value={edicion !== null ? edicion : ''} />
            <FormCrear label="Fecha de inicio de actividades" name="fecha_inicio_actividades" type="date" value={edicion !== null ? edicion : ''} />
            <FormCrear label="Dirección" name="direccion" type="text" value={edicion !== null ? edicion : ''} />
            <FormCrear label="Código postal" name="codigo_postal" type="text" value={edicion !== null ? edicion : ''} />
            <FormCrear label="Provincia" name="provincia" type="text" value={edicion !== null ? edicion : ''} />
            <FormCrear label="Localidad" name="localidad" type="text" value={edicion !== null ? edicion : ''} />
            <FormCrear label="Teléfono" name="telefono" type="text" value={edicion !== null ? edicion : ''} />
            <FormCrear label="Email" name="email" type="text" value={edicion !== null ? edicion : ''} />

            {
                edicion === null &&
                <div className="inputContainer">
                    <label className="label" htmlFor="numero_cias">Nº Compañías</label>
                    <select className="input" name="numero_cias" onChange={handleNumeroCompanias}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
            }

            {handleCompanias()}

            {
                edicion === null &&
                <div className="inputContainer">
                    <label className="label" htmlFor={rolAsesor}>Asesor</label>
                    <select className="input" name={rolAsesor} onChange={handleGetKey}>
                        <option value="">Selecciona un asesor</option>
                        {allAsesores.length && allAsesores.map((asesor) => (
                            <option key={`${asesor.rol}_id`} data-key={`${asesor.rol}_id`} value={asesor.id}>
                                {asesor.username}
                            </option>
                        ))}
                    </select>
                </div>
            }

            <div className="inputContainer">
                <label className="label" htmlFor="observacion">Observación</label>
                <textarea className="input" name="observacion" id="observacion" />
            </div>

            <div className="formBtnContainer">
                <button type="submit" className="btn xl btnDarkGreen">{edicion !== null ? 'Editar cliente' : `Crear cliente`}</button>
            </div>
        </form>
    );
}

export default FormCrearCliente;