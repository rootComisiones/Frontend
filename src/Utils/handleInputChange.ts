import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { AsesorData, ClientData } from "../Types/Types";

type Data = ClientData | AsesorData;

export const handleInputChange = <T extends Data>(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    setNewItem: Dispatch<SetStateAction<T>>,
    newItem: T
) => {
    const { name, value } = event.target;
    console.log(name, value);
    
    let newValue;
    let comisiones = ["v_manager_manager", "v_manager_coordinador", "v_manager_asesor", "v_coordinador_manager", "v_coordinador_coordinador", "v_coordinador_asesor",
     "v_asesor_manager", "v_asesor_coordinador", "v_asesor_asesor", "v_asesor_sc_manager", "v_asesor_sc_coordinador", "v_asesor_sc_asesor"]

    let ids = ["manager_id", "coordinador_id"]

    if (name === "inscripto_iva" && value === "true") {
        newValue = true;
        setNewItem({ ...newItem, [name]: newValue });
    } else if (name === "inscripto_iva" && value === "false") {
        newValue = false;
        setNewItem({ ...newItem, [name]: newValue });
    } else {
        setNewItem({ ...newItem, [name]: value });
    }

    if (ids.includes(name) || comisiones.includes(name)) {
        newValue = Number(value);
        setNewItem({ ...newItem, [name]: newValue });
    }
};