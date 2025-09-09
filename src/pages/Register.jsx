import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  UserIcon, 
  AcademicCapIcon, 
  EyeIcon, 
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';

const Register = () => {
  const [userType, setUserType] = useState('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    const success = await register(formData.name, formData.email, formData.password, userType);
    if (success) {
      navigate(userType === 'teacher' ? '/teacher-dashboard' : '/student-dashboard');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={`min-h-screen pt-16 ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Create your account
          </h2>
          <p className={`mt-2 text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>

        {/* User Type Selection */}
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setUserType('student')}
            className={`flex-1 p-4 rounded-lg border-2 transition-all duration-200 ${
              userType === 'student'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : isDark 
                  ? 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  : 'border-gray-300 bg-white hover:border-gray-400'
            }`}
          >
            <UserIcon className={`h-8 w-8 mx-auto mb-2 ${userType === 'student' ? 'text-blue-600' : isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <div className={`font-medium ${userType === 'student' ? 'text-blue-600' : isDark ? 'text-white' : 'text-gray-900'}`}>
              Student
            </div>
            <div className={`text-sm ${userType === 'student' ? 'text-blue-500' : isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Practice and improve
            </div>
          </button>
          
          <button
            type="button"
            onClick={() => setUserType('teacher')}
            className={`flex-1 p-4 rounded-lg border-2 transition-all duration-200 ${
              userType === 'teacher'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : isDark 
                  ? 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  : 'border-gray-300 bg-white hover:border-gray-400'
            }`}
          >
            <AcademicCapIcon className={`h-8 w-8 mx-auto mb-2 ${userType === 'teacher' ? 'text-blue-600' : isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <div className={`font-medium ${userType === 'teacher' ? 'text-blue-600' : isDark ? 'text-white' : 'text-gray-900'}`}>
              Teacher
            </div>
            <div className={`text-sm ${userType === 'teacher' ? 'text-blue-500' : isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Evaluate and manage
            </div>
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Full Name
              </label>
              <div className="mt-1 relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`appearance-none relative block w-full px-3 py-2 pl-10 border ${
                    isDark 
                      ? 'border-gray-700 bg-gray-800 text-white placeholder-gray-400'
                      : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Enter your full name"
                />
                <UserIcon className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Email Address
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`appearance-none relative block w-full px-3 py-2 pl-10 border ${
                    isDark 
                      ? 'border-gray-700 bg-gray-800 text-white placeholder-gray-400'
                      : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Enter your email"
                />
                <EnvelopeIcon className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`appearance-none relative block w-full px-3 py-2 pl-10 pr-10 border ${
                    isDark 
                      ? 'border-gray-700 bg-gray-800 text-white placeholder-gray-400'
                      : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Enter your password"
                />
                <LockClosedIcon className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`appearance-none relative block w-full px-3 py-2 pl-10 pr-10 border ${
                    isDark 
                      ? 'border-gray-700 bg-gray-800 text-white placeholder-gray-400'
                      : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Confirm your password"
                />
                <LockClosedIcon className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Create Account as {userType === 'student' ? 'Student' : 'Teacher'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
