"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const SelectFormSchema = z.object({
	genre: z.string().min(1),
});

export async function Submit(data: FormData) {
	const genre = data.get("genre");

	// Validate form using Zod
	const validatedFields = SelectFormSchema.safeParse({
		genre: genre,
	});

	// If form validation fails, return errors early. Otherwise, continue.
	if (!validatedFields.success) {
		console.log(validatedFields.error.flatten().fieldErrors);
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "You must select a genre.",
		};
	}

	cookies().set("genre", `${genre}`);

	revalidatePath(`/${genre}/radio`);
	redirect(`/${genre}/radio`);
}
