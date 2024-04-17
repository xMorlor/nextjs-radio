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

/*
"use client";

import * as React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Submit } from "@/lib/actions";

export default function Home() {
	return (
		<main className="w-screen h-screen flex items-center justify-center">
			<form action={Submit}>
				<Card className="w-[350px]">
					<CardHeader>
						<CardTitle>Spotify Radio</CardTitle>
						<CardDescription>
							Choose a genre you would like the radio to play
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid w-full items-center">
							<div className="flex flex-col space-y-1.5">
								<Select name="genre">
									<SelectTrigger id="genre">
										<SelectValue placeholder="Select a genre" />
									</SelectTrigger>

									<SelectContent>
										<SelectItem value="rap">rap</SelectItem>
										<SelectItem value="pop">pop</SelectItem>
										<SelectItem value="phonk">
											phonk
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex justify-center">
						<Button type="submit">Play</Button>
					</CardFooter>
				</Card>
			</form>
		</main>
	);
}*/
