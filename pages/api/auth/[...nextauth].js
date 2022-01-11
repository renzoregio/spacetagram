import NextAuth from "next-auth"
import Auth0Provider from "next-auth/providers/auth0";

const options = {
    secret: process.env.AUTH0_CLIENT_SECRET,
    providers: [    
        Auth0Provider({
          clientId: process.env.AUTH0_CLIENT_ID,
          clientSecret: process.env.AUTH0_CLIENT_SECRET,
          issuer: process.env.AUTH0_ISSUER,
        })
      ]
}

const auth = (req, res) => NextAuth(req, res, options)
export default auth;