import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, params }) => {
  throw redirect(303, `/matches/${params.id}/review`);
};