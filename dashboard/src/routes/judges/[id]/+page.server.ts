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
    throw error(res.status, 'An error occured while fetching data for this page.');
  }
};

const codes = [
  {value: "c100", label: "Art"},
  {value: "c200", label: "Athletics"},
  {value: "c300", label: "Business"},
  {value: "c400", label: "Education"},
  {value: "c500", label: "Humanities"},
  {value: "c600", label: "Public Service/Government"},
  {value: "c700", label: "STEM"},
  {value: "c800", label: "Other"}
];

let pronouns = ["She/Her", "He/Him", "They/Them", "Other"];

function getCategoryValues(categories: {value: string, label: string}[]) {
  let cleaned = [];
  for (const code in codes) {
    for (const category in categories) {
      if (categories[category].value == codes[code].value)
        cleaned.push(codes[code].value);
    }
  }
  return cleaned.join(",");
}

function getTrueFalseValues(value: boolean) {
  if (value) {
    return '1';
  } else {
    return '0';
  }
}

export const actions: Actions = {
  default: async ({request, params}) => {
    const formData = await request.formData();
    const data: { [name: string]: any } = {};
    const info: { [name: string]: any } = {};

    // data['id'] = params.id;
    for (let field of formData) {
      const [key, value] = field;
      switch (key) {
        case "pronouns":
          info[key] = pronouns[value];
          data["info"] = info;
          break;
        case "category":
          info[key] = getCategoryValues(JSON.parse(value));
          data["info"] = info;
          break;
        case "email":
          data[key] = value;
          break;
        case "previousJudge":
          info[key] = getTrueFalseValues(value);
          data["info"] = info;
          break;
        case "interested":
          info[key] = getTrueFalseValues(value);
          data["info"] = info;
          break;
        case "active":
          const val = getTrueFalseValues(value);
          data[key] = val;
          break;
        default:
          info[key] = value;
          data["info"] = info;
          break;
      }        
    }

    data["info"] = JSON.stringify(info);
    console.log(JSON.stringify(data));
    const res = await fetch(`https://nwhofapi.azurewebsites.net/api/judges/${params.id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'x-functions-key': FUNCTIONS_KEY
      }
    });
  }
};