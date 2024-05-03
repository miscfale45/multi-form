import React, { useEffect } from "react";
import { useGloablContext } from "../context";

const addOnsTypes = [
	{
		id: "addon1",
		type: "Online Service",
		description: "Access to multiplayer games",
		cost: { mo: "1", yr: "11" },
	},
	{
		id: "addon2",
		type: "Larger Storage",
		description: "Extra 1TB of cloud save",
		cost: { mo: "2", yr: "20" },
	},
	{
		id: "addon3",
		type: "Customizable profile",
		description: "Custom theme on your profile",
		cost: { mo: "2", yr: "20" },
	},
];
function AddOns() {
	const { formData, setFormData, setCurrentStep } = useGloablContext();

	const includeCheckObjReturner = (e) => ({
		id: e.id,
		type: e.type,
		cost: +e.cost[formData.plan.duration],
	});

	const addOnsFinder = (obj) => {
		return formData.addOns.find(
			(e) => includeCheckObjReturner(obj).id === e.id
		);
	};
	useEffect(() => setCurrentStep(3), []);

	const addOnsChangeHandler = (obj) => {
		setFormData((oldVal) => {
			let isAdded = addOnsFinder(obj);
			const newAddonsArr = isAdded
				? oldVal.addOns.filter((x) => x.id !== obj.id)
				: [...oldVal.addOns, includeCheckObjReturner(obj)];
			return { ...oldVal, addOns: newAddonsArr };
		});
	};
	return (
		<div className="addOns-container">
			{/* title and description */}
			<div className="addOns-descriptions">
				<h1>Pick add-ons</h1>
				<p>Add-ons help enhance your gaming experience.</p>
			</div>

			<div className="addOns-options">
				{addOnsTypes.map((e, i) => (
					<div
						key={i}
						className={`addOns-type ${addOnsFinder(e) ? "selected" : ""}`}
					>
						<label htmlFor={e.id}>
							<input
								type="checkbox"
								name="addOn"
								id={e.id}
								checked={addOnsFinder(e) ? true : false}
								onChange={() => addOnsChangeHandler(e)}
							/>

							<div className="addOns-type-descriptions">
								<h3>{e.type}</h3>
								<p>{e.description}</p>
							</div>

							<div>
								{`+$${e.cost[formData.plan.duration]}/${
									formData.plan.duration
								}`}
							</div>
						</label>
					</div>
				))}
			</div>
		</div>
	);
}

export default AddOns;
