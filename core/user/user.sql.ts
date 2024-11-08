import { timestamps } from "@/lib/sql";
import { relations } from "drizzle-orm";
import { mysqlTable, varchar, boolean, char, index, uniqueIndex } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: char("id", { length: 10 }).primaryKey(),
  ...timestamps,
  firstName: varchar("first_name", { length: 100 }).notNull(),
  middleName: varchar("middle_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
  alternatePhoneNumber: varchar("alternate_phone_number", { length: 20 }).default(''),
  employeeName: varchar("employee_name", { length: 100 }).default(''),
  officeNumber: varchar("office_number", { length: 20 }).default(''),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull().default("user"),
}, (table) => {
  return {
    idIdx: index("id_idx").on(table.id),
    emailIdx: uniqueIndex("email_idx").on(table.email),
    phoneIdx: uniqueIndex("phone_idx").on(table.phoneNumber),
    roleIdx: index("role_idx").on(table.role),
  }
});
