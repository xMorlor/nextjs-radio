import * as React from "react";
import { cookies } from "next/headers";
import ReturnButton from "@/components/ui/radio/returnButton";
import { fetchRadio } from "@/lib/data";
import Player from "@/components/ui/radio/player";

export default async function Radio() {
	const cookieStore = cookies();

	const genre = cookieStore.get("genre");

	const songs = await fetchRadio(genre!);

	return (
		<main className="w-screen h-screen flex items-center justify-center relative bg-muted/40">
			<ReturnButton />

			<Player songs={songs} />
		</main>
	);
}
