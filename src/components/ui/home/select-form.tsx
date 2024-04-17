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
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

import { Submit } from "@/lib/actions";

interface SelectFormProps {
	genreNames: string[];
}

export default function SelectForm({ genreNames }: SelectFormProps) {
	const { toast } = useToast();

	const SubmitForm = async (data: FormData) => {
		const result = await Submit(data);

		if (result) {
			console.log("Ss");
			toast({
				title: "Uh oh! Something went wrong.",
				description: result.message,
				variant: "destructive",
			});
		}
	};

	return (
		<main className="w-screen h-screen flex items-center justify-center">
			<form action={SubmitForm}>
				<Card className="w-[350px]">
					<CardHeader>
						<CardTitle>Radio</CardTitle>
						<CardDescription>
							Choose a genre you would like the radio to play
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid w-full items-center">
							<div className="flex flex-col space-y-1.5 h-20">
								<Label>Genre</Label>
								<Select name="genre">
									<SelectTrigger id="genre">
										<SelectValue placeholder="Select a genre" />
									</SelectTrigger>

									<SelectContent>
										{genreNames?.map((genre, index) => (
											<SelectItem
												key={index}
												value={genre}
											>
												{genre}
											</SelectItem>
										))}
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

			<Toaster />
		</main>
	);
}
