import type { Actions, PageServerLoad } from "./$types";
import { dev } from "$app/environment";

let FUNCTIONS_KEY: string;
if (dev) {
  const { DEFAULT_KEY } = await import("$env/static/private");
  FUNCTIONS_KEY = DEFAULT_KEY;
} else {
  FUNCTIONS_KEY = `${process.env.DEFAULTKEY}`;
}

export const load: PageServerLoad = async ({ fetch, params }) => {
  const res = await fetch(`http://localhost:8000/matches/${params.id}`);
  if (res.ok) {
    const match = await res.json();
    return {
      props: { m: match }
    };
  }
};