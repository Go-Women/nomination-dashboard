import type { PageServerLoad } from "./$types";

import { dev } from "$app/environment";
import { error } from "@sveltejs/kit";

let FUNCTIONS_KEY: string;
if (dev) {
  const { DEFAULT_KEY } = await import("$env/static/private");
  FUNCTIONS_KEY = DEFAULT_KEY;
} else {
  FUNCTIONS_KEY = `${process.env.DEFAULTKEY}`;
}

export const load: PageServerLoad = async ({fetch, cookies}) => {
  const user = cookies.get('user');
  if (!user) throw error(401, "Unauthorized.");
  const authRes = await fetch(`https://nwhofapi.azurewebsites.net/api/getuserbyfirebaseid/${user}`,{headers:{'x-functions-key':FUNCTIONS_KEY}});
  if (authRes.ok) {
    let authInfo = (await authRes.json())[0];
    if (authInfo['type'] === 'judge' && JSON.parse(authInfo['info'])['judgeStatus'] !== 'j300') throw error(401, "Unauthorized.");
  } else {
    throw error(authRes.status, 'An error occured while fetching data for this page.');
  }

  const res1 = await fetch(`https://nwhofapi.azurewebsites.net/api/nominations`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  const res2 = await fetch(`https://nwhofapi.azurewebsites.net/api/nominees`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  const res3 = await fetch(`https://nwhofapi.azurewebsites.net/api/judges`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  const res4 = await fetch(`https://nwhofapi.azurewebsites.net/api/matches`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  const res5 = await fetch(`https://nwhofapi.azurewebsites.net/api/judges/${10}/matches`, {headers:{'x-functions-key':FUNCTIONS_KEY}});

  if (res1.ok && res2.ok && res3.ok && res4.ok) {
    const nominations = await res1.json();
    const nominees = await res2.json();
    const judges = await res3.json();
    const matches = await res4.json();
    const jMatches = await res5.json();

    return {
      props: {
        nominations: nominations,
        nominees: nominees,
        judges: judges,
        matches: matches,
        judgeMatches: jMatches
      }
    };
  } else {
    throw error(res.status, 'An error occurred while fetching data for this page.')
  }
}