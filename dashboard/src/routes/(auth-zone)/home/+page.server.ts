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
  let authInfo;
  let jMatches = false;
  if (!user) throw error(401, "Unauthorized.");
  const authRes = await fetch(`https://nwhofapi.azurewebsites.net/api/getuserbyfirebaseid/${user}`,{headers:{'x-functions-key':FUNCTIONS_KEY}});
  if (authRes.ok) {
    authInfo = (await authRes.json())[0];
    if (authInfo['type'] === 'judge' && JSON.parse(authInfo['info'])['judgeStatus'] !== 'j300')
      throw error(401, "Unauthorized.");
    if (authInfo['type'] === 'judge') {
      const res5 = await fetch(`https://nwhofapi.azurewebsites.net/api/judges/${authInfo["ID"]}/matches`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
      if (res5.ok) {
        jMatches = await res5.json();
      } else {
        throw error(res5.status, 'An error occurred while fetching data for this page.');
      } 
    }
  } else {
    throw error(authRes.status, 'An error occurred while fetching data for this page.');
  }

  const res1 = await fetch(`https://nwhofapi.azurewebsites.net/api/nominations`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  const res2 = await fetch(`https://nwhofapi.azurewebsites.net/api/nominees`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  const res3 = await fetch(`https://nwhofapi.azurewebsites.net/api/judges`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  const res4 = await fetch(`https://nwhofapi.azurewebsites.net/api/matches`, {headers:{'x-functions-key':FUNCTIONS_KEY}});

  if (res1.ok && res2.ok && res3.ok && res4.ok) {
    const nominations = await res1.json();
    const nominees = await res2.json();
    const judges = await res3.json();
    const matches = await res4.json();

    return {
      props: {
        nominations: nominations,
        nominees: nominees,
        judges: judges,
        matches: matches,
        judgeMatches: jMatches,
        user: authInfo['type']
      }
    };
  } else {
    if (!res1.ok) throw error(res1.status, 'An error occurred while fetching data for this page.');
    if (!res2.ok) throw error(res2.status, 'An error occurred while fetching data for this page.');
    if (!res3.ok) throw error(res3.status, 'An error occurred while fetching data for this page.');
    if (!res4.ok) throw error(res4.status, 'An error occurred while fetching data for this page.');
  }
}