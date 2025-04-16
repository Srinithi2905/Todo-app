
import { useState } from 'react';
import './App.css';
import Home from './components/Home';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle light/dark mode
  const toggleMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (

    <div className={`min-h-screen relative ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-blue-100 to-purple-200'} p-4 sm:p-6`}>

      <button
        onClick={toggleMode}
        className={`text-white p-2 rounded-lg transition duration-300 
      ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-purple-500 hover:bg-purple-600'}
      lg:absolute lg:top-6 lg:right-6 
      mb-4 lg:mb-0 ml-auto block`}
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      <div className="max-w-7xl mx-auto lg:pt-8">
        <Home darkMode={darkMode} />
      </div>
    </div>
  );
}

export default App;

