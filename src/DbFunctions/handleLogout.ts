const handleLogout = (setUserData: any) => {
    setUserData({
        nombre: '',
        apellido: '',
        username: '',
        email: '',
        id: '',
        role: ''
      });
};

export default handleLogout;