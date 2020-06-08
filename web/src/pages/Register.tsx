import React, { useState } from 'react'

interface Props {}

export const Register: React.FC<Props> = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return <form>
        <div className='register-inputs'>
            <input
                type='email'
                name='email'
                id='email-input'
                value={ email }
                placeholder='email'
                onChange={({target}) => {
                    setEmail(target.value)
                }}
            />
            <input
                type='password'
                name='password'
                id='password-input'
                value={ email }
                placeholder='password'
                onChange={({target}) => {
                    setPassword(target.value)
                }}
            />
        </div>
        <button type='submit'>Register</button>
    </form>
}