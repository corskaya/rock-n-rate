import packageJson from "../../package.json";

type Env = {
  version: string;
  serverUrl: string;
};

const env: Env = {
  version: packageJson.version,
  serverUrl: import.meta.env.VITE_SERVER_URL,
};

export default env;
