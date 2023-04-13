import type { Actions, PageServerLoad } from "./$types";
import { dev } from "$app/environment";

let FUNCTIONS_KEY: string;
if (dev) {
  const { DEFAULT_KEY } = await import("$env/static/private");
  FUNCTIONS_KEY = DEFAULT_KEY;
} else {
  FUNCTIONS_KEY = `${process.env.DEFAULTKEY}`;
}

export const load: PageServerLoad = async ({fetch, params}) => {
  const res = await fetch(`http://localhost:8000/nominations/${params.id}`);
  const res2 = await fetch(`http://localhost:8000/keys`);

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