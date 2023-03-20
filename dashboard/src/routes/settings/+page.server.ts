import { exit } from "process";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({fetch, params}) => {
  console.log('settings page loading');
  const res = await fetch('http://localhost:8000/settings');
  console.log('past settings fetch');
  if (res.ok) {
    const cohort = await res.json();
    return {
      props: {cohort: cohort}
    };
  }
};

export const actions: Actions = {
  default: async ({request, params}) => {console.log('default action');}
};