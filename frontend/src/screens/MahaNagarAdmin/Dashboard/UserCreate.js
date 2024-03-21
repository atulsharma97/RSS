import React from "react";
import { Link } from "react-router-dom";
import Registration from "../../../components/Registration";

const UserCreate = () => {
  return (
    <>
      <ul className="nav-style1">
        <li>
          <Link to="/">
            <a>कार्यकर्ता</a>
          </Link>
        </li>
        <li>
          <Link to="/dashboard/create-users">
            <a className="active">जोड़ें</a>
          </Link>
        </li>
      </ul>

      <Registration />
    </>
  );
};

export default UserCreate;
