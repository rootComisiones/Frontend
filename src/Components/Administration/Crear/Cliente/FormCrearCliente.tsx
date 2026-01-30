import { useContext, useEffect, useState } from "react";
import FormCrear from "../FormCrear";
import { UserContext } from "../../../../Context/UserContext";
import { validateFormFields } from "../../../../Utils/handleValidateEmptyForm";
import postClient from "../../../../DbFunctions/postClient";
import editCliente from "../../../../DbFunctions/editCliente";
import { useNavigate } from "react-router-dom";
import getAllClientes from "../../../../DbFunctions/getAllClientes";
import { useNotification } from "../../../../Context/NotificationContext";

const FormCrearCliente = () => {

    const [numeroCompanias, setNumeroCompanias] = useState(1);
    const [rolAsesor, setRolAsesor] = useState('');
    const { allAsesores, edicion, setLoaderOn, setAllClientes } = useContext(UserContext);
    const { showNotification } = useNotification();

    const navigate = useNavigate();

    const handleGetData = async () => {
        setLoaderOn(true);
        const response = await getAllClientes(1, 50, showNotification);
        setAllClientes(response?.clients || []);
        setLoaderOn(false);
    }

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
                            <option value="2">Grupo IEB</option>
                            <option value="1">Inviu</option>
                        </select>
                    </div>
                    <div className="inputContainer">
                        <label className="label" htmlFor={`numero_cuenta_${index + 1}`}>Número de cuenta (Compañía {index + 1})</label>
                        <input className="input" type="text" name={`numero_cuenta_${index + 1}`} id={`numero_cuenta_${index + 1}`}
                            defaultValue={edicion !== null ? edicion[`numero_cuenta`] : ''}
                        />
                    </div>
                    <div className="inputContainer">
                        <label className="label" htmlFor={`repheral_${index + 1}`}>Es Referral? (Compañía {index + 1})</label>
                        <select className="input" name={`repheral_${index + 1}`}>
                            <option value="no">No</option>
                            <option value="si">Si</option>
                        </select>
                    </div>
                    <div className="inputContainer">
                        <label className="label" htmlFor={`perfil_riesgo_${index + 1}`}>Perfil de Riesgo (Compañía {index + 1}) </label>
                        <select className="input" name={`perfil_riesgo_${index + 1}`}>
                            <option value="">Seleccione un perfil de riesgo</option>
                            <option value="conservador">Conservador</option>
                            <option value="moderado">Moderado</option>
                            <option value="de riesgo">De Riesgo</option>
                        </select>
                    </div>
                    <div className="inputContainer">
                        <label className="label" htmlFor={`presentador_${index + 1}`}>Es Presentador? (Compañía {index + 1}) </label>
                        <select className="input" name={`presentador_${index + 1}`}>
                            <option value="">No</option>
                            <option value="presentador_dk">Presentador DK</option>
                            <option value="presentador_pd">Presentador PD</option>
                        </select>
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

            if (fieldName.includes('presentador')) {
                let compania_id = fieldName.split('_')[1];
                let presentadorDK = `presentador_dk_${compania_id}`;
                let presentadorPD = `presentador_pd_${compania_id}`;

                if (value === 'presentador_dk') {
                    acc[presentadorDK] = true;
                    acc[presentadorPD] = false;
                } else if (value === 'presentador_pd') {
                    acc[presentadorDK] = false;
                    acc[presentadorPD] = true;
                }else {
                    acc[presentadorDK] = false;
                    acc[presentadorPD] = false;
                }

                return acc;

            } else if (fieldName.includes('perfil_riesgo')) {
                newValue = value === '' ? null : value;
            } else if (fieldName.includes('repheral')) {
                newValue = value == 'si' ? true : false;
            } else if (["asesor_", "coordinador_", "manager_"].some(prefix => fieldName.includes(prefix))) {
                newValue = value === "" ? null : Number(value);
                if (fieldName.startsWith("asesor_")) {
                    fieldName = "asesor_id";
                } else if (fieldName.startsWith("coordinador_")) {
                    fieldName = "coordinador_id";
                } else if (fieldName.startsWith("manager_")) {
                    fieldName = "manager_id";
                }
            } else if (fieldName.includes("numero_cuenta")) {
                newValue = Number(value);
            } else if (fieldName.startsWith("tipo_persona")) {
                newValue = value === 'Juridica' ? true : false;
            } else {
                newValue = value;
            }

            acc[fieldName] = newValue;
            return acc;
        }, {} as any);

        // Cuando es edición, transformar campos con sufijo _1 a sin sufijo
        let finalFormObject = formObject;
        if (edicion !== null) {
            const suffixMap: Record<string, string> = {
                'compania_1': 'compania',
                'numero_cuenta_1': 'numero_cuenta',
                'perfil_riesgo_1': 'perfil_riesgo',
                'presentador_dk_1': 'presentador_dk',
                'presentador_pd_1': 'presentador_pd',
                'repheral_1': 'repheral',
            };

            finalFormObject = Object.entries(formObject).reduce((acc, [key, value]) => {
                const newKey = suffixMap[key] || key;
                acc[newKey] = value;
                return acc;
            }, {} as any);
        }

        const errores = validateFormFields(finalFormObject, 'cliente');

        if (errores.length) {
            showNotification('Faltan completar los siguientes campos: ' + errores.toString());
        } else {
            if (edicion !== null) {
                const veredicto = await editCliente(finalFormObject, edicion.id, showNotification)
                if (veredicto) {
                    handleGetData()
                    navigate('/administracion')
                } else {
                    showNotification('Hubo un error al editar el cliente!')
                }
            } else {
                const veredicto = await postClient(finalFormObject, showNotification);
                if (veredicto) {
                    handleGetData()
                    navigate('/administracion')
                }
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

            {
                edicion === null &&

                <FormCrear label="Fecha de inicio de actividades" name="fecha_inicio_actividades" type="date" value={edicion !== null ? edicion : ''} />
            }

            <FormCrear label="Dirección" name="direccion" type="text" value={edicion !== null ? edicion : ''} />
            <FormCrear label="Código postal" name="codigo_postal" type="text" value={edicion !== null ? edicion : ''} />
            <FormCrear label="Provincia" name="provincia" type="text" value={edicion !== null ? edicion : ''} />
            <FormCrear label="Localidad" name="localidad" type="text" value={edicion !== null ? edicion : ''} />
            <FormCrear label="Teléfono" name="telefono" type="text" value={edicion !== null ? edicion : ''} />
            <FormCrear label="Email" name="email" type="text" value={edicion !== null ? edicion : ''} />

            <div className="inputContainer">
                <label className="label" htmlFor="numero_cias">Nº Compañías</label>
                <select className="input" name="numero_cias" onChange={handleNumeroCompanias}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </div>

            {handleCompanias()}

            {
                edicion === null &&
                <div className="inputContainer">
                    <label className="label" htmlFor={rolAsesor}>Asesor</label>
                    <select className="input" name={rolAsesor} onChange={handleGetKey}>
                        <option value="">Selecciona un asesor</option>
                        {allAsesores.length && allAsesores.map((asesor) => (
                            <option key={`${asesor.rol}_${asesor.id}`} data-key={`${asesor.rol}_id`} value={asesor.id}>
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