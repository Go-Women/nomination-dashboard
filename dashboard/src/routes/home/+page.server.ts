import type { PageServerLoad } from "./$types";

import { dev } from "$app/environment";

let FUNCTIONS_KEY: string;
if (dev) {
  const { DEFAULT_KEY } = await import("$env/static/private");
  FUNCTIONS_KEY = DEFAULT_KEY;
} else {
  FUNCTIONS_KEY = `${process.env.DEFAULTKEY}`;
}

export const load: PageServerLoad = async ({fetch}) => {
  const res1 = await fetch(`https://nwhofapi.azurewebsites.net/api/nominations`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  const res2 = await fetch(`https://nwhofapi.azurewebsites.net/api/nominees`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  const res3 = await fetch(`https://nwhofapi.azurewebsites.net/api/judges`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  const res4 = await fetch(`https://nwhofapi.azurewebsites.net/api/matches`, {headers:{'x-functions-key':FUNCTIONS_KEY}});


  if (res1.ok && res2.ok) {
    const nominations = await res1.json();
    const nominees = await res2.json();
    const judges = await res3.json();
    const matches = await res4.json();
    return {
      props: {
        nominations: nominations,
        nominees: nominees,
        judges: judges,
        matches: matches
      }
    };
  }
}