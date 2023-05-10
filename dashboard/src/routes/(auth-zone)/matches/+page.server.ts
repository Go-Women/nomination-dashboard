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

export const load: PageServerLoad = async ({ fetch, cookies }) => {
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
  const res1 = await fetch(`https://nwhofapi.azurewebsites.net/api/matches`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  const res2 = await fetch(`https://nwhofapi.azurewebsites.net/api/matches/review`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  const res3 = await fetch(`https://nwhofapi.azurewebsites.net/api/matches/candidates`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  const res4 = await fetch(`https://nwhofapi.azurewebsites.net/api/matches/manual`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  const res5 = await fetch(`https://nwhofapi.azurewebsites.net/api/settings/cohorts`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  const res6 = await fetch(`https://nwhofapi.azurewebsites.net/api/settings/cohorts/current`, {headers:{'x-functions-key':FUNCTIONS_KEY}});


  if (res1.ok && res2.ok && res3.ok && res4.ok &&res5.ok && res6.ok) {
    const matches = await res1.json();
    const review = await res2.json();
    const candidates = await res3.json();
    const judges = candidates['judges'];
    const nominees = candidates['nominees'];
    const manualReview = await res4.json();
    const cohorts = await res5.json();
    const currentCohort = await res6.json();

    return {
      props: { 
        matches: matches,
        judges: judges,
        nominees: nominees,
        manual: manualReview,
        suggestions: review,
        cohorts: cohorts,
        currentCohort: currentCohort
      }
    };
  } else {
    if (!res1.ok) throw error(res1.status, 'An error occurred while fetching matches data for this page.');
    if (!res2.ok) throw error(res2.status, 'An error occurred while fetching suggestions data for this page.');
    if (!res3.ok) throw error(res3.status, 'An error occurred while fetching candidates data for this page.');
    if (!res4.ok) throw error(res4.status, 'An error occurred while fetching manual assignment data for this page.');
    if (!res5.ok) throw error(res5.status, 'An error occurred while fetching cohort data for this page.');
    if (!res6.ok) throw error(res6.status, 'An error occurred while fetching cohort data for this page.');
  }
};


function formatSuggestions(selections: ''){
  const nominations = JSON.parse(`${selections}`);
  var acceptArr = [];
  var manualArr = [];
  for (const [key, value] of Object.entries(nominations)) {
    var selected = key.split(":");
    switch (value) {
      case 'MANUAL':
        manualArr.push(selected);
        break;
      case 'ACCEPT':
        acceptArr.push(selected);
        break;
      default:
        break;
    }
  }

  return {
    accept: acceptArr,
    manual: manualArr
  };
}

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
  },
  suggestions: async ({request}) => {
    const formData = await request.formData();
    const data: { [name: string]: any } = {};
    for (let field of formData) {
      const [key, value] = field;
      if (key === 'matchSelections')
        data['accept'] = formatSuggestions(value).accept;
        data['manual'] = formatSuggestions(value).manual;
    }
    // console.log(data);
    const res = await fetch(`https://nwhofapi.azurewebsites.net/api/matches/review`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'x-functions-key': FUNCTIONS_KEY
      }
    });
  },
  undo: async ({request}) => {
    const formData = await request.formData();
    const data: { [name: string]: any } = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    // console.log(data);
    const res = await fetch(`https://nwhofapi.azurewebsites.net/api/matches/undo`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'x-functions-key': FUNCTIONS_KEY
      }
    });
  },
};
