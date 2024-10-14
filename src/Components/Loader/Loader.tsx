import { CSSProperties, useContext } from "react"
import ClipLoader from "react-spinners/ClipLoader";
import './Loader.css'
import { UserContext } from "../../Context/UserContext";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#fff",
};
const Loader = () => {

    const { loaderOn } = useContext(UserContext);

    return (
        <>
            {
                loaderOn &&
                <div className="loaderContainer">
                    <ClipLoader
                        loading={true}
                        cssOverride={override}
                        size={70}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            }
        </>
    )
}

export default Loader;