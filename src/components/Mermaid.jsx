import React, { useEffect, useRef, useId } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    darkMode: true,
    background: '#1a1a2e',
    primaryColor: '#e2e8f0',
    primaryTextColor: '#e2e8f0',
    lineColor: '#64748b',
    fontSize: '14px',
  },
});

const Mermaid = ({ chart }) => {
  const containerRef = useRef(null);
  const reactId = useId();
  const renderIdRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const currentRender = ++renderIdRef.current;
    const id = `mermaid-${reactId.replace(/:/g, '')}-${currentRender}`;

    // Clean up any previous render
    container.innerHTML = '';

    const renderChart = async () => {
      try {
        const { svg } = await mermaid.render(id, chart);
        // Only apply if this is still the latest render
        if (renderIdRef.current === currentRender && containerRef.current) {
          container.innerHTML = svg;
        }
      } catch (err) {
        console.error('Mermaid render error:', err);
        // Clean up the failed render element mermaid may have left in the DOM
        const failed = document.getElementById('d' + id);
        if (failed) failed.remove();

        if (renderIdRef.current === currentRender && containerRef.current) {
          container.innerHTML = `<pre>${chart}</pre>`;
        }
      }
    };

    renderChart();

    return () => {
      container.innerHTML = '';
    };
  }, [chart, reactId]);

  return <div ref={containerRef} className="mermaid-diagram" />;
};

export default Mermaid;
