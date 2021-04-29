import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as taskActions from "../../store/tasks";
import * as sessionActions from "../../store/session";
import * as listActions from "../../store/lists";
import { useDispatch } from "react-redux";
import "./QuickLook.css";
import { Button, Form } from "react-bootstrap";

const QuickLook = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [errors, setErrors] = useState([]);
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const close = document.querySelector("#modal-background");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await dispatch(sessionActions.login({ credential, password }));
		if (data?.errors) {
			setErrors(["Invalid Credentials"]);
		} else {
			history.go(0);
			close.click();
			return;
		}
	};

	return (
		<Form onSubmit={handleSubmit} className="loginform__Form">
			{errors.length > 0 && <h2>{errors} </h2>}
			<Form.Group controlId="formBasicEmail">
				<Form.Label>Username or Email</Form.Label>
				<Form.Control
					type="text"
					autoComplete="username"
					value={credential}
					onChange={(e) => setCredential(e.target.value)}
					required
					placeholder="Enter Username or Email"
				/>
			</Form.Group>
			<Form.Group controlId="formGroupPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					autoComplete="current-password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					placeholder="Enter Password"
				/>
			</Form.Group>
			<Button variant="primary" type="submit">
				Log In
			</Button>
		</Form>
	);
};
export default QuickLook;
