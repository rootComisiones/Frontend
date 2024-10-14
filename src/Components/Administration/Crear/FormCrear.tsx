import { FC } from "react";
import '../../../Styles/Reutilized.css';
// import { handleInputChange } from "../../../Utils/handleInputChange";
import { FormCrearProps } from "../../../Types/Types";

const FormCrear: FC<FormCrearProps> = ({ label, type, name, value }) => {

    return (
        <div className="inputContainer">
            <label className="label" htmlFor={name}>{label}</label>
            <input
                className="input"
                type={type}
                name={name}
                id={name}
                defaultValue={value !== null ? value[name] : ''}
            />
        </div>
    );
};

export default FormCrear;
