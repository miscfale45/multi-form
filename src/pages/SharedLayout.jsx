import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useGloablContext } from "../context";

const formCategories = [
	{ title: "Your Info", routePath: "/" },
	{ title: "Select Plan", routePath: "/plan" },
	{ title: "Add-Ons", routePath: "/addOns" },
	{ title: "Summary", routePath: "/summary" },
];

function SharedLayout() {
	const navigate = useNavigate();
	const { currentStep, setCurrentStep } = useGloablContext();

	const navHandler = (action) => {
		let navStep = action === "back" ? currentStep - 1 : currentStep + 1;
		if (currentStep === formCategories.length && action === "forward") {
			return alert("Successfully submitted");
		}
		return navigate(formCategories[navStep - 1].routePath);
	};

	return (
		<div className="shared-layout-container">
			<div className="side-bar">
				{formCategories.map((e, i) => (
					<div key={i} className="category-container">
						<div>{i + 1}</div>
						<section>
							<p>STEP {i + 1}</p>
							<p onClick={() => navigate(formCategories[i].routePath)}>
								{e.title.toUpperCase()}
							</p>
						</section>
					</div>
				))}
			</div>
			<div className="outlet-container">
				<Outlet />
			</div>

			<div className="footer">
				<button
					onClick={() => navHandler("back")}
					style={{ visibility: currentStep === 1 ? "hidden" : "visible" }}
				>
					Go Back
				</button>
				<button onClick={() => navHandler("forward")}>
					{currentStep == formCategories.length ? "Confirm" : "Next Step"}
				</button>
			</div>
		</div>
	);
}

export default SharedLayout;
