import React, { useEffect } from 'react';

const miscItems = [
  {
    name: 'Latitudes',
    description: 'Places in the world I had no idea existed — and loved finding out about.',
    link: 'https://arshja.in/latitudes',
    external: true,
  },
];

const Misc = () => {
  useEffect(() => {
    document.title = 'Misc | Arsh Jain';
  }, []);

  return (
    <div className="misc-page">
      <h1 className="misc-title">Misc</h1>
      <div className="misc-list">
        {miscItems.map(item => (
          <a
            key={item.name}
            href={item.link}
            className="misc-item"
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
          >
            <span className="misc-item-name">{item.name}</span>
            <p className="misc-item-description">{item.description}</p>
            {item.external && (
              <span className="misc-item-external">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Misc;
