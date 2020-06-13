import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { setAccessToken } from '../accessToken'
import { useLoginMutation } from '../generated/graphql'

interface Props {}

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [login] = useLoginMutation()



    return <form onSubmit={async e => {
        e.preventDefault()
        try {
            const { data } = await login({
                variables: {
                    email, password
                }
            })
            console.log({ data })
            setEmail('')
            setPassword('')
            if (data) {
                setAccessToken(data.login.accessToken)
            }
            history.push('/')
        } catch (err) {
            console.log(err)
        }
    }}>
        <div className='register-inputs'>
            <input
                type='email'
                name='email'
                id='email-input'
                value={ email }
                placeholder='email'
                onChange={({ target }) => {
                    setEmail(target.value)
                }}
            />
            <input
                type='password'
                name='password'
                id='password-input'
                value={ password }
                placeholder='password'
                onChange={({target}) => {
                    setPassword(target.value)
                }}
            />
        </div>
        <button type='submit'>Login</button>
    </form>
}