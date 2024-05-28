import { createFileRoute } from "@tanstack/react-router";
import type { FunctionComponent } from "../common/types";

const Home = (): FunctionComponent => {
	return (
		<div className="bg-blue-300  font-bold w-screen h-screen flex flex-col justify-center items-center ">
			<p className="text-white text-6xl" data-testid="hello-message">
				Hello, world!
			</p>
		</div>
	);
};

export const Route = createFileRoute("/")({
	component: Home,
});