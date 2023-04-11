import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

import { FUNCTIONS_KEY } from "$env/static/private";

export const load: PageServerLoad = async ({ fetch, params }) => {
  const resMatch = await fetch(`https://nwhofapi.azurewebsites.net/api/matches/${params.id}`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  const resKeys = await fetch(`https://nwhofapi.azurewebsites.net/api/keys`, {headers:{'x-functions-key':FUNCTIONS_KEY}});

  if (resMatch.ok && resKeys.ok) {
    const match = await resMatch.json();
    const keys = await resKeys.json();

    const resNominee = await fetch(`https://nwhofapi.azurewebsites.net/api/nominees/${match.nomineeID}`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
    const nominee = await resNominee.json();

    let nominations: any[] = [];
    const nominationIDs: any[] = JSON.parse(nominee.nominations);
    for (const child of nominationIDs) {
      const result = await fetch(`https://nwhofapi.azurewebsites.net/api/nominations/${child['ID']}`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
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
    console.log(data);
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