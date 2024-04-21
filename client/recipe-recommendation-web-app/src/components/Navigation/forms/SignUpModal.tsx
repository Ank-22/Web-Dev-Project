import {Button, Modal} from "react-bootstrap";
import React, {useState} from "react";
import * as client from "../../UserServices/client"

function SignUpModal(props: any) {
    const { show, onHide} = props;
    const [errorMsg, setErrorMsg] = useState('');
    let blankSignUpForm = {
        id: "U" + new Date().valueOf(),
        username: '',
        email: '',
        password: '',
        role: 'member',
        first_name: '',
        last_name: '',
        country: '',
        age: 0,
        group: []
    }
    const [signUpData, setSignUpData] = useState(blankSignUpForm);

    const handleChange = (e: any) => {
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            let userData = {
                ...signUpData,
                age: Number(signUpData.age)
            }
            const newUser = await client.createUser(userData);
            setErrorMsg('');
            onHide();
        }
        catch (error: any) {
            if (error.response.status === 400) {
                setErrorMsg("Username is taken!");
            }
            else {
                setErrorMsg("Unknown Error");
            }
        }
    }
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            {errorMsg !== '' &&
                                <p style={{"color": "red"}}>{errorMsg}</p>
                            }
                            <label htmlFor="userInput">Enter your username: <span
                                className="mandatory-indicator"> *</span>
                            </label>
                            <br />
                            <input type="text" id="userInput" className="form-control" onChange={handleChange}
                                   value={signUpData.username} name="username"
                                   title="Please enter your username" placeholder="Enter your username here"
                                   required={true}
                            />
                            <br />
                            <label htmlFor="passwordInput">Enter your password: <span
                                className="mandatory-indicator"> *</span>
                            </label>
                            <br />
                            <input type="text" id="passwordInput" className="form-control" onChange={handleChange}
                                   title="Please enter your password" placeholder="Enter your password here"
                                   value={signUpData.password} name="password"
                                   required={true}
                            />
                            <br />
                            <label htmlFor="emailInput">Enter your email:</label>
                            <br />
                            <input type="text" id="emailInput" className="form-control" onChange={handleChange}
                                   value={signUpData.email} name="email"
                                   title="Please enter your email" placeholder="Enter your email here"
                            />
                            <br />
                            <label htmlFor="firstNameInput">Enter your First Name:</label>
                            <br />
                            <input type="text" id="firstNameInput" className="form-control" onChange={handleChange}
                                   value={signUpData.first_name} name="first_name"
                                   title="Please enter your first name" placeholder="Enter your first name here"
                            />
                            <br />
                            <label htmlFor="lastNameInput">Enter your Last Name:</label>
                            <br />
                            <input type="text" id="lastNameInput" className="form-control" onChange={handleChange}
                                   value={signUpData.last_name} name="last_name"
                                   title="Please enter your last name" placeholder="Enter your last name here"
                            />
                            <br />
                            <label htmlFor="countryInput">Enter your Country of Origin:</label>
                            <input type="text" id="countryInput" className="form-control" onChange={handleChange}
                                   value={signUpData.country} name="country"
                                   title="Please enter your country of origin"
                                   placeholder="Enter your country of origin here"
                            />
                            <br />
                            <label htmlFor="ageInput">Enter your age:</label>
                            <br />
                            <input type="number" id="ageInput" className="form-control" onChange={handleChange}
                                   value={signUpData.age} name="age"
                                   title="Please enter your age" placeholder="Enter your age here"
                            />
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between align-items-center">

                <div className="text-start">
                    <span className="mandatory-indicator">* indicates the field is required</span>
                </div>
                <div>
                    <Button variant="danger" onClick={handleSubmit}>
                        Create Account
                    </Button>
                    {" "}
                    <Button variant="secondary" onClick={() => {
                        setSignUpData(blankSignUpForm);
                        setErrorMsg('');
                        onHide();
                    }}>
                        Cancel
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
export default SignUpModal;