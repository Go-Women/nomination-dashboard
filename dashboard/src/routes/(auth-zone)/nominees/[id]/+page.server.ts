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

export const load: PageServerLoad = async ({fetch, params, cookies}) => {
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
  const res1 = await fetch(`https://nwhofapi.azurewebsites.net/api/nominees/${params.id}`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  const res2 = await fetch(`https://nwhofapi.azurewebsites.net/api/keys`, {headers:{'x-functions-key':FUNCTIONS_KEY}});

  if (res1.ok && res2.ok) {
    const nominee = await res1.json();
    const nominationIDs: any[] = JSON.parse(nominee.nominations);

    let nominationList: any[] = [];
    for (const child of nominationIDs) {
      const result = await fetch(`https://nwhofapi.azurewebsites.net/api/nominations/${child['ID']}`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
      const nomination = await result.json();
      nominationList.push(nomination);
    }

    const keys = await res2.json();
    return {
      props: {
        n: nominee,
        nominations: nominationList,
        keys
      }
    };
  } else {
    if (!res1.ok) {
      if (res1.status == 404) throw error(404, `The requested page goes not exist on the server.`);
      else throw error(res1.status, 'An error occured while fetching nominee data for this page.');
    }
    if (!res2.ok) throw error(res2.status, 'An error occured while fetching keys data for this page.');
  }
};

export const actions: Actions = {
  default: async ({request, params}) => {
    const formData = await request.formData();
    const data: { [name: string]: any } = {};
    for (let field of formData) {
      const [key, value] = field;
          if (i == cats.length - 1)
      data[key] = value;
    }
    const res = await fetch(`https://nwhofapi.azurewebsites.net/api/nominations/${params.id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    });
  }
}