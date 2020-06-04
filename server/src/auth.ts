import { sign } from 'jsonwebtoken'
import { User } from "./entity/User"

export const createAccessToken = (user: User) => {
    return sign({ userId: user.id }, 'poop', { expiresIn: '2m'})
}

export const createRefreshToken = (user: User) => {
    return sign({ userId: user.id }, 'piss', { expiresIn: '7d'})
}