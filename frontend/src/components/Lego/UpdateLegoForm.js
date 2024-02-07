import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getLegoDetails } from "../../store/lego";
import { useEffect } from "react";
import LegoForm from "./LegoForm";

const EditLegoForm = () => {
    const { legoId } = useParams();
    const lego = useSelector((state) => state.lego)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLegoDetails(legoId));
    }, [dispatch, legoId])

    if (!lego) return <></>

    return (
        Object.keys(lego).length > 1 && (
            <>
                <LegoForm lego={Lego} formType="Update Lego Set" />
            </>
        )
    );
};

export default EditLegoForm
