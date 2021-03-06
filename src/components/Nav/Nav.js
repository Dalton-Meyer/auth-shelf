import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
// script.js
import "nes.css/css/nes.min.css";

const Nav = (props) => (
  <div className="nav" class="nes-container is-rounded is-dark">
    <Link to="/home">
      <h2 className="nav-title">Auth Shelf</h2>
    </Link>
    <div
      className="nav-right"
      class="nes-container is-dark with-title is-centered">
      <Link className="nes-btn is-primary" to="/home">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ? "Home" : "Login / Register"}
      </Link>
      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.user.id && (
        <>
          <Link className="nes-btn is-primary" to="/info">
            Info Page
          </Link>
          <LogOutButton className="nes-btn is-primary" />
        </>
      )}
      {/* Always show this link since the about page is not protected */}
      <Link className="nes-btn is-primary" to="/about">
        About
      </Link>
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
