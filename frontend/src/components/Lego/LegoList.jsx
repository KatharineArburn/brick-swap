import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getAllLego } from "../../store/lego";
// import { FaStar } from "react-icons/fa"
import "./LegoList.css"

const LegoList = () => {

    const dispatch = useDispatch()
    const lego = useSelector((state) => {
        console.log("STATE", state)
    })
    useEffect(() => {
        dispatch(getAllLego());
    }, [dispatch])


    return (
        <>
            <section className="lego-list">
                {Object.values(lego).map((lego) => (
                    <div className="lego-grid">
                        <li key={lego.id} className="tooltip">
                            <span className="tooltiptext">{lego.name}</span>
                            <Link to={`/lego/${lego.id}`}>
                                <img src={`${lego.image}`} />
                            </Link>
                        </li>
                        <li key={lego.itemNumber}>{lego.itemNumber}</li>
                        <li key={lego.pieces}>{lego.pieces}</li>
                        <li key={lego.ages}>{lego.ages}</li>
                        <li key={lego.theme}>{lego.theme}</li>
                        <li key={lego.status}>{lego.status}</li>
                    </div>
                ))}
            </section>
        </>
    )

}

export default LegoList
