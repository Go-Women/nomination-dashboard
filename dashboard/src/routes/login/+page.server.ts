import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {

  default: async ({ request, cookies }) => {
    const formData = await request.formData();
    const data: { [name: string]: any } = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    cookies.set('user', data['firebaseID'], { path: '/'});
    throw redirect(301, '/home');
  }
};