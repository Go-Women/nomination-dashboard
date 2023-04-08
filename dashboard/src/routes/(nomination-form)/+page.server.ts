import type { Actions } from "./$types";

import { FUNCTIONS_KEY } from "$env/static/private";

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
    })
    .then(res => res.json())
    .then(res => console.log(res))
  } 
};