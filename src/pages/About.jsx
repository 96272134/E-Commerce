import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">About Panaacreations</h1>
          <p className="text-gray-600">Celebrating femininity with timeless fashion and jewelry.</p>
        </div>

        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
          <p className="text-gray-600 mb-3">Founded to curate sophisticated fashion and fine jewelry with a focus on quality and craftsmanship.</p>
          <p className="text-gray-600">From everyday wear to statement pieces, each item blends contemporary trends with classic Panaacreations.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Our Mission</h3>
            <p className="text-gray-600">Empower women through curated, high-quality pieces with ethical sourcing and sustainable practices.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Our Values</h3>
            <ul className="text-gray-600 space-y-2 list-disc list-inside">
              <li>Quality craftsmanship</li>
              <li>Sustainable sourcing</li>
              <li>Timeless design</li>
              <li>Exceptional service</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
