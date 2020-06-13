import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useRegisterMutation } from '../generated/graphql'

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [register] = useRegisterMutation()



    return <form onSubmit={async e => {
        e.preventDefault()
        try {
            const { data : isRegistered } = await register({
                variables: {
                    email, password
                }
            })
            console.log({ isRegistered })
            setEmail('')
            setPassword('')
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
        <button type='submit'>Register</button>
    </form>
}