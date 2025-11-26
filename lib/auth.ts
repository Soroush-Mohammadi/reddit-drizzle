// src/utils/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../src/db";

export const auth = betterAuth({

    secret : process.env.AUTH_SECRET,
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
    }),

    emailAndPassword : {
        enabled  : true,
        async sendResetPassword(url, user) {
			console.log("Reset password url:", url);
		},
    }
});



