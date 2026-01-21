interface FormFields {
  [key: string]: string | number | null | undefined;
}


export const validateFormFields = (fields: FormFields, type: string) => {
  let errores = [];
  let noComisiones = true;

  for (const [key, value] of Object.entries(fields)) {
    // Validar si el campo está vacío
    if (value === '' || value === null || value === undefined) {
      if (!key.includes('perfil_riesgo')) {
        errores.push(key)
        console.log(`Error: El campo '${key}' no puede estar vacío.`);
      }
    }

    // Validar si las claves que terminan en "_id" no tienen valor 0
    if (key.endsWith('_id') && value === 0) {
      // Para el rol 'asesor', solo sagencia_id es obligatorio
      if (type === 'asesor') {
        if (key === 'sagencia_id') {
          errores.push(key);
          console.log(`Error: El campo '${key}' debe tener un valor distinto de 0 para el rol asesor.`);
        }
        // manager_id y coordinador_id pueden ser 0 para asesores, así que los saltamos
      } else {
        errores.push(key);
        console.log(`Error: El campo '${key}' debe tener un valor distinto de 0.`);
      }
    }


    if (key === 'comisionEmpresa1' || key === 'comisionEmpresa2' || key === 'porcentaje_neto') {
      noComisiones = false;
    }
  }

  if (type === 'asesor') {
    noComisiones && errores.push('noComisiones')
  }

  // No filtrar coordinador_id para asesor, ya que no se agrega como error
  let finalErrores = errores.filter(error => error !== 'observacion');
  console.log(finalErrores);

  return finalErrores;
}