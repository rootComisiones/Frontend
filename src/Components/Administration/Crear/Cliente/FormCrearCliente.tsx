import { useContext, useEffect, useState } from "react";
import FormCrear from "../FormCrear";
import { UserContext } from "../../../../Context/UserContext";
import getAllAsesores from "../../../../DbFunctions/getAllAsesores";
import { ActionFunctionArgs, Form, redirect } from "react-router-dom";
import postClient from "../../../../DbFunctions/postClient";
import { validateFormFields } from "../../../../Utils/handleValidateEmptyForm";


const FormCrearCliente = () => {

    const [numeroCompanias, setNumeroCompanias] = useState(1);
    const [rolAsesor, setRolAsesor] = useState('')
    const { allAsesores } = useContext(UserContext);

    const handleNumeroCompanias = (e: any) => {
        const value = e.target.value;
        setNumeroCompanias(Number(value))
    }

    const handleGetKey = (e: any) => {
        const key = e.target.selectedOptions[0].getAttribute('data-key');
        setRolAsesor(key)
    }

    const handleCompanias = () => {
        let innerHtml = [];
        for (let index = 0; index < numeroCompanias; index++) {
            innerHtml.push(
                <div className="comsContainer" key={index + "handleCompanias"}>
                    <div className="inputContainer">
                        <label className="label" htmlFor={`compania_${index + 1}`}>Compañía {index + 1}</label>
                        <select
                            className="input" name={`compania_${index + 1}`}>
                            <option value="">Seleccione una compañía</option>
                            <option value="1">AR Partners</option>
                            <option value="2">IEB</option>
                            <option value="3">Inviu</option>
                        </select>
                    </div>
                    <div className="inputContainer">
                        <label className="label" htmlFor={`numero_cuenta_${index + 1}`}>Número de cuenta</label>
                        <input
                            className="input" type="text" name={`numero_cuenta_${index + 1}`} id={`numero_cuenta_${index + 1}`} />
                    </div>
                </div>
            );
        }
        return innerHtml;
    };


    return (
        <Form className="formContainer" method="post">
            {/* <FormCrear label="Nombre" name="nombre" type="text" />
            <FormCrear label="Apellido" name="apellido" type="text" /> */}
            {/* <FormCrear label="Tipo de persona" name="tipo_persona" type="text" /> */}
            <div className="inputContainer">
                <label className="label" htmlFor="tipo_persona">Tipo de persona</label>
                <select
                    className="input" name="tipo_persona"
                >
                    <option value="Fisica">Fisica</option>
                    <option value="Juridica">Juridica</option>
                </select>
            </div>
            {/* <FormCrear label="CUIT" name="cuit" type="text" />
            <FormCrear label="Fecha de inicio de actividades" name="fecha_inicio_actividades" type="date" />
            <FormCrear label="Direccion" name="direccion" type="text" />
            <FormCrear label="Código postal" name="codigo_postal" type="text" />
            <FormCrear label="Provincia" name="provincia" type="text" />
            <FormCrear label="Localidad" name="localidad" type="text" />
            <FormCrear label="Teléfono" name="telefono" type="text" />
            <FormCrear label="Email" name="email" type="text" /> */}

            <div className="inputContainer">
                <label className="label" htmlFor="numero_cias">Nº Compañías</label>
                <select
                    className="input" name="numero_cias"
                    onChange={handleNumeroCompanias}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>
            {
                handleCompanias()
            }
            <div className="inputContainer">
                <label className="label" htmlFor={rolAsesor}>Asesor</label>
                <select
                    className="input" name={rolAsesor}
                    onChange={handleGetKey}
                    >
                    <option value="">Selecciona un asesor</option>
                    {
                        allAsesores.length &&
                        allAsesores.map((asesor) => {
                            return <option key={`${asesor.rol}_id`} data-key={`${asesor.rol}_id`} value={asesor.id}>
                                {asesor.username}
                            </option>
                        })
                    }
                </select>
            </div>
            <div className="inputContainer">
                <label className="label" htmlFor="observacion">Observación</label>
                <textarea
                    className="input" name="observacion" id="observation" />
            </div>

            <div className="formBtnContainer">
                <button type="submit" className="btn xl btnDarkGreen">Crear cliente</button>
            </div>
        </Form>
    )
}

export default FormCrearCliente;

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const postData = Array.from(formData.entries());

    const hola = postData.reduce((acc, [fieldName, value]) => {
        let newValue;

        if (fieldName === "asesor_id" || fieldName === "coordinador_id" || fieldName === "manager_id") {
            console.log(fieldName, value);

            if (value === "") {
                console.error("falta que selecciones un asesor")
            } else {
                newValue = Number(value)
            }
        } else if ( fieldName.includes("numero_cuenta")) {
            newValue = Number(value)
         }
        else {
            newValue = value;
        }

        acc[fieldName] = newValue;
        return acc;
    }, {} as any);

    console.log("hola", hola);
    // validateFormFields(hola)
    postClient(hola)

    return null;
};




