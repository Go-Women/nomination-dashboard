import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async () => {
    throw redirect(301, '/login');
  }
};