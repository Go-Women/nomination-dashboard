import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({fetch, params}) => {
  const res = await fetch(`http://localhost:8000/nominations/${params.id}`);
  if (res.ok) {
    const nomination = await res.json();
    return {
      props: {n: nomination}
    };
  }
};

export const actions: Actions = {
  createNomination: async ({request}) => {
    const data = await request.formData();
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: data.get('title'),
        body: data.get('body'),
        userId: data.get('userId')
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    });
    if (res.ok) {
      // console.log(res);
    } else {
      // console.log('Failed! :(');
    }
  }
};