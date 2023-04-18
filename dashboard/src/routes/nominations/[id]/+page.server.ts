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
  const res = await fetch(`https://nwhofapi.azurewebsites.net/api/nominations/${params.id}`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  const res2 = await fetch(`https://nwhofapi.azurewebsites.net/api/keys`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  if (res.ok && res2.ok) {
    const nomination = await res.json();
    const keys = await res2.json();
    return {
      props: {n: nomination, keys}
    };
  } else {
    if (!res.ok) {
      if (res.status == 404) throw error(404, `The requested page does not exist on this server.`);
      else throw error(res.status, 'An error occured while fetching nomination data for this page.');
    }
    if (!res2.ok) throw error(res2.status, 'An error occured while fetching keys data for this page.');
  }
};

// export const actions: Actions = {
//   createNomination: async ({request}) => {
//     const data = await request.formData();
//     const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
//       method: 'POST',
//       body: JSON.stringify({
//         title: data.get('title'),
//         body: data.get('body'),
//         userId: data.get('userId')
//       }),
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//       }
//     });
//     if (res.ok) {
//       // console.log(res);
//     } else {
//       // console.log('Failed! :(');
//     }
//   }
// };