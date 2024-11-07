import { timestamps } from "@/lib/sql";
import { mysqlTable, varchar, boolean, char } from "drizzle-orm/mysql-core";

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
});

// Indexes for optimizing queries
export const usersIndex = {
  idIndex: "CREATE INDEX id_idx ON users (id)",
  emailIndex: "CREATE INDEX email_idx ON users (email)",
  phoneIndex: "CREATE INDEX phone_idx ON users (phone_number)",
  roleIndex: "CREATE INDEX role_idx ON users (role)",
};
