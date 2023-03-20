import { exit } from "process";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({fetch, params}) => {
  console.log('settings page loading');
  const res = await fetch('http://localhost:8000/settings');
  console.log('past settings fetch');
  if (res.ok) {
    const cohorts = await res.json();
    console.log(cohorts);
    return {
      props: {cohorts: cohorts}
    };
  }
};

// export const actions: Actions = {
//   default: async ({request}) => {
//     const formData = await request.formData();
//     const data: { [name: string]: any } = {};

//     for (let field of formData) {
//       const [key, value] = field;
//       switch (key) {
        
//       }        
//     }
//     const res = await fetch('http://localhost:8000/settings', {
//       method: 'POST',
//       body: JSON.stringify(data),
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//       }
//     })
//     .then(res => res.json())
//     .then(res => console.log(res));
//   } 
// };