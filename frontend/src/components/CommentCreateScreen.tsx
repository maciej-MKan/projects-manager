import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {addComment} from './utils/CreateComment.ts';
import {validateDescription, validateName} from "./utils/Validators.ts";

const CreateComment = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const [comment, setComment] = useState('');
    const [step, setStep] = useState(1);
    const [error, setError] = useState("")
    const [isValidForm, setValidForm] = useState(false);


    const checkName = (value) => {
        const valid = validateDescription(value)
        setError(valid);
        if(value === ""){
            setError('Comment is required')
        }
        setValidForm(valid === "");
    }

    const handleInputChange = (e) => {
        if (e.target !== undefined) {
            setComment(e.target.value);
            checkName(e.target.value);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await addComment(state.id, comment);
            navigate("/project-details", {state: state})
        } catch (error) {
            console.log(error);
            navigate("/login");
        }
    };

    const handleNext = () => {
        setStep(2);
    }

    const handlePreviousStep = () => {
        setStep(1);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    {step === 1 && (
                        <>
                            <h1>Add Comment</h1>
                            <form onSubmit={handleNext}>
                                <div className="mb-3">
              <textarea
                  value={comment}
                  onChange={handleInputChange}
                  onLoad={(e) => checkName(e.target)}
                  placeholder="Comment content"
                  className="form-control"
              />
                                </div>
                                <div className="d-flex">
                                    <button type="submit" className="btn btn-primary me-2" disabled={!isValidForm}>
                                        Add Comment
                                    </button>
                                    <button className="btn btn-secondary me-2" onClick={() => navigate(-1)}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
                <div className="col-md-6">
                    <div className="row">
                    {step === 2 && (
                        <div>
                            <h1>Confirm Comment Addition:</h1>
                            <p>Project Name: {state.name}</p>
                            <p>Comment: {comment}</p>
                            <div className="d-flex">
                                <button className="btn btn-success me-2" onClick={handleSubmit}>
                                    Submit
                                </button>
                                <button className="btn btn-primary me-2" onClick={handlePreviousStep}>
                                    Back
                                </button>
                                <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {error && <p className="text-danger">{error}</p>}
        </div>
    );
};

export default CreateComment;