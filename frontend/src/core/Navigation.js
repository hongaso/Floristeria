import React from 'react';
import { Link } from 'react-router-dom';
import { NavItem } from 'reactstrap';
import { isAuthenticated, signout } from './apiCore';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#ff9900' }
    }
    else {
        return { color: '#ffffff' }
    }
}
const Navigation = ({ history }) => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        Flores
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <NavItem className="nav-link">
                                <Link className="nav-link" to="/">
                                    Inicio
                                </Link>
                            </NavItem>
                        </ul>
                        <ul className="navbar-nav">
                            {!isAuthenticated() && (
                                <>
                                    <NavItem className="nav-link">
                                        <Link className="nav-link" to="/signup">
                                            Singup
                                        </Link>
                                    </NavItem>
                                    <NavItem className="nav-link">
                                        <Link className="nav-link" to="/signin">
                                            Login
                                        </Link>
                                    </NavItem>
                                </>
                            )}
                            {isAuthenticated() && (
                                <>
                                    <NavItem className="nav-link">
                                        <Link to={'/'} className="nav-link">Profile</Link>
                                    </NavItem>
                                    <NavItem className="nav-link">
                                        <Link to={'/addcategory'} className="nav-link">Agregar Categoria</Link>
                                    </NavItem>
                                    <NavItem className="nav-link">
                                        <Link to={'/addflores'} className="nav-link">Agregar Flores</Link>
                                    </NavItem>
                                    <NavItem className="nav-link">
                                        <Link
                                            to="/"
                                            onClick={() =>
                                                signout(() => {
                                                    history.push("/");
                                                })} className="nav-link">
                                            Log out
                                        </Link>
                                    </NavItem>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )

}

export default Navigation;