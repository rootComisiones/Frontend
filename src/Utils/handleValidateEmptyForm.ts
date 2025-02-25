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
      errores.push(key)
      console.log(`Error: El campo '${key}' debe tener un valor distinto de 0.`);
    }


    if (key === 'comisionEmpresa1' || key === 'comisionEmpresa2') {
      noComisiones = false;
    }
  }

  console.log(noComisiones);
  if (type === 'asesor') {
    noComisiones && errores.push('noComisiones')
  }


  let finalErrores = errores.filter(error => error !== 'observacion' && error !== 'coordinador_id');
  console.log(finalErrores);

  return finalErrores;
}