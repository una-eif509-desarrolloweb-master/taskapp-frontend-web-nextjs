import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        // ...add more providers here
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: {label: "Username", type: "text", placeholder: "mike"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials, req) {
                const {username, password} = credentials;
                const res = await fetch("http://localhost:8080/v1/users/login", {
                    method: "POST",
                    body: JSON.stringify({username, password}),
                    headers: {"Content-Type": "application/json"}
                })

                const user = await res.json();
                if (res.ok && user) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],

    session: {
        strategy: "jwt"
    }
}

export default NextAuth(authOptions)