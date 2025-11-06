import React from 'react';

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.logo}> MovieApp</h1>
      <ul style={styles.navLinks}>
        <li style={styles.link}>Home</li>
        <li style={styles.link}>Genres</li>
        <li style={styles.link}>Top Picks</li>
        <li style={styles.link}>About</li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    background: '#3c6dc7ff',
    color: 'white',
    fontSize:'22px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 40px',
    top: 0,
    zIndex: 10,
  },
  logo: {
    fontSize: '1.8rem',
    fontWeight: '600',
    fontFamily: 'Poppins, sans-serif',
  },
  navLinks: {
    display: 'flex',
    listStyle: 'none',
    gap: '25px',
    margin: 0,
    padding: 0,
  },
  link: {
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
  },
};

export default Navbar;
