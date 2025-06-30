import React, { useContext } from 'react'
import './Popup.css';
import { deleteUser } from '../../DbFunctions/deleteUser';
import { UserContext } from '../../Context/UserContext';
import handleLogout from '../../DbFunctions/handleLogout';
import getAllAsesores from '../../DbFunctions/getAllAsesores';
import getTeams from '../../DbFunctions/getTeams';
import getAllClientes from '../../DbFunctions/getAllClientes';
import { deletePeriodo } from '../../DbFunctions/deletePeriodo';
import getAllPeriodos from '../../DbFunctions/getAllPeriodos';
import getAllSagencias from '../../DbFunctions/getAllSagencias';
import { useNotification } from '../../Context/NotificationContext';


const Popup = () => {
    
    const { popupData, setPopupData, setLoaderOn, setUserData, setAllAsesores, setAllClientes, setAllTeams, periodState, setPeriodos, setAllSagencias} = useContext(UserContext);

    const { showNotification } = useNotification();

    const handleGetClientes = async () => {
        setLoaderOn(true);
        const clientes = await getAllClientes(showNotification);
        if (!clientes) {
            setLoaderOn(false)
            return
        }
        setAllClientes(clientes)
        setLoaderOn(false)
    }

    const handleGetAsesores = async() => {
        setLoaderOn(true);
        await getAllAsesores(setAllAsesores, showNotification);
        await getTeams(setAllTeams, showNotification);
        setLoaderOn(false)
    }

    const handleGetSagencias = async() =>{
        setLoaderOn(true)
        const sagencias = await getAllSagencias(showNotification);
        setAllSagencias(sagencias)
        setLoaderOn(false)
    }

    const handleGetPeriodos = async () => {
        setLoaderOn(true)
        const allPeriodos = await getAllPeriodos(periodState.id, showNotification)
        setPeriodos(allPeriodos)
        setLoaderOn(false)
    }

    const closePopUp = () => {
        setPopupData({
            text: '',
            action: '',
            asesorId: 0
        })
    }

    const popupAction = async () => {
        const action = popupData.action;
        console.log(popupData);

        setLoaderOn(true)
        if (action === 'logout') {
            await handleLogout(setUserData)
        } else if (action === 'cliente') {
            await deleteUser(popupData.asesorId, action, showNotification)
            handleGetClientes()
        } else if(action === 'periodo'){
            await deletePeriodo(popupData.asesorId, showNotification)
            await handleGetPeriodos()
            handleGetAsesores()
        }else if(action === 'sagencia'){
            await deleteUser(popupData.asesorId, action, showNotification)
            handleGetSagencias()
        }else{
            await deleteUser(popupData.asesorId, action, showNotification)
            handleGetAsesores()
        }
        setLoaderOn(false)
        closePopUp()
    }

    return (
        <>
            {
                popupData.text !== '' &&
                <div className='loginModalOverlay'>
                    <div className='loginModalContainer'>
                        <p className='label popup'>{popupData.text}</p>

                        <div className='logRegisterBtns' style={{ 'marginTop': '20px' }}>
                            <button className='btn btnDarkGreen marginXSmall' onClick={popupAction}>Si</button>
                            <button className='btn btnDarkGreen marginXSmall' onClick={closePopUp}>No</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Popup
