import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({fetch}) => {
  const res1 = await fetch('http://localhost:8000/nominations');
  const res2 = await fetch('http://localhost:8000/nominees')

  if (res1.ok && res2.ok) {
    const nominations = await res1.json();
    const nominees = await res2.json();
    return {
      props: {
        nominations: nominations,
        nominees: nominees
      }
    };
  }
}