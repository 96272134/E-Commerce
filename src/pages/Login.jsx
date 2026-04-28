import React, { useState } from 'react'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '', name: '' })
  const [showPwd, setShowPwd] = useState(false)         // NEW: password visibility 
  const [showConfirm, setShowConfirm] = useState(false) // NEW: confirm visibility 

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    if (!isLogin && formData.password !== formData.confirmPassword) return alert('Passwords do not match')
    alert(isLogin ? 'Login functionality to be implemented' : 'Signup functionality to be implemented')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-gray-600">{isLogin ? 'Sign in to your account' : 'Join our fashion community'}</p>
        </div>

        <form onSubmit={onSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={onChange}
                required={!isLogin}
                className="w-full rounded-md border-gray-300 focus:border-pink-600 focus:ring-pink-600"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              required
              className="w-full rounded-md border-gray-300 focus:border-pink-600 focus:ring-pink-600"
            />
          </div>

          {/* Password with show/hide */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPwd ? 'text' : 'password'}     // toggle type 
                name="password"
                value={formData.password}
                onChange={onChange}
                required
                className="w-full rounded-md border-gray-300 focus:border-pink-600 focus:ring-pink-600 pr-10"
                aria-label="Password"
              />
              <button
                type="button"
                onClick={() => setShowPwd(v => !v)}
                aria-pressed={showPwd}                   // toggle state for AT 
                aria-label={showPwd ? 'Hide password' : 'Show password'}
                className="absolute inset-y-0 right-2 my-auto px-2 text-gray-600 hover:text-pink-600"
                title={showPwd ? 'Hide password' : 'Show password'}
              >
                {showPwd ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Confirm Password (signup only) with show/hide */}
          {!isLogin && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'} // toggle type 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={onChange}
                  required
                  className="w-full rounded-md border-gray-300 focus:border-pink-600 focus:ring-pink-600 pr-10"
                  aria-label="Confirm password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(v => !v)}
                  aria-pressed={showConfirm}              // accessible toggle 
                  aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                  className="absolute inset-y-0 right-2 my-auto px-2 text-gray-600 hover:text-pink-600"
                  title={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirm ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
          )}

          <button className="w-full py-2.5 rounded-md bg-pink-600 text-white font-semibold hover:bg-pink-700">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-4">
          <button onClick={() => setIsLogin(!isLogin)} className="text-pink-600 hover:text-pink-700 text-sm">
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
