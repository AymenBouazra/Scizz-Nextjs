"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Link2, Code } from 'lucide-react';

const Documentation = () => {
  const [activeTab, setActiveTab] = useState('auth');

  const endpoints = {
    auth: [
      {
        method: 'POST',
        path: '/auth/register',
        description: 'Register a new user account',
        body: '(firstname, lastname, email, password)',
        responses: [
          {
            status: 201,
            color: 'text-green-300',
            description: 'Created',
            returns: {
              message: 'You have been registered successfully!',
              user: { firstname: 'string', lastname: 'string', email: 'string' }
            }
          },
          {
            status: 400,
            color: 'text-red-300',
            description: 'Bad Request',
            returns: {
              message: 'A user with this email already exist!'
            }
          }
        ]
      },
      {
        method: 'POST',
        path: '/auth/login',
        description: 'Authenticate user credentials',
        body: '(email, password)',
        responses: [
          {
            status: 200,
            color: 'text-green-300',
            description: 'Success',
            returns: {
              message: 'Welcome {firstname}',
              token: 'JWT_TOKEN'
            }
          },
          {
            status: 400,
            color: 'text-red-300',
            description: 'Bad Request',
            returns: {
              message: 'Email or password incorrect!'
            }
          }
        ]
      },
      {
        method: 'POST',
        path: '/auth/forget-password',
        description: 'Request password reset',
        body: '(email)',
        responses: [
          {
            status: 200,
            color: 'text-green-300',
            description: 'Success',
            returns: {
              message: 'Please check your mailbox to reset your account\'s password!'
            }
          },
          {
            status: 500,
            color: 'text-red-300',
            description: 'Server Error',
            returns: {
              message: 'Cannot find any user with this email, try again with an existing e-mail account!'
            }
          }
        ]
      },
      {
        method: 'PUT',
        path: '/auth/reset-password/:token',
        description: 'Reset password with token',
        body: '(password)',
        responses: [
          {
            status: 200,
            color: 'text-green-300',
            description: 'Success',
            returns: {
              message: 'Password has been reset!'
            }
          },
          {
            status: 400,
            color: 'text-red-300',
            description: 'Bad Request',
            returns: {
              message: 'Password reset link expired or invalid, create a new password reset!'
            }
          }
        ]
      },
      {
        method: 'GET',
        path: '/auth/profile/:token',
        description: 'Get user profile information',
        responses: [
          {
            status: 200,
            color: 'text-green-300',
            description: 'Success',
            returns: {
              _id: 'string',
              firstname: 'string',
              lastname: 'string',
              email: 'string',
              urlIds: 'Array<URL>'
            }
          },
          {
            status: 400,
            color: 'text-red-300',
            description: 'Bad Request',
            returns: {
              message: 'No token provided'
            }
          }
        ]
      }
    ],
    urls: [
      {
        method: 'POST',
        path: '/url',
        description: 'Create a shortened URL, and if a user is logged in, add the URL to their list',
        body: '(originalUrl, token)',
        responses: [
          {
            status: 200,
            color: 'text-green-300',
            description: 'Success',
            returns: {
              message: 'URL created',
              shortenedUrl: 'string',
              shortUrlId: 'string'
            }
          },
          {
            status: 400,
            color: 'text-red-300',
            description: 'If a URL already exists in the User\'s list it will not create a new one',
            returns: {
              message: 'URL already exists',
              shortenedUrl: 'existing shortened URL'
            }
          }
        ]
      },
      {
        method: 'GET',
        path: '/url/:shortened_id',
        description: 'Retrieve original URL',
        responses: [
          {
            status: 200,
            color: 'text-green-300',
            description: 'Success',
            returns: {
              message: 'URL found',
              originalUrl: 'www.example.com'
            }
          },
          {
            status: 404,
            color: 'text-red-300',
            description: 'Not Found',
            returns: {
              message: 'URL not found'
            }
          }
        ]
      },
      {
        method: 'PATCH',
        path: '/url/:shortened_id',
        description: 'Remove URL from user list',
        body: 'token',
        responses: [
          {
            status: 200,
            color: 'text-green-300',
            description: 'Success',
            returns: {
              message: 'URL removed',
              user: 'Updated user object'
            }
          },
          {
            status: 404,
            color: 'text-red-300',
            description: 'Not Found',
            returns: {
              message: 'URL not found | User not found'
            }
          },
          {
            status: 400,
            color: 'text-red-300',
            description: 'Bad Request',
            returns: {
              message: 'No token provided'
            }
          }
        ]
      }
    ]
  };

  const getMethodColor = (method) => {
    const colors = {
      GET: 'bg-green-500/20 text-green-300',
      POST: 'bg-blue-500/20 text-blue-300',
      PUT: 'bg-yellow-500/20 text-yellow-300',
      PATCH: 'bg-purple-500/20 text-purple-300',
      DELETE: 'bg-red-500/20 text-red-300'
    };
    return colors[method] || 'bg-gray-500/20 text-gray-300';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 pt-16 sm:pt-24">
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2 sm:mb-4">Scizz API</h1>
          <p className="text-sm sm:text-lg text-purple-300">
            A powerful URL shortening service with user management capabilities
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 sm:mb-8 flex flex-row space-x-2 sm:space-x-4 justify-center"
        >
          <button
            onClick={() => setActiveTab('auth')}
            className={`w-auto px-3 sm:px-6 py-1.5 sm:py-3 rounded-xl hover:-translate-y-1 font-medium transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm
      ${activeTab === 'auth'
                ? 'bg-purple-500/60 text-white -translate-y-1'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
          >
            <Book className="w-3 h-3 sm:w-6 sm:h-6" />
            Authentication
          </button>
          <button
            onClick={() => setActiveTab('urls')}
            className={`w-auto px-3 sm:px-6 py-1.5 sm:py-3 rounded-xl hover:-translate-y-1 font-medium transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm
      ${activeTab === 'urls'
                ? 'bg-purple-500/60 text-white -translate-y-1'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
          >
            <Link2 className="w-3 h-3 sm:w-6 sm:h-6" />
            URL Management
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {endpoints[activeTab].map((endpoint, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300"
            >
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                  <div className="flex items-center gap-3 w-full">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getMethodColor(endpoint.method)}`}>
                      <Code className="w-5 h-5" />
                    </div>
                    <div className="flex-grow flex justify-between items-center">
                      <div className={`text-sm p-2 rounded-lg ${getMethodColor(endpoint.method)}`}>
                        {endpoint.method}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 pt-3 border-t border-purple-500/50">
                  <div>
                    <div className="text-sm text-purple-300">Endpoint:</div>
                    <div className="text-white break-all font-mono py-2">
                      <code className='bg-gray-800/30 text-white p-2 rounded-lg text-xs sm:text-sm'>{endpoint.path}</code>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-purple-300">Description:</div>
                    <div className="text-purple-200 break-all text-sm sm:text-base">
                      {endpoint.description}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-purple-500/50 space-y-3">
                  {endpoint.body && (
                    <div>
                      <div className="text-sm text-purple-300">Request Body:</div>
                      <div className="text-purple-200 font-mono text-xs sm:text-sm">
                        {endpoint.body}
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="text-sm text-purple-300">Responses:</div>
                    {endpoint.responses.map((response, idx) => (
                      <div key={idx} className="mt-2 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs sm:text-sm ${response.color}`}>
                            {response.status} - {response.description}
                          </span>
                        </div>
                        <div className="bg-gray-800/30 text-orange-300 p-2 rounded-lg font-mono text-xs sm:text-sm break-words">
                          {JSON.stringify(response.returns, null, 2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documentation;