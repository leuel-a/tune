import { cleanEnv, port, str, num } from 'envalid'

const env = {
  PORT: port(),
  NODE_ENV: str(),
  DATABASE_URL_ATLAS: str(),
  DATABASE_URL_LOCAL: str(),
  SESSION_SECRET: str(),
  SALT_WORK_FACTOR: num(),
  JWT_SECRET: str(),
  ACCESS_TOKEN_TTL: str(),
  REFRESH_TOKEN_TTL: str()
}

// this function is used to validate the enviroment variables
export const validateEnv = () => cleanEnv(process.env, env)

export default cleanEnv(process.env, env)
