import React from 'react'
import { useSelector } from 'react-redux'
import {
    useParams
} from "react-router-dom"

const User = () => {
    const id = useParams().id
    const user = useSelector(state => state.user.userList).find(({ id }) => id === id)
    console.log("user", user)
    return (
        <>
            {
                user ?
                    <>
                        <div>{user.name}</div>
                        <h2>added blogs</h2>
                        {
                            user.blogs.map(({ title }) => <div>{title}</div>)
                        }
                    </> :
                    null
            }

        </>
    )
}

export default User