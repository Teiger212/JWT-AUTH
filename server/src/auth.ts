import { sign } from 'jsonwebtoken';
import { User } from "./entity/User";


export const createAccessToken = (user: User) => {
    return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '2m'})
}

export const createRefreshToken = (user: User) => {
    const { id, tokenVersion } = user
    return sign({ userId: id, tokenVersion }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d'})
}