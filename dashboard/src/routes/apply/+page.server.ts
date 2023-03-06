import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({request}) => {
    const formData = await request.formData();
    const data: { [name: string]: any } = {};
    const info: { [name: string]: any } = {};

    const pronouns = ["She/Her", "He/Him", "They/Them", "Other"];

    for (let field of formData) {
      const [key, value] = field;
      switch (key) {
        case "pronouns":
          info[key] = pronouns[value];
          data["info"] = info;
          break;
        case "email":
          data[key] = value;
          break;
        case "firstName":
          data[key] = value;
          break;
        case "lastName":
          data[key] = value;
          break;
        default:
          info[key] = value;
          data["info"] = info;
          break;
      }        
    }

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