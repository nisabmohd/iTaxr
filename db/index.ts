import { drizzle } from "drizzle-orm/mysql2";

export const db = drizzle("mysql://root:root@localhost:3306/tax_schema");

