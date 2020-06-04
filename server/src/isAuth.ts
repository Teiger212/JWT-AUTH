import { verify } from 'jsonwebtoken'
import { MiddlewareFn } from 'type-graphql'
import { MyContext } from './MyContext'

const notAuthedError = new Error('Not Authenticated')

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
    const auth = context.req.headers['authorization']

    if(!auth) {
        throw notAuthedError
    }

    try {
        const token = auth.split(' ')[1]
        const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!)
        context.payload = payload as any
    } catch(err) {
        console.log(err)
        throw notAuthedError
    }
    return next()
}