import { sql } from "drizzle-orm";
import { timestamp as rawTs } from "drizzle-orm/mysql-core";
import { customAlphabet } from "nanoid";
import bcrypt from "bcrypt";

export const id = () => {
  const nanoid = customAlphabet("1234567890abcdef", 10);
  return nanoid();
};

export const timestamp = (name: string) =>
  rawTs(name, {
    fsp: 3,
    mode: "date",
  });

export const timestamps = {
  timeCreated: timestamp("time_created").notNull().defaultNow(),
  timeUpdated: timestamp("time_updated")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)`),
  timeDeleted: timestamp("time_deleted"),
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};
