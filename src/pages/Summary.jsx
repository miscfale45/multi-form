import React, { useEffect } from "react";
import { useGloablContext } from "../context";
import { Link } from "react-router-dom";

function Summary() {
	const { formData, setCurrentStep } = useGloablContext();

	const duration = formData.plan.duration;
	const costFormatter = (cost) => `$${cost}/${formData.plan.duration}`;
	const calcTotal = () => {
		let sum = 0;
		sum =
			+formData.plan.cost +
			formData.addOns.reduce((acc, e) => acc + e.cost, sum);
		return sum;
	};
	useEffect(() => setCurrentStep(4), []);

	return (
		<div className="summary-container">
			<div className="summary-descriptions">
				<h1>Finishing up</h1>
				<p>Double-check everything looks OK before confirming.</p>
			</div>

			<div className="summary-options">
				<div>
					<div>
						<h3>{`${formData.plan.type} (${
							duration === "mo" ? "Monthly" : "Yearly"
						})`}</h3>
						<Link to="/plan">Change</Link>
					</div>
					<p>{costFormatter(formData.plan.cost)}</p>
				</div>
				<section className="break-line"></section>
				{formData.addOns.map((e, i) => (
					<div key={i}>
						<p>{e.type}</p>
						<p>{`$${e.cost}/${duration}`}</p>
					</div>
				))}
			</div>

			<div className="total-container">
				<p>{`Total (per ${duration === "mo" ? "month" : "year"})`}</p>
				<p>{`+${costFormatter(calcTotal())}`}</p>
			</div>
		</div>
	);
}

export default Summary;
