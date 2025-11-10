import React, { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    document.title = 'Arsh Jain | Home';
  }, []);

  return (
    <div className="about-section">
      <div className="about-image">
        <img src="/arshjain_portfolio_image.png" alt="Arsh Jain" className="profile-pic" />
      </div>
      <div className="about-text">
        <p>
          Hi! I'm Arsh, a software engineer who enjoys building and maintaining large-scale systems.
        </p>
        <p>
          I love experimenting with new tech and going down rabbit holes. Trying to using this space to document what I learn and build along the way.
        </p>
        <p>
         Off-screen, I love classic rock, airplanes, and trying to stay fit.
        </p>
        <p>
          Do check out the Blog section, you might find something interesting! Also, feel free to reach out!
        </p>
      </div>
    </div>
  );
};

export default Home;