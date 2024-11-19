import { defineConfig } from "drizzle-kit";

export default defineConfig({
  strict: true,
  verbose: false,
  out: "./db/migration",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  schema: "./core/**/*.ts",
});
