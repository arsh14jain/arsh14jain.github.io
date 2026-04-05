import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Post from './pages/Post';
import Misc from './pages/RabbitHoles';

import './index.css';
import './App.css';
import './styles/main.css';

function GoatCounterTracker() {
  const location = useLocation();
  useEffect(() => {
    if (window.goatcounter && window.goatcounter.count) {
      window.goatcounter.count({ path: location.pathname + location.search });
    }
  }, [location]);
  return null;
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <GoatCounterTracker />
        <Routes>
          <Route
            path="*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/learning" element={<Blog />} />
                  <Route path="/post/:slug" element={<Post />} />
                  <Route path="/misc" element={<Misc />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;