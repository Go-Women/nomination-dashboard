import type { PageServerLoad } from "./$types";

import { FUNCTIONS_KEY } from "$env/static/private";

export const load: PageServerLoad = async ({fetch, params}) => {
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
  }
};