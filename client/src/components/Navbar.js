import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/actionTypes";

const Navbar = ({ user }) => {
  const isAuth = useSelector((state) => state.userReducer.isAuth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="NavDiv">
      <nav className="blend">
        <ul>
          <Link to="/">
            <li className="homeLink">
              <button className="homeLink">home</button>
            </li>
          </Link>
          <Link to="/">
            <li className="aboutLink">
              <button className="aboutLink">about</button>
            </li>
          </Link>
          <Link to="/ebooks">
            <li>
              <button>Ebooks</button>
            </li>
          </Link>

          {!isAuth ? (
            <>
              <Link to="/register">
                <li>
                  <button>sinUp</button>
                </li>
              </Link>
              <Link to="/login">
                <li>
                  <button>signin</button>
                </li>
              </Link>
            </>
          ) : (
            // ) : !isAuth && isAdmin ? (
            //   <>
            //     <Link to="/admin">
            //       <li>
            //         <button>admin</button>
            //       </li>
            //     </Link>
            //     <Link to="/login">
            //       <li>
            //         <button onClick={handleLogout}>logout</button>
            //       </li>
            //     </Link>
            //   </>
            <>
              <Link to="/profile">
                <li>
                  <button>profile</button>
                </li>
              </Link>
              <Link to="/login">
                <li>
                  <button onClick={handleLogout}>logout</button>
                </li>
              </Link>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
