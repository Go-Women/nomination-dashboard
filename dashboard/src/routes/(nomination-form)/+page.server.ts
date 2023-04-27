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
  
  default: async ({request}) => {
    const formData = await request.formData();
    const data: { [name: string]: any } = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    const res = await fetch("https://nwhofapi.azurewebsites.net/api/nominations", {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'x-functions-key': FUNCTIONS_KEY
      }
    });
    return { success: res.ok };
  } 
};