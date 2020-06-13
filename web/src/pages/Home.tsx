import React from 'react'
import { useUsersQuery } from '../generated/graphql'

interface Props {}
interface User {
    id: number;
    email: string;
}

const renderUsers = (users: User[]) => users.map(({ id, email }) => (
    <li key={id}>
        Username:  { email }, ID: { id }
    </li>
))

export const Home: React.FC<Props> = () => {
    const { data } = useUsersQuery({ fetchPolicy: 'network-only'})

    if(!data) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <h1>Users</h1>
            <ul>
                { renderUsers(data.users) }
            </ul>
        </div>
    )
}