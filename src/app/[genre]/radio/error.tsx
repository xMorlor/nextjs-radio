"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Error() {
	const router = useRouter();

	return (
		<div className="w-[100%] flex justify-center items-center h-screen">
			<div className="bg-red-500 p-4 rounded-lg flex w-[30%]">
				<div className="float-left  self-center">
					<div className="text-white font-bold text-lg ">
						Uh oh! Something went wrong.
					</div>
					<div className="text-white">
						Please return to the main menu
					</div>
				</div>
				<Button
					className="float-right self-center ml-auto outline outline-1 bg-red-500"
					variant="destructive"
					onClick={() => {
						router.push("/");
					}}
				>
					Return
				</Button>
			</div>
		</div>
	);
}
