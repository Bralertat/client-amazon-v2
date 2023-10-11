import React from 'react';

const loaderStyles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  loader: {
    border: '4px solid rgba(0, 0, 0, 0.3)',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 2s linear infinite',
  },
};

const Loader: React.FC = () => {
  return (
    <div style={loaderStyles.container}>
      <div style={loaderStyles.loader}></div>
    </div>
  );
};

export default Loader;
