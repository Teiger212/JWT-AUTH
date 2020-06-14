import React from 'react'
import { useByeQuery } from "../generated/graphql"

interface Props {}

export const Bye: React.FC<Props> = () => {
    const { data, error, loading } = useByeQuery({
        fetchPolicy: 'network-only'
    })
    
    if (loading) {
        return <h2>Loading...</h2>
    }
    if (error) {
        console.log(error)
        return <h2>Error</h2>
    }

    if (!data) {
        return  <h2>No Data</h2>
    }
    return (
        <div>
            { data.bye }
        </div>
    )
}