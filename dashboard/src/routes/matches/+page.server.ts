import type { Actions, PageServerLoad } from "./$types";

import { dev } from "$app/environment";

let FUNCTIONS_KEY: string;
if (dev) {
  const { DEFAULT_KEY } = await import("$env/static/private");
  FUNCTIONS_KEY = DEFAULT_KEY;
} else {
  FUNCTIONS_KEY = `${process.env.DEFAULTKEY}`;
}

export const load: PageServerLoad = async ({ fetch }) => {
  const res1 = await fetch(`https://nwhofapi.azurewebsites.net/api/matches`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  const res2 = await fetch(`https://nwhofapi.azurewebsites.net/api/matches/review`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  const res3 = await fetch(`https://nwhofapi.azurewebsites.net/api/matches/candidates`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  const res5 = await fetch(`https://nwhofapi.azurewebsites.net/api/matches/manual`, {headers:{'x-functions-key':FUNCTIONS_KEY}});

  if (res1.ok && res2.ok && res3.ok && res5.ok) {
    const matches = await res1.json();
    const review = await res2.json();
    const candidates = await res3.json();

    const judges = candidates['judges'];
    const nominees = candidates['nominees'];
    
    const manualReview = await res5.json();
    return {
      props: { 
        matches: matches,
        judges: judges,
        nominees: nominees,
        manual: manualReview,
        suggestions: review
      }
    };
  }
};

export const actions: Actions = {
  manual: async ({request}) => {
    const formData = await request.formData();
    const data: { [name: string]: any } = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    // console.log(data);
    const res = await fetch(`https://nwhofapi.azurewebsites.net/api/matches/manual`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'x-functions-key': FUNCTIONS_KEY
      }
    });
  },
  generate: async ({request}) => {
    const formData = await request.formData();
    const data: { [name: string]: any } = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }

    const res = await fetch(`http://localhost:8000/matches/data`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    });
  },
  match: async ({request}) => {
    const formData = await request.formData();
    const data: { [name: string]: any } = {};
    for (let field of formData) {
      const [key, value] = field;
      if (key === 'nominee')
        data[key] = value;
      if (key === 'judges')
        data[key] = value.split(',');
      else
        data[key] = value
    }

    // console.log(data);
    const res = await fetch(`https://nwhofapi.azurewebsites.net/api/matches`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'x-functions-key': FUNCTIONS_KEY
      }
    });
  }
};
