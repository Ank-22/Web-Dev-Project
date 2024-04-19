import {Button, Modal} from "react-bootstrap";
import React from "react";

function LoginModal(props: any) {
    const { show, onHide} = props;
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <label htmlFor="userInput">Enter your username: <span
                                className="mandatory-indicator"> *</span>
                            </label>
                            <br />
                            <input type="text" id="userInput" className="form-control" />
                            <br />
                            <label htmlFor="passwordInput">Enter your password: <span
                                className="mandatory-indicator"> *</span>
                            </label>
                            <br />
                            <input type="text" id="passwordInput" className="form-control" />
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between align-items-center">

                <div className="text-start">
                    <span className="mandatory-indicator">* indicates the field is required</span>
                </div>
                <div>
                    <Button variant="danger" onClick={() => { onHide(); }}>
                        Login
                    </Button>
                    {" "}
                    <Button variant="secondary" onClick={onHide}>
                        Cancel
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
export default LoginModal;