import type { Actions } from "./$types";

import { dev } from "$app/environment";

let FUNCTIONS_KEY: string;
if (dev) {
  const { DEFAULT_KEY } = await import("$env/static/private");
  FUNCTIONS_KEY = DEFAULT_KEY;
} else {
  FUNCTIONS_KEY = `${process.env.DEFAULTKEY}`;
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
        default:
          info[key] = value;
          data["info"] = info;
          break;
      }        
    }
    info["judgeStatus"] = "j100";
    data["info"] = info;
    const res = await fetch('https://nwhofapi.azurewebsites.net/api/judges', {
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