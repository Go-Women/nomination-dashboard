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
    const res = await fetch('http://localhost:8000/judges', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    .then(res => res.json())
    .then(res => console.log(res));
  } 
};