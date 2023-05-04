import { error, type Actions, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

import { dev } from "$app/environment";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, auth } from "$lib/firebase/clientApp";

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
  const authRes = await fetch(
    `https://nwhofapi.azurewebsites.net/api/getuserbyfirebaseid/${user}`,{headers:{'x-functions-key':FUNCTIONS_KEY}}
  );
  if (authRes.ok) {
    let authInfo = (await authRes.json())[0];
    if (authInfo['type'] === 'judge') throw error(401, "Unauthorized.");
  } else {
    throw error(authRes.status, 'An error occured while fetching data for this page.');
  }

  const res = await fetch(`https://nwhofapi.azurewebsites.net/api/judges/`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  if (res.ok) {
    const judges = await res.json();
    return {
      props: {judges: judges}
    };
  } else {
    throw error(res.status, 'An error occured while fetching data for this page.');
  }
}

export const actions: Actions = {
  accept: async ({request, params}) => {
    const formData = await request.formData();
    const data: { [name: string]: any } = {};

    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    data['action'] = 'ACCEPT';
    const res = await fetch(`https://nwhofapi.azurewebsites.net/api/judges/review`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'x-functions-key': FUNCTIONS_KEY
      }
    });
    if (res.ok) {
      throw redirect(303, '/judges');
    }
  },
  
  reject: async ({request, params}) => {
    const formData = await request.formData();
    const data: { [name: string]: any } = {};

    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    data['action'] = 'REJECT';
    // console.log(JSON.stringify(data));
    const res = await fetch(`https://nwhofapi.azurewebsites.net/api/judges/review`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'x-functions-key': FUNCTIONS_KEY
      }
    });
    if (res.ok) {
      throw redirect(303, '/judges');
    }
  }
};