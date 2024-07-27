import { cleanEnv, port, str, num } from 'envalid'

const env = {
  PORT: port(),
  NODE_ENV: str(),
  DATABASE_URL_ATLAS: str(),
  DATABASE_URL_LOCAL: str(),
  SESSION_SECRET: str(),
  SALT_WORK_FACTOR: num()
}

// this function is used to validate the enviroment variables
export const validateEnv = () => cleanEnv(process.env, env)

export default cleanEnv(process.env, env)
