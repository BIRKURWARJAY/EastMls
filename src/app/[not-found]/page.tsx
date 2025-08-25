'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

const Custom404 = (): ReactNode => {
  return (
    <div style={styles?.body}>
      <div style={styles?.stars} className="stars" />
      <div style={styles?.center}>
        <div style={styles.astronaut} className="astronaut" />
        <h1 style={styles.h1}>404</h1>
        <p style={styles.p}>Oops! Looks like you're lost in space.</p>
        {/* Using Next.js Link component for internal navigation */}
        <Link href="/" passHref style={styles.button}>
          Go back
        </Link>
      </div>

      <style>{`
        @keyframes moveStars {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 10000px 5000px;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .stars {
          width: 100%;
          height: 100%;
          background: transparent url('https://assets.codepen.io/1538474/stars.png') repeat top center;
          animation: moveStars 100s linear infinite;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 0;
        }

        .astronaut {
          background: url('https://assets.codepen.io/1538474/astronaut.png') no-repeat center;
          background-size: contain;
          width: 150px;
          height: 150px;
          margin: 0 auto 30px;
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// Inline styles for simplicity
const styles = {
  body: {
    background: '',
    height: '100vh',
    overflow: 'hidden',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#fff',
    position: 'relative',
  } as React.CSSProperties,
  center: {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
    paddingTop: '10%',
  } as React.CSSProperties,
  h1: {
    fontSize: '6rem',
    marginBottom: '10px',
  } as React.CSSProperties,
  p: {
    fontSize: '1.2rem',
    marginBottom: '30px',
    color: '#c0c0c0',
  } as React.CSSProperties,
  button: {
    display: 'inline-block',
    padding: '12px 25px',
    background: '#1f6feb',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    transition: 'background 0.3s ease',
  } as React.CSSProperties,
  astronaut: {}, // Controlled via CSS animation
  stars: {},     // Controlled via CSS animation
};

export default Custom404;
