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
  const res = await fetch(`https://nwhofapi.azurewebsites.net/api/judges/${params.id}`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  if (res.ok) {
    const judge = await res.json();
    return {
      props: {j: judge}
    };
  } else if (res.status == 404) {
    throw error(404, `The requested page does not exist on this server.`);
  } else {
    throw error(res.status, 'An error occurred while fetching data for this page.');
  }
};

let pronouns = ["She/Her", "He/Him", "They/Them", "Other"];

function getTrueFalseValues(value: boolean) {
  return (value ? 1 : 0)
}

export const actions: Actions = {
  edit: async ({request, params}) => {
    const formData = await request.formData();
    const data: { [name: string]: any } = {};
    const info: { [name: string]: any } = {};

    // data['id'] = params.id;
    for (let field of formData) {
      const [key, value] = field;
      switch (key) {
        case "pronouns":
          info[key] = pronouns[value];
          break;
        case "previousJudge":
          info[key] = getTrueFalseValues(value);
          break;
        case "interested":
          info[key] = getTrueFalseValues(value);
          break;
        case "deadline":
          info[key] = getTrueFalseValues(value);
          break;
        case "active":
          data[key] = getTrueFalseValues(value);
          break;
        case "firstName":
          data[key] = value;
          break;
        case "lastName":
          data[key] = value;
          break;
        case "email":
          data[key] = value;
          break;
        default:
          info[key] = value;
          break;
      }        
    }
    data["info"] = info;
    data["info"] = JSON.stringify(info);
    // console.log(data);
    const res = await fetch(`https://nwhofapi.azurewebsites.net/api/judges/${params.id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'x-functions-key': FUNCTIONS_KEY
      }
    });
  },
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