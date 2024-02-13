import TagForm from "./TagForm";

const CreateTagForm = () => {
    const tag = {
        tag0: '',
        tag1: '',
        tag2: '',
        tag3: '',
        tag4: '',
    };

    return <TagForm tag={tag} formType="Add Tags"/>
}

export default CreateTagForm
