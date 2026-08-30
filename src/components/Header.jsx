import { useState } from 'react';
import { Link } from 'react-router-dom'

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="header">
            {/* Logo */}
            <div>
                <Link className="flex items-center gap-5" to="/">
                    <img
                        src={"/Logo/keytofive_logo.png"}
                        alt="Key to Five logo"
                        style = {{ width: "auto", height: "50px" }}
                    />
                    <h4> Key to Five </h4>
                </Link>
            </div>
            {/* Hamburger Menu */}
            <button
                className="hamburgerMenu"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation menu"
            >
                ☰
            </button>

            {/* Navigation buttons */}
            <nav className="navButtons">
                <Link to="/"> Home </Link>
                <Link to="/subjects"> Subjects </Link>
                <Link to="/mission"> Our Mission </Link>
                <Link to="/team"> Meet the Team </Link>
            </nav>

            <nav className={`mobileNav ${menuOpen ? 'menuOpen' : ''}`}>
                <Link to="/" onClick={() => setMenuOpen(false)}>
                    Home
                </Link>
                <Link to="/subjects" onClick={() => setMenuOpen(false)}>
                    Subjects
                </Link>
                <Link to="/mission" onClick={() => setMenuOpen(false)}>
                    Our Mission
                </Link>
                <Link to="/team" onClick={() => setMenuOpen(false)}>
                    Meet the Team
                </Link>
            </nav>
        </header>
    )
}