import LegoForm from "./LegoForm"

const CreateLegoForm = () => {
    const lego = {
        name: "",
        itemNumber: "",
        pieces: "",
        ages: "",
        theme: "",
        status: "",
        image: ""
    };

    return <LegoForm lego={lego} formType="Add Lego"/>
}

export default CreateLegoFrom
