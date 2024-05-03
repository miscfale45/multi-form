import { useState } from "react";
import { createContext, useContext } from "react";

const GlobalContext = createContext();
export const useGloablContext = () => useContext(GlobalContext);

function AppContext({ children }) {
	const defaultState = {
		name: "",
		email: "",
		phone: null,
		plan: { type: "", duration: "mo", cost: "" },
		addOns: [],
	};
	const [formData, setFormData] = useState(defaultState);
	const [currentStep, setCurrentStep] = useState(2);

	return (
		<GlobalContext.Provider
			value={{ formData, setFormData, currentStep, setCurrentStep }}
		>
			{children}
		</GlobalContext.Provider>
	);
}

export default AppContext;
