"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import { act } from "~/systems/Core/utils/act-server";

const schema = z.object({
	theme: z.string(),
});

export const setTheme = act(schema, async (input) => {
	cookies().set("fuel-theme", input.theme, { path: "/" });
});
