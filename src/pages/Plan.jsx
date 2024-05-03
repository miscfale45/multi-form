import React, { useEffect } from "react";
import { useGloablContext } from "../context";

const planTypes = [
	{
		type: "Arcade",
		price: { mo: 9, yr: 90 },
		iconSrc: "./src/assets/icon-arcade.svg",
	},
	{
		type: "Advanced",
		price: { mo: 12, yr: 120 },
		iconSrc: "./src/assets/icon-advanced.svg",
	},
	{
		type: "Pro",
		price: { mo: 15, yr: 150 },
		iconSrc: "./src/assets/icon-pro.svg",
	},
];
function Plan() {
	const { formData, setFormData, setCurrentStep } = useGloablContext();
	const planClickHandler = (index) => {
		setFormData((oldVal) => ({
			...oldVal,
			plan: {
				...oldVal.plan,
				type: planTypes[index].type,
				cost: +planTypes[index].price[oldVal.plan.duration],
			},
		}));
	};
	useEffect(() => setCurrentStep(2), []);

	return (
		<div className="plan-container">
			<div className="plan-descriptions">
				<h1>Select your plan</h1>
				<p>You have the option of monthly or yearly billing</p>
			</div>

			<div className="plan-options">
				{planTypes.map((e, i) => (
					<div
						key={i}
						className={`plan-type ${
							e.type === formData.plan.type ? "selected" : ""
						}`}
						onClick={() => planClickHandler(i)}
					>
						<div className="icon">
							<img src={e.iconSrc} alt="" />
						</div>
						<div className="plan-cost">
							<p>{e.type}</p>
							<p>{`$${e.price[formData.plan.duration]}/${
								formData.plan.duration
							}`}</p>
						</div>
					</div>
				))}
			</div>

			<div className="duration-container">
				<button
					onClick={() =>
						setFormData((oldVal) => ({
							...oldVal,
							plan: { ...oldVal.plan, duration: "mo" },
						}))
					}
				>
					Monthly
				</button>
				{/* toggle component */}
				<div className="toggle-component">
					<div
						className={`toggle-circle ${
							formData.plan.duration === "yr" ? "toggle-yr" : ""
						}`}
					></div>
				</div>
				<button
					onClick={() =>
						setFormData((oldVal) => ({
							...oldVal,
							plan: { ...oldVal.plan, duration: "yr" },
						}))
					}
				>
					Yearly
				</button>
			</div>
		</div>
	);
}

export default Plan;
