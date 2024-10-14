import { FormEvent } from "react";
import { AsesorData, ClientData } from "../Types/Types";
import postClient from "../DbFunctions/postClient";
import postAsesor from "../DbFunctions/postAsesor";

export const handleSubmit = (
    newItem: any,
) => {

    if (newItem.role !== undefined && newItem.role !== "") {
        console.log(`posteo de ${newItem.role}`);
    } else {
        console.log("no se seleccionó el rol del asesor.");
    }

};