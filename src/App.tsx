import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserDetailsPage from './pages/UserDetailsPage';
import AddUserPage from './pages/AddUserPage';
import { UserProvider } from './context/UserContext.jsx';
import './index.css'; // Assuming Tailwind or a similar setup

const Header = () => (
  <header className="bg-white shadow-lg border-b border-gray-200">
    <div className="container mx-auto px-4 py-4 sm:py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
      <Link to="/" className="text-2xl sm:text-3xl font-bold text-indigo-600 hover:text-indigo-800 transition duration-300 text-center sm:text-left">
        👥 User Management
      </Link>
      <nav className="w-full sm:w-auto">
        <Link to="/add-user" className="bg-indigo-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 shadow-md hover:shadow-lg block text-center">
          + Add New User
        </Link>
      </nav>
    </div>
  </header>
);

function App() {
  return (
    <Router>
      <UserProvider>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <main className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/user/:id" element={<UserDetailsPage />} />
              <Route path="/add-user" element={<AddUserPage />} />
              <Route path="*" element={<h2 className="text-center text-xl mt-10">404 - Page Not Found</h2>} />
            </Routes>
          </main>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;