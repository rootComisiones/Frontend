import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useContext, useState } from "react";
import postPeriodo from "../../DbFunctions/postPeriodo";
import { UserContext } from "../../Context/UserContext";

interface ModalNuevoPeriodoProps {
    onVisible: boolean;
    closeModal: () => void;
    companyState: {
        name: string,
        id: number
    }
    newPeriod: any;
    setNewPeriod: any;
}

const ModalNuevoPeriodo:FC<ModalNuevoPeriodoProps> = ({ onVisible, closeModal, companyState, newPeriod, setNewPeriod }) => {

    const [date, setDate] = useState("");
    const { setLoaderOn } = useContext(UserContext);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoaderOn(true)
        await postPeriodo(date, companyState.id)
        setNewPeriod(!newPeriod)
        setLoaderOn(false)
        closeModal()
    };

    return(
        <>
            {
                onVisible &&
                <div className='loginModalOverlay'>
                    <div className='loginModalContainer'>
                        <FontAwesomeIcon icon={faXmark} className='exitIcon' onClick={closeModal} />

                        <form className='loginForm' onSubmit={handleSubmit}>
                            <div className="inputContainer">
                                <label className="label" htmlFor="date">Fecha</label>
                                <input className="input" type="month" name="date" id="date" onChange={handleDateChange} required/>
                            </div>

                            <div className='logRegisterBtns'>
                                <button className='btn btnDarkGreen marginXSmall' type='submit'>Crear Período</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default ModalNuevoPeriodo;