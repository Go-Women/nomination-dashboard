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

  const res = await fetch(`https://nwhofapi.azurewebsites.net/api/nominations`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  if (res.ok) {
    const nominations = await res.json();
    return {
      props: {nominations: nominations}
    };
  } else {
    throw error(res.status, 'An error occured while fetching data for this page.')
  }
}