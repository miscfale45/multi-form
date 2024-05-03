import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Info, Plan, Summary, AddOns, SharedLayout, Error } from "./pages";
const router = createBrowserRouter([
	{
		path: "/",
		element: <SharedLayout />,
		errorElement: <Error />,
		children: [
			{ index: true, element: <Info /> },
			{
				path: "/plan",
				element: <Plan />,
			},
			{
				path: "/addOns",
				element: <AddOns />,
			},
			{
				path: "/summary",
				element: <Summary />,
			},
		],
	},
]);

function App() {
	return (
		<>
			<RouterProvider router={router}></RouterProvider>
		</>
	);
}

export default App;
