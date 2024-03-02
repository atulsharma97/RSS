import React, { useContext } from 'react'
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { Store } from '../Store'
import { FiLogOut } from 'react-icons/fi'
import { MdDashboard } from 'react-icons/md'
import { HiClipboardList, HiUserGroup } from 'react-icons/hi'
import { motion } from 'framer-motion'

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' })
    localStorage.removeItem('userInfo')
    window.location.href = '/'
  }
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? 'sidebar-responsive' : ''}
    >
      {/* <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsCart3 className="icon_header" /> SHOP
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div> */}

      <ul className="sidebar-list">
        <motion.li
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{ scale: 0.9 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 10,
          }}
        >
          <Link to="/dashboard">
            <li className="sidebar-list-item">
              <MdDashboard className="icon" /> Dashboard
            </li>
          </Link>
        </motion.li>
        {/* <motion.li
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{ scale: 0.9 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 10,
          }}
        >
          <Link to="/dashboard">
            <li className="sidebar-list-item">
              <MdDashboard className="icon" /> Nagar
            </li>
          </Link>
        </motion.li>
        <motion.li
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{ scale: 0.9 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 10,
          }}
        >
          <Link to="/dashboard">
            <li className="sidebar-list-item">
              <MdDashboard className="icon" /> Basti
            </li>
          </Link>
        </motion.li>
        <motion.li
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{ scale: 0.9 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 10,
          }}
        >
          <Link to="/dashboard">
            <li className="sidebar-list-item">
              <MdDashboard className="icon" /> Sakha
            </li>
          </Link>
        </motion.li> */}

        <motion.li
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{ scale: 0.9 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 10,
          }}
        >
          <Link to="/" onClick={signoutHandler}>
            <li className="sidebar-list-item">
              <FiLogOut className="icon" /> Logout
            </li>
          </Link>
        </motion.li>

        {/* <motion.li
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{ scale: 0.9 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 10,
          }}
        >
          <Link
            to="/agent"
            // className={`${theme}-text-decoration-none`}
            // onClick={handlSmallScreeneClick}
          >
            <li>
              <HiUserGroup className="me-3 fs-5" />
              Agent
            </li>
          </Link>
        </motion.li> */}
        {/*<li className="sidebar-list-item">
          <a href="">
            <BsFillGrid3X3GapFill className="icon" /> Categories
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsPeopleFill className="icon" /> Customers
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsListCheck className="icon" /> Inventory
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsMenuButtonWideFill className="icon" /> Reports
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsFillGearFill className="icon" /> Setting
          </a>
        </li> */}
      </ul>
    </aside>
  )
}

export default Sidebar
