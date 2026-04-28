// src/components/Footer.jsx
import React from 'react'

const Footer = ({ setCurrentPage }) => {
  return (
    <footer role="contentinfo" className="mt-16 border-t bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-pink-600">Panaachecreations</h3>
            <p className="mt-2 text-gray-600">
              Sophisticated fashion for the modern woman
            </p>
          </div>

          {/* Quick Links - SPA internal navigation */}
          <nav aria-label="Quick Links" className="sm:justify-self-center">
            <h4 className="text-lg font-semibold text-gray-800">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li>
                <button
                  onClick={() => setCurrentPage && setCurrentPage('women')}
                  className="hover:text-pink-600 transition"
                >
                  Women&apos;s Fashion
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage && setCurrentPage('jewellery')}
                  className="hover:text-pink-600 transition"
                >
                  Jewellery
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage && setCurrentPage('about')}
                  className="hover:text-pink-600 transition"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage && setCurrentPage('contact')}
                  className="hover:text-pink-600 transition"
                >
                  Contact
                </button>
              </li>
            </ul>
          </nav>

          {/* Quick Links - External anchors (use this block instead of above if needed) */}
          {/* 
          <nav aria-label="Quick Links" className="sm:justify-self-center">
            <h4 className="text-lg font-semibold text-gray-800">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li>
                <a href="https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/f4c4c902eda837aeac35d0b57945d0d9/d7b6f964-def9-49ae-89b8-189d78868a91/index.html#"
                   className="hover:text-pink-600 transition">Women&apos;s Fashion</a>
              </li>
              <li>
                <a href="https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/f4c4c902eda837aeac35d0b57945d0d9/d7b6f964-def9-49ae-89b8-189d78868a91/index.html#"
                   className="hover:text-pink-600 transition">Jewellery</a>
              </li>
              <li>
                <a href="https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/f4c4c902eda837aeac35d0b57945d0d9/d7b6f964-def9-49ae-89b8-189d78868a91/index.html#"
                   className="hover:text-pink-600 transition">About Us</a>
              </li>
              <li>
                <a href="https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/f4c4c902eda837aeac35d0b57945d0d9/d7b6f964-def9-49ae-89b8-189d78868a91/index.html#"
                   className="hover:text-pink-600 transition">Contact</a>
              </li>
            </ul>
          </nav>
          */}

          {/* Contact */}
          <div className="lg:justify-self-end">
            <h4 className="text-lg font-semibold text-gray-800">Contact</h4>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li>
                <a
                  href="mailto:hello@elegantthreads.com"
                  className="hover:text-pink-600 transition"
                >
                  hello@Panaachecreations.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+15551234567"
                  className="hover:text-pink-600 transition"
                >
                  +91 (7014) 123-4567
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="mt-12 border-gray-200" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Panaachecreations. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Instagram" className="hover:text-pink-600">📷</a>
            <a href="#" aria-label="Twitter" className="hover:text-pink-600">🐦</a>
            <a href="#" aria-label="Facebook" className="hover:text-pink-600">📘</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
