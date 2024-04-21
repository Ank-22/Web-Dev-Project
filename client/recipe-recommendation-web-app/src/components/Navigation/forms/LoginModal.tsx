import {Button, Modal} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";
import * as client from '../../UserServices/client'

function LoginModal(props: any) {
    const { setLoggedIn, show, onHide} = props;
    const [errorMsg, setErrorMsg] = useState('');
    const [credentials, setCredentials] = useState(
        {
            username: '',
            password: '',
        }
    );

    const handleChange = (e: any) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const user = await client.signIn(credentials);
            setErrorMsg('');
            onHide();
            setLoggedIn(true);
        } catch (error: any) {
            if (error.response.status === 404) {
                setErrorMsg("User does not exist");
            }
            else {
                setErrorMsg("Unknown Error");
            }
        }
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
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
                                   value={credentials.username} name="username"
                                   title="Please enter your username" placeholder="Enter your username here"
                                   required={true}
                            />
                            <br />
                            <label htmlFor="passwordInput">Enter your password: <span
                                className="mandatory-indicator"> *</span>
                            </label>
                            <br />
                            <input type="text" id="passwordInput" className="form-control" onChange={handleChange}
                                   value={credentials.password} name="password"
                                   title="Please enter your password" placeholder="Enter your password here"
                                   required={true}/>
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
                        Login
                    </Button>
                    {" "}
                    <Button variant="secondary" onClick={() => {
                        setCredentials({username: '', password: ''})
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
export default LoginModal;