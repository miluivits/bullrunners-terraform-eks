import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import { Link } from 'react-router-dom';
import './Footer.css';
import bullrunnersLogo from '../../images/logo.png';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <img src={bullrunnersLogo} alt="Bullrunners logo" className="footer-logo" />
      </div>

      <div className="footer-links-socials">

        <div className="footer-socials">
          <a href="https://www.instagram.com/bullrunners.hu/" target="_blank" rel="noreferrer" className="icon--instagram"><FaInstagram /></a>
          <a href="https://www.facebook.com/bullrunners" target="_blank" rel="noreferrer"><FaFacebookF /></a>
          <a href="https://www.tiktok.com/@bullrunners" target="_blank" rel="noreferrer"><SiTiktok /></a>
          <a href="https://www.youtube.com/@Bullrunners" target="_blank" rel="noreferrer" className="icon--youtube"><FaYoutube /></a>
        </div>
      </div>

      <p className="copyright">© 2025 Bullrunners. All rights reserved.</p>
    </footer>
  );
}
