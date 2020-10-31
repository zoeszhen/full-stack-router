import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUserList } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const UserList = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setUserList())
    }, [])

    return (
        <>
            <h1>Users</h1>
            <div>
                {
                    user.userList.length > 0 ?
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Blogs</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        user.userList
                                            .map(({ name, blogs, id }) =>
                                                <tr key={id}>
                                                    <td><Link to={`/user/${id}`}>{name}</Link></td>
                                                    <td>{blogs.length}</td>
                                                </tr>
                                            )
                                    }
                                </tbody>
                            </table>
                        </div> :
                        <div>loading</div>
                }
            </div>

        </>
    )
}

export default UserList