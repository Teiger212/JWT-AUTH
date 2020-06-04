import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import "dotenv/config";
import express from 'express';
import { verify } from 'jsonwebtoken';
import "reflect-metadata";
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { createAccessToken, createRefreshToken } from './auth';
import { User } from './entity/User';
import { sendRefreshToken } from './sendRefreshToken';
import { UserResolver } from './UserResolver';

(async () => {
    const app = express()
    app.use(cookieParser())

    app.post('/refresh_token', async (req, res) => {
        const token = req.cookies.jid
        if (!token) {
            return res.send({ ok: false, accessToken: '' })
        }
        let payload = null;

        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET!) as any
        } catch (err){
            console.log(err)
            return res.send({ ok: false, accessToken: '' })
        }

        const user = await User.findOne({ id: payload.userId })

        if (!user) {
            return res.send({ ok: false, accessToken: '' })
        }

        if (user.tokenVersion !== payload.tokenVersion) {
            return res.send({ ok: false, accessToken: '' })
        }

        sendRefreshToken(res, createRefreshToken(user))
        
        return res.send({ ok: true, accessToken: createAccessToken(user)})
    })

    await createConnection()

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver]
        }),
        context: ({ req, res }) => ({ req, res })
    })

    apolloServer.applyMiddleware({ app })
    app.listen(4000, () => {
        console.log('express server started')
    })
})()
