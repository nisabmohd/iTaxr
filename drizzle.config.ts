import { defineConfig } from "drizzle-kit";

export default defineConfig({
	strict: true,
	verbose: true,
	out: "./db/migration",
	dialect: "mysql",
	dbCredentials: {
		url: `mysql://root:root@localhost:3306/tax_schema`,
	},
	schema: "./core/**/*.sql.ts",
});
