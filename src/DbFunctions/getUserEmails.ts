export const getUsersEmails = (usuarios: any[], periodo: any) => {
    const emails: any[] = [];

    usuarios.forEach(usuario => {
        if (usuario.manager?.email) {
            emails.push({
                rol: 'manager',
                id: usuario.manager.id
            });
        }
        if (usuario.coordinador?.email) {
            emails.push({
                rol: 'coordinador',
                id: usuario.coordinador.id
            });
        }
        if (usuario.asesor?.email) {
            emails.push({
                rol: 'asesor',
                id: usuario.asesor.id
            });
        }
    });

    return {
        "users": emails,
        "periodo": periodo
      }
}