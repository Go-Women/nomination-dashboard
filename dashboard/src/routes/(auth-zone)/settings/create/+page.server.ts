import type { Actions, PageServerLoad } from "./$types";

import { dev } from "$app/environment";
import { error, redirect } from "@sveltejs/kit";

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
}

export const actions: Actions = {
  default: async ({request}) => {
    const formData = await request.formData();
    const data: { [name: string]: any } = {};
    const info: { [name: string]: any } = {};

    const pronouns = ["She/Her", "He/Him", "They/Them", "Other"];

    for (let field of formData) {
      const [key, value] = field;
      switch (key) {
        case "pronouns":
          info[key] = pronouns[value];
          data["info"] = info;
          break;
        case "email":
          data[key] = value;
          break;
        case "firstName":
          data[key] = value;
          break;
        case "lastName":
          data[key] = value;
          break;
        case "firebaseID":
          data[key] = value;
          break;
        case "password":
            break;
        default:
          info[key] = value;
          data["info"] = info;
          break;
      }        
    }
    data["info"] = info;
    data['type'] = 'admin';
    data['active'] = 1;
    console.log(JSON.stringify(data));
    const res = await fetch('https://nwhofapi.azurewebsites.net/api/judges', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'x-functions-key': FUNCTIONS_KEY
      }
    });
    throw redirect(301, '/login');
  } 
};