import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, params }) => {
  const res = await fetch(`http://localhost:8000/matches/${params.id}`);
  if (res.ok) {
    const match = await res.json();
    return {
      props: { m: match }
    };
  }
};