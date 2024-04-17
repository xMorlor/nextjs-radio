"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeftToLine } from "lucide-react";

export default function ReturnButton() {
	const router = useRouter();

	return (
		<div className="absolute top-5 left-5">
			<Button
				variant="outline"
				size="icon"
				onClick={() => router.push("/")}
			>
				<ArrowLeftToLine className="h-4 w-4" />
			</Button>
		</div>
	);
}
