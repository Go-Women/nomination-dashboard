import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, params }) => {
  const res = await fetch(`http://localhost:8000/matches`);
  if (res.ok) {
    const matches = await res.json();
    return {
      props: { matches: matches }
    };
  }
};