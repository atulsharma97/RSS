import React from 'react'
import { Link } from 'react-router-dom'
import Registration from '../../../components/Registration'

const UserCreate = () => {
  return (
    <>
      <ul className="nav-style1">
        <li>
          <Link to="/dashboard">
            <a>Users</a>
          </Link>
        </li>
        <li>
          <Link to="/dashboard/create-users">
            <a className="active">Create</a>
          </Link>
        </li>
      </ul>

      <Registration />
    </>
  )
}

export default UserCreate
