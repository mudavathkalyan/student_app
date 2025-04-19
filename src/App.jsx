import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Courses from './pages/Courses';
import CourseOfferings from './pages/CourseOfferings';
import Registrations from './pages/Registrations';
import Home from './pages/Home';
import CourseTypes from './pages/CourseType';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleReset = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Course Types', path: '/course-types' },
    { label: 'Courses', path: '/courses' },
    { label: 'Offerings', path: '/offerings' },
    { label: 'Registrations', path: '/registrations' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <nav className="bg-white shadow-md px-6 py-4 flex items-center">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`mr-4 px-3 py-1 rounded transition-all duration-200 font-medium 
              ${isActive(item.path)
                ? 'text-black bg-blue-300'
                : 'text-blue-400 hover:text-black hover:bg-blue-400'}`}
          >
            {item.label}
          </Link>
        ))}

        <button
          onClick={handleReset}
          className="ml-auto bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition-all duration-200 text-sm"
        >
          Reset Data
        </button>
      </nav>

      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course-types" element={<CourseTypes />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/offerings" element={<CourseOfferings />} />
          <Route path="/registrations" element={<Registrations />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
