import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const response = await fetch(`http://localhost:8000/nominations/${params.id}`);
  let nominationData = await response.json();
  return { nomination: nominationData };
}