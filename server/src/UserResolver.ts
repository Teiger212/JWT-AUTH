import { compare, hash } from 'bcryptjs'
import { Arg, Ctx, Field, Int, Mutation, ObjectType, Query, Resolver, UseMiddleware } from 'type-graphql'
import { getConnection } from 'typeorm'
import { createAccessToken, createRefreshToken } from './auth'
import { User } from './entity/User'
import { isAuth } from './isAuth'
import { MyContext } from './Mycontext'
import { sendRefreshToken } from './sendRefreshToken'

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string
}

@Resolver()
export class UserResolver {
    @Query(() => String)
    @UseMiddleware(isAuth)
    bye(
        @Ctx() { payload }: MyContext
    ) {
        return `bye ${ payload!.userId }`
    } 

    @Query(() =>  [User])
    users() {
        return User.find()
    }

    @Mutation(() => Boolean)
    async revokeRefreshTokenForUser(@Arg('userId', () => Int) userId: number) {
        await getConnection()
            .getRepository(User)
            .increment({ id: userId }, 'tokenVersion', 1)

        return true
    }

    @Mutation(() => LoginResponse )
    async login(
        @Arg('email') email : string,
        @Arg('password') password : string,
        @Ctx() { res }: MyContext
    ): Promise<LoginResponse> {
        const user = await User.findOne({ where: { email } })

        if (!user) {
            throw new Error('User not found')
        }

        const valid = await compare(password, user.password)

        if (!valid) {
            throw new Error('Bad password')
        }   
        // login succesful
        sendRefreshToken(res, createRefreshToken(user))

        return {
            accessToken: createAccessToken(user)
        }
    }

    @Mutation(() => Boolean)
    async register(
        @Arg('email') email : string,
        @Arg('password') password : string
    ) {
        const hashedPassword = await hash(password, 12)
        try {
            await User.insert({
                email,
                password: hashedPassword
            })
        } catch (err) {
            console.log(err)
            return false
        }
        
        return true;
    }
}
