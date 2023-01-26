import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({request}) => {
    const formData = await request.formData();
    const data: { [name: string]: any } = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    console.log(data);
    // const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    //   method: 'POST',
    //   body: JSON.stringify({
        
    //   }),
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8',
    //   }
    // });
    // if (res.ok) {
    //   // console.log(res);
    // } else {
    //   // console.log('Failed! :(');
    // }
  }
};