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

export const load: PageServerLoad = async ({fetch, params, cookies}) => {
  const user = cookies.get('user');
  if (!user) throw error(401, "Unauthorized.");
  const authRes = await fetch(
    `https://nwhofapi.azurewebsites.net/api/getuserbyfirebaseid/${user}`,{headers:{'x-functions-key':FUNCTIONS_KEY}}
  );
  if (authRes.ok) {
    let authInfo = (await authRes.json())[0];
    if (authInfo['type'] === 'judge') throw error(401, "Unauthorized.");
  } else {
    throw error(authRes.status, 'An error occured while fetching data for this page.');
  }
  const res = await fetch(`https://nwhofapi.azurewebsites.net/api/nominees`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  const res2 = await fetch(`https://nwhofapi.azurewebsites.net/api/settings/cohorts`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  const res3 = await fetch(`https://nwhofapi.azurewebsites.net/api/settings/cohorts/current`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  if (res.ok && res2.ok && res3.ok) {
    const nominees = await res.json();
    const cohorts = await res2.json();
    const currentCohort = await res3.json();
    return {
      props: {
        nominees: nominees,
        cohorts: cohorts,
        currentCohort: currentCohort
      }
    };
  } else {
    if (!res.ok) throw error(res.status, 'An error occured while fetching data for this page.');
    if (!res2.ok) throw error(res2.status, 'An error occured while fetching cohort data for this page.');
    if (!res3.ok) throw error(res3.status, 'An error occured while fetching cohort data for this page.');
  }
};