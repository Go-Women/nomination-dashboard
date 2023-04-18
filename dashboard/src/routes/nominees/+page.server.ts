import type { Actions, PageServerLoad } from "./$types";

import { dev } from "$app/environment";
import { error } from "@sveltejs/kit";

let FUNCTIONS_KEY: string;
if (dev) {
  const { DEFAULT_KEY } = await import("$env/static/private");
  FUNCTIONS_KEY = DEFAULT_KEY;
} else {
  FUNCTIONS_KEY = `${process.env.DEFAULTKEY}`;
}

export const load: PageServerLoad = async ({fetch, params}) => {
  const res = await fetch(`https://nwhofapi.azurewebsites.net/api/nominees`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  if (res.ok) {
    const nominees = await res.json();
    return {
      props: {nominees: nominees}
    };
  } else {
    throw error(res.status, 'An error occurred while fetching data for this page.');
  }
};