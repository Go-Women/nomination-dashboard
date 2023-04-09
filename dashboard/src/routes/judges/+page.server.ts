import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

import { FUNCTIONS_KEY } from "$env/static/private";

export const load: PageServerLoad = async ({fetch}) => {
  const res = await fetch(`https://nwhofapi.azurewebsites.net/api/judges/`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  if (res.ok) {
    const judges = await res.json();
    return {
      props: {judges: judges}
    };
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
  }
};