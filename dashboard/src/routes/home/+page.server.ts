import type { PageServerLoad } from "./$types";

import { FUNCTIONS_KEY } from "$env/static/private";

export const load: PageServerLoad = async ({fetch}) => {
  const res = await fetch(`https://nwhofapi.azurewebsites.net/api/nominations`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  if (res.ok) {
    const nominations = await res.json();
    return {
      props: {nominations: nominations}
    };
  }
}