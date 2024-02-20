import React from 'react'

function Users() {
  return (
    <div>
        <h1>Users</h1>
        <table>
        <thead>
            <tr>
                <th>name</th>
                <th>max actions</th>
                <th>remaining actions for today</th>
            </tr>
        </thead>
        <tbody>
        {
            users.map((user)=>{
                return (
                    <tr>
                        <td>{user.name}</td>
                        <td>{user.maxActions}</td>
                        <td>{user.actionsAllowed}</td>
                    </tr>
                )
            })
        }
        </tbody>
        </table>
    </div>
  )
}

export default Users