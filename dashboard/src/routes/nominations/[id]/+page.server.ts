import type { Actions, PageServerLoad } from "./$types";

import { FUNCTIONS_KEY } from "$env/static/private";

export const load: PageServerLoad = async ({fetch, params}) => {
  const res = await fetch(`https://nwhofapi.azurewebsites.net/api/nominations/${params.id}`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  const res2 = await fetch(`https://nwhofapi.azurewebsites.net/api/keys`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  if (res.ok) {
    const nomination = await res.json();
    const keys = await res2.json();
    return {
      props: {n: nomination, keys}
    };
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