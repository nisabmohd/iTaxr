import { timestamps } from "@/lib/sql";
import { mysqlTable, varchar, boolean, char, index } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: char("id", { length: 10 }).primaryKey(),
  ...timestamps,
  firstName: varchar("first_name", { length: 100 }).notNull(),
  middleName: varchar("middle_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
  officeNumber: varchar("office_number", { length: 20 }),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull().default("user"),
}, {
  indexes: [
    index("id_idx").on("id"),
    index("email_idx").on("email"),
    index("phone_idx").on("phoneNumber"),
    index("role_idx").on("role"),
  ],
});
