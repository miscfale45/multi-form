import React, { useEffect } from "react";
import { useGloablContext } from "../context";
const formInputs = [
	{ fieldName: "Name", placeholder: "Stephen King", name: "name" },
	{
		fieldName: "Email Address",
		placeholder: "Stephenking@lorem.com",
		name: "email",
	},
	{
		fieldName: "Phone Number",
		placeholder: "+977 1928301832",
		name: "phoneNo",
	},
];

function Info() {
	const { formData, setFormData, setCurrentStep } = useGloablContext();

	const inputChangeHandler = (e) => {
		console.log(e.target.name);
		setFormData((oldVal) => ({ ...oldVal, [e.target.name]: e.target.value }));
	};
	useEffect(() => setCurrentStep(1), []);
	return (
		<div className="info-container">
			<div className="info-descriptions">
				<h1>Personnal info</h1>
				<p>Please provide your name, email address, and phone number.</p>
			</div>

			<form className="info-form">
				{formInputs.map((e, i) => {
					return (
						<div key={i} onChange={inputChangeHandler}>
							<label htmlFor={e.name}>{e.fieldName}</label>
							<input
								type="text"
								name={e.name}
								id={e.name}
								placeholder={`e.g. ${e.placeholder}`}
								value={formData[e.name]}
							/>
						</div>
					);
				})}
			</form>
		</div>
	);
}

export default Info;
