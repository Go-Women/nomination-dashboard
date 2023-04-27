import { error, type Actions, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { dev } from "$app/environment";

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

  // Get the current cohort
  const currentCohortRes = await fetch(
    `https://nwhofapi.azurewebsites.net/api/settings/cohorts/current`,{headers:{'x-functions-key':FUNCTIONS_KEY}}
  );
  if (currentCohortRes.ok) {
    let cohort = (await currentCohortRes.json());
    return {
      props: { currentCohort: cohort }
    };
  } else {
    throw error(currentCohortRes.status, 'An error occured while fetching data for this page.');
  }
}

export const actions: Actions = {
  cohorts: async ({request, params}) => {
    const formData = await request.formData();
    const data: { [name: string]: any } = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    const res = await fetch(`https://nwhofapi.azurewebsites.net/api/settings/cohorts`, {
      method: 'POST',
      body: JSON.stringify({ startDate: new Date(), inductionYear: data['inductionYear'] }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'x-functions-key': FUNCTIONS_KEY
      }
    });
    throw redirect(302, '/settings');
  }
};