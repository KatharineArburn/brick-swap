import { useParams } from "react-router-dom";
import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLegoDetails } from "../../store/lego";
import "./LegoDetails.css"

const LegoDetails = () => {
    const dispatch = useDispatch();
    const { legoId } = useParams();

    const lego = useSelector((state) => {
        console.log("STATE", state.lego)
        return state.lego
    })

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        dispatch(getLegoDetails(legoId))
        .then(() => setIsLoading(true));
    }, [dispatch, legoId])

    if (!isLoading) return <h1>Loading...</h1>

    const {
        name,
        itemNumber,
        pieces,
        ages,
        theme,
        status,
        image,
    } = lego

    const {
        firstName,
        lastName
    } = lego.User

    return (
        <section className="page">
            <h2>{name}</h2>
        </section>
    )
}

export default LegoDetails
