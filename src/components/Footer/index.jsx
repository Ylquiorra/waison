import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__body">
          <div className="footer__title">Subscribe to our news</div>
          <form action="#" className="footer__form">
            <input type="email" name="email" placeholder="Enter your email..." required />
            <button>Subscribe</button>
          </form>
          <div className="footer__link">
            <ul>
              <li>
                <a href="#">Shop</a>
              </li>
              <li>
                <a href="#">Journal</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
