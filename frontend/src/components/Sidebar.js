import React, { useContext } from "react";
import { MdLocationCity } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import { FaUserEdit } from "react-icons/fa";
import { GiBookmarklet } from "react-icons/gi";
import { RiAdminFill } from "react-icons/ri";
import { FaBriefcase } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import { FaHouseChimney } from "react-icons/fa6";
import { FaCity } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { motion } from "framer-motion";
import "../Sidebar.css";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    window.location.href = "/";
  };
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      {/* <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsCart3 className="icon_header" /> SHOP
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div> */}
      <>
        {userInfo?.data?.role === "mahaNagarAdmin" && (
          <>
            <ul className="sidebar-list">
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <Link to="/">
                  <li className="sidebar-list-item">
                    <MdDashboard className="icon" />
                    कार्यकर्ता
                  </li>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <Link to="/adminsdetail">
                  <li className="sidebar-list-item">
                    <RiAdminFill className="icon" />
                    एडमिन सूची
                  </li>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <Link to="/nagar">
                  <li className="sidebar-list-item">
                    <FaCity className="icon" /> नगर
                  </li>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <Link to="/basti">
                  <li className="sidebar-list-item">
                    <MdLocationCity className="icon" /> बस्ती
                  </li>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <Link to="/shaka">
                  <li className="sidebar-list-item">
                    <FaHouseChimney className="icon" /> शाखा
                  </li>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <Link to="/daitva">
                  <li className="sidebar-list-item">
                    <GrUserWorker className="icon" /> दायित्व
                  </li>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <Link to="/vibhag">
                  <li className="sidebar-list-item">
                    <FaBriefcase className="icon" /> विभाग
                  </li>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <Link to="/shikshan">
                  <li className="sidebar-list-item">
                    <FaGraduationCap className="icon" /> शिक्षण
                  </li>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <Link to="/update-admin">
                  <li className="sidebar-list-item">
                    <FaUserEdit className="icon" />
                    एडमिन प्रोफाइल
                  </li>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <Link to="/" onClick={signoutHandler}>
                  <li className="sidebar-list-item">
                    <FiLogOut className="icon" /> लॉग आउट
                  </li>
                </Link>
              </motion.div>
            </ul>
          </>
        )}
        {userInfo?.data?.role === "nagarAdmin" && (
          <ul className="sidebar-list">
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              <Link to="/">
                <li className="sidebar-list-item">
                  <MdDashboard className="icon" />
                  कार्यकर्ता
                </li>
              </Link>
            </motion.div>
            <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <Link to="/nagar-admins-detail">
                  <li className="sidebar-list-item">
                    <RiAdminFill className="icon" />
                    एडमिन सूची
                  </li>
                </Link>
              </motion.div>
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              <Link to="/nagar-details">
                <li className="sidebar-list-item">
                  <GiBookmarklet className="icon" />
                  नगर विवरण
                </li>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              <Link to="/daitva">
                <li className="sidebar-list-item">
                  <GrUserWorker className="icon" /> दायित्व
                </li>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              <Link to="/vibhag">
                <li className="sidebar-list-item">
                  <FaBriefcase className="icon" /> विभाग
                </li>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              <Link to="/shikshan">
                <li className="sidebar-list-item">
                  <FaGraduationCap className="icon" /> शिक्षण
                </li>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              <Link to="/update-admin">
                <li className="sidebar-list-item">
                  <FaUserEdit className="icon" />
                  एडमिन प्रोफाइल
                </li>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              <Link to="/" onClick={signoutHandler}>
                <li className="sidebar-list-item">
                  <FiLogOut className="icon" /> लॉग आउट
                </li>
              </Link>
            </motion.div>
          </ul>
        )}
        {userInfo?.data?.role === "bastiAdmin" && (
          <ul className="sidebar-list">
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              <Link to="/">
                <li className="sidebar-list-item">
                  <MdDashboard className="icon" />
                  कार्यकर्ता
                </li>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              <Link to="/basti-details">
                <li className="sidebar-list-item">
                  <GiBookmarklet className="icon" />
                  बस्ती विवरण
                </li>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              <Link to="/daitva">
                <li className="sidebar-list-item">
                  <GrUserWorker className="icon" /> दायित्व
                </li>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              <Link to="/vibhag">
                <li className="sidebar-list-item">
                  <FaBriefcase className="icon" /> विभाग
                </li>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              <Link to="/shikshan">
                <li className="sidebar-list-item">
                  <FaGraduationCap className="icon" /> शिक्षण
                </li>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              <Link to="/update-admin">
                <li className="sidebar-list-item">
                  <FaUserEdit className="icon" />
                  एडमिन प्रोफाइल
                </li>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              <Link to="/" onClick={signoutHandler}>
                <li className="sidebar-list-item">
                  <FiLogOut className="icon" /> लॉग आउट
                </li>
              </Link>
            </motion.div>
          </ul>
        )}
      </>
    </aside>
  );
}

export default Sidebar;
