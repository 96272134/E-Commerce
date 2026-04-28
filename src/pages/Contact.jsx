import React, { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Contact Us</h1>
          <p className="text-gray-600">We’d love to hear from you.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
                <input name="name" value={formData.name} onChange={handleChange} required className="w-full rounded-md border-gray-300 focus:border-pink-600 focus:ring-pink-600" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full rounded-md border-gray-300 focus:border-pink-600 focus:ring-pink-600" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Subject *</label>
                <input name="subject" value={formData.subject} onChange={handleChange} required className="w-full rounded-md border-gray-300 focus:border-pink-600 focus:ring-pink-600" />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Message *</label>
                <textarea rows="4" name="message" value={formData.message} onChange={handleChange} required className="w-full rounded-md border-gray-300 focus:border-pink-600 focus:ring-pink-600"></textarea>
              </div>
              <button className="w-full py-2.5 rounded-md bg-pink-600 text-white font-semibold hover:bg-pink-700">Send</button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Info</h3>
            <div className="space-y-3 text-gray-600">
              <p>📧 hello@Panaacreations.com</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>📍 123 Fashion Street, Style City</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
