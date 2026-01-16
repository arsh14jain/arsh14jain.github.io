import React from 'react';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-links">
        <ul>
          <li>
            <a href="https://github.com/arsh14jain" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 3c0-1.33-2.69-1.33-2.69-1.33L12 6l-2.21-2.92c0 0-2.69 0-2.69 1.33a5.07 5.07 0 0 0-.09 1.77A5.44 5.44 0 0 0 2 10.78c0 4.43 3.3 5.61 6.44 7A3.37 3.37 0 0 0 9 19c0 3.87 0 6 0 6"></path>
              </svg>
              <span>github</span>
            </a>
          </li>
          <li>
            <a href="https://linkedin.com/in/arsh14jain" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              <span>linkedin</span>
            </a>
          </li>
          <li>
            <a href="mailto:arshjain99@gmail.com" aria-label="Email">
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>email</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-motto">
        be kind. stay curious.
      </div>
    </footer>
  );
};

export default Footer;