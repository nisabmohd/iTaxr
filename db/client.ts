import mysql from 'mysql2/promise';
import { drizzle, MySql2DrizzleConfig } from "drizzle-orm/mysql2";
import * as schema from '../core/user/user.sql'

const poolConnection = mysql.createPool(process.env.DATABASE_URL!);

type Schema = typeof schema;

const config: MySql2DrizzleConfig<Schema> = {
  schema: schema,
  logger: true,
  mode: 'default'
};
export const db = drizzle(poolConnection, config);

export type db = typeof db

export default db