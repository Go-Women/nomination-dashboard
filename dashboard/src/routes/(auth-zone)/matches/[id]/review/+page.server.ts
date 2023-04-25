import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { dev } from "$app/environment";

let FUNCTIONS_KEY: string;
if (dev) {
  const { DEFAULT_KEY } = await import("$env/static/private");
  FUNCTIONS_KEY = DEFAULT_KEY;
} else {
  FUNCTIONS_KEY = `${process.env.DEFAULTKEY}`;
}

export const load: PageServerLoad = async ({ fetch, params, cookies }) => {
  const resMatch = await fetch(`https://nwhofapi.azurewebsites.net/api/matches/${params.id}`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  const resKeys = await fetch(`https://nwhofapi.azurewebsites.net/api/keys`, {headers:{'x-functions-key':FUNCTIONS_KEY}});

  if (resMatch.ok && resKeys.ok) {
    const match = await resMatch.json();
    const keys = await resKeys.json();

    const user = cookies.get('user');
    if (!user) throw error(401, "Unauthorized.");
    const authRes = await fetch(`https://nwhofapi.azurewebsites.net/api/getuserbyfirebaseid/${user}`,{headers:{'x-functions-key':FUNCTIONS_KEY}});
    if (authRes.ok) {
      let authInfo = (await authRes.json())[0];
      if (authInfo['type'] === 'judge' && authInfo['ID'] != match.judgeID) throw error(401, "Unauthorized.");
    } else {
      throw error(authRes.status, 'An error occured while fetching data for this page.');
    }

    const resNominee = await fetch(`https://nwhofapi.azurewebsites.net/api/nominees/${match.nomineeID}`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
    if (!resNominee.ok) throw error(resNominee.status, 'An error occured while fetching nominee data for this page.');
    const nominee = await resNominee.json();

    let nominations: any[] = [];
    const nominationIDs: any[] = JSON.parse(nominee.nominations);
    for (const child of nominationIDs) {
      const result = await fetch(`https://nwhofapi.azurewebsites.net/api/nominations/${child['ID']}`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
      if (!result.ok) throw error(result.status, 'An error occured while fetching nomination data for this page.');
      const nomination = await result.json();
      nominations.push(nomination);
    }

    return {
      props: {
        ID: params.id,
        match,
        nominee,
        nominations,
        keys
      }
    }
  } else {
    if (!resMatch.ok) {
      if (resMatch.status == 404) throw error (404, `The requested page does not exist on this server.`)
      else throw error (resMatch.status, 'An error occured while fetching match data for this page.');
    }
    if (!resKeys.ok) throw error (resKeys.status, 'An error occured while fetching keys data for this page.');
  }
}

export const actions: Actions = {
  default: async ({request}) => {
    const formData = await request.formData();
    const data: { [name: string]: any } = {};

    const verdict:{[key:string]:any} = {};
    for (let field of formData) {
      const [key, value] = field;
      switch (key) {
        case "nomQ1":
          verdict["nomQ1"] = value;
          break;
        case "nomQ2":
          verdict["nomQ2"] = value;
          break;
        case "nomQ3":
          verdict["nomQ3"] = value;
          break;
        case "nomAdditionalInfo":
          verdict["nomAdditionalInfo"] = value;
          break;
        case "verdict":
          verdict["verdict"] = value;
          break;
        case "judgeID":
          verdict["judgeID"] = value;
          data[key] = value;
          break;
        default:
          data[key] = value;
          break;
      }
    }

    data["data"] = JSON.stringify(verdict);
    // console.log(data);
    const res = await fetch('https://nwhofapi.azurewebsites.net/api/nominees/verdict', {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'x-functions-key': FUNCTIONS_KEY
      }
    })
    .then(() => { throw redirect(303, '/nominees'); })
  }
}