import { dev } from "$app/environment";
import type { LayoutServerLoad } from "./$types";

let FUNCTIONS_KEY: string;
if (dev) {
  const { DEFAULT_KEY } = await import("$env/static/private");
  FUNCTIONS_KEY = DEFAULT_KEY;
} else {
  FUNCTIONS_KEY = `${process.env.DEFAULTKEY}`;
}

export const load: LayoutServerLoad = async ({ fetch, cookies }) => {
  const user = cookies.get('user');
  if (!user) return {
    props: {userType: 'none'}
  };
  const authRes = await fetch(
    `https://nwhofapi.azurewebsites.net/api/getuserbyfirebaseid/${user}`, { headers: { 'x-functions-key': FUNCTIONS_KEY } }
  );
  if (authRes.ok) {
    let authInfo = (await authRes.json())[0];
    if (authInfo['type'] === 'judge') {
      return {
        props: {userType: 'judge'}
      };
    } else {
      return {
        props: {userType: 'admin'}
      };
    }
  } else {
    return {
      props: {userType: 'none'}
    };
  }
}