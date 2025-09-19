import React from 'react'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function AuthLink({ isLoggedIn, handleLogout }) {
    return (
        <div className="flex items-center space-x-[5px] capitalize cursor-pointer transition duration-200 hover:text-[var(--havericon)]">
            {isLoggedIn ? (
                <>
                    <FaSignOutAlt onClick={handleLogout} size={30} className="transition duration-300 text-[var(--bg-colorA)] hover:text-[var(--bgtext-coler)]" />
                    {/* <button onClick={handleLogout} className="transition duration-200 hover:font-bold">
                        logout
                    </button> */}
                </>
            ) : (
                <>
                    <Link to="/login">
                        <FaSignInAlt size={30} className="transition duration-300 text-[var(--bg-colorA)] hover:text-[var(--bgtext-coler)]" />
                    </Link>
                    {/* <Link to="/login" className="transition duration-200 hover:font-bold">
                        login
                    </Link> */}
                </>
            )}
        </div>
    );
}

