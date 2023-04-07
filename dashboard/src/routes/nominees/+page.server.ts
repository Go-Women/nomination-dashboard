import type { Actions, PageServerLoad } from "./$types";

import { FUNCTIONS_KEY } from "$env/static/private";

export const load: PageServerLoad = async ({fetch, params}) => {
  const res = await fetch(`https://nwhofapi.azurewebsites.net/api/nominees`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  if (res.ok) {
    const nominees = await res.json();
    return {
      props: {nominees: nominees}
    };
  }
};