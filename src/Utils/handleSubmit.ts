export const handleSubmit = (
    newItem: any,
) => {

    if (newItem.role !== undefined && newItem.role !== "") {
        console.log(`posteo de ${newItem.role}`);
    } else {
        console.log("no se seleccionó el rol del asesor.");
    }

};