import { Button } from "@/components/ui/button";
import * as React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<main className="w-screen h-screen flex items-center justify-center">
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
							<Label className="mt-[6px] mb-1">Genre</Label>
							<Skeleton className="h-10 w-full rounded-md my-2" />
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex justify-center">
					<Button disabled>Play</Button>
				</CardFooter>
			</Card>
		</main>
	);
}
