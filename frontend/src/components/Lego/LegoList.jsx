import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getAllLego } from "../../store/lego";
import LegoListSearch from "./SearchBox/LegoListSearch";
import "./LegoList.css"

const LegoList = () => {
    const dispatch = useDispatch()
    const lego = useSelector((state) => {
        return state.lego
    })

    const legoArr = Object.values(lego)
    const [isLoaded, setIsLoaded] = useState(false);
    const [noResultsMessage, setNoResultsMessage] = useState('');
    const [delayedSearchTimeout, setDelayedSearchTimeout] = useState(null);

    useEffect(() => {
        dispatch(getAllLego())
        .then(() => setIsLoaded(true));
    }, [dispatch])

    if (!isLoaded) return <h1>Building...</h1>

    const handleSearchQuery = query => {
        setIsLoaded(false);

        if (delayedSearchTimeout) {
            clearTimeout(delayedSearchTimeout);
        }

        // add delay to prevent response flashing while typing
        const timeoutId = setTimeout(() => {
            dispatch(getAllLego(query)).then((response) => {
                setIsLoaded(true);

                // set message to "No Results Found" if nothing comes back
                if (response && !response.lego.length) {
                    setNoResultsMessage('No Results Found');
                } else {
                // clear the message if results are found
                    setNoResultsMessage('');
                }
            });
        }, 500);

        setDelayedSearchTimeout(timeoutId);
    }

    return (
        <>
            <div className="lego-search-grid">
            <p className="top-header">A place for families to come together, track their LEGO library and trade their LEGO sets.
                Join us to discover a whole new world of LEGO trading right in your neighborhood!
                </p>
                <LegoListSearch onSearch={handleSearchQuery}/>
            <div className="lego-list">
                {isLoaded && legoArr.length ?
                Object.values(lego).map((lego) => (
                    <div>
                        <li key={lego.id} className="tooltip">
                            <Link to={`/lego/${lego.id}`}>
                                <img src={`${lego.image}`} className="set-img" alt="Lego Set"/>
                                <div className="lego-grid">
                                    <div className="grid1">
                                    <p className="lego-name">{lego.name}</p>
                                    <p className="lego-pieces">{lego.pieces} pieces</p>
                                    </div>
                                    <p className="grid2 age">Suggested Age:{lego.ages}</p>
                                </div>
                            </Link>
                        </li>
                    </div>
                ))
                : <div>{noResultsMessage}</div>}
            </div>
            </div>
        </>
    )

}

export default LegoList;
