import * as React from "react";
import SelectForm from "@/components/ui/home/select-form";
import { fetchGenres } from "@/lib/data";

export default async function Home() {
	const genreNames = await fetchGenres();

	return (
		<main className="w-screen h-screen flex items-center justify-center bg-muted/40">
			<SelectForm genreNames={genreNames} />
		</main>
	);
}
