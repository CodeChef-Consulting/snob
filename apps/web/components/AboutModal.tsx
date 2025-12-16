'use client';

import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactStatus, setContactStatus] = useState('');
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus('sending');

    try {
      await emailjs.send(
        'service_o6khqch',
        'template_t3zequn',
        {
          from_name: contactName,
          from_email: contactEmail,
          message: contactMessage,
          form_type: 'contact',
        },
        'yAZCHKy20_Kxq6KJ_'
      );
      setContactStatus('success');
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setTimeout(() => setContactStatus(''), 3000);
    } catch (error) {
      setContactStatus('error');
      setTimeout(() => setContactStatus(''), 3000);
    }
  };

  const handleClose = () => {
    if (doNotShowAgain) {
      localStorage.setItem('hideAboutModal', 'true');
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div className="relative w-full h-full md:h-auto md:max-h-[90vh] max-w-4xl bg-gradient-to-br from-slate-50 to-slate-100 shadow-2xl md:rounded-2xl flex flex-col">
        {/* Fixed Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-br from-slate-50 to-slate-100 border-b border-slate-200 px-4 sm:px-6 py-4 flex items-center justify-center md:rounded-t-2xl relative">
          <h1 className="text-lg sm:text-3xl md:text-4xl font-bold text-slate-900 text-center pr-8 sm:pr-0">
            Foodie-Simulated Rating System
          </h1>
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 sm:top-3 sm:right-4 p-1.5 bg-white rounded-full shadow-lg hover:bg-slate-100 transition flex-shrink-0"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-slate-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-8">
          {/* Comparison Table */}
          <section className="mb-12 bg-white rounded-xl p-6 sm:p-8 shadow-sm overflow-x-auto">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-base">
                <thead>
                  <tr className="border-b-2 border-slate-300">
                    <th className="py-3 px-2 sm:px-4 w-12 sm:w-16 hidden sm:table-cell"></th>
                    <th className="py-3 px-2 sm:px-4 font-bold text-slate-900">
                      What a Foodie Does
                    </th>
                    <th className="py-3 px-2 sm:px-4 font-bold text-blue-600">
                      What Our AI-Foodie Does
                    </th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr className="border-b border-slate-200">
                    <td className="py-4 px-2 sm:px-4 text-slate-400 font-semibold align-top hidden sm:table-cell">
                      1
                    </td>
                    <td className="py-4 px-2 sm:px-4 align-top">
                      Starts with a question like &ldquo;Best pho in LA?&rdquo; or &ldquo;What
                      should I eat in Neighborhood A?&rdquo;
                    </td>
                    <td className="py-4 px-2 sm:px-4 text-slate-900 align-top">
                      Scours the internet thoroughly, reading all qualitative
                      posts, comments, and reviews on restaurants
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-4 px-2 sm:px-4 text-slate-400 font-semibold align-top hidden sm:table-cell">
                      2
                    </td>
                    <td className="py-4 px-2 sm:px-4 align-top">
                      Skeptical of numeric ratings, aware of bias in 5-star
                      systems
                    </td>
                    <td className="py-4 px-2 sm:px-4 text-slate-900 align-top">
                      Ignores preexisting star ratings entirely, focusing only on
                      qualitative insights
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-4 px-2 sm:px-4 text-slate-400 font-semibold align-top hidden sm:table-cell">
                      3
                    </td>
                    <td className="py-4 px-2 sm:px-4 align-top">
                      Judges which opinions are trustworthy and relevant
                    </td>
                    <td className="py-4 px-2 sm:px-4 text-slate-900 align-top">
                      Gauges the merit of each post or comment, weighing recency,
                      visibility, and controversy
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-4 px-2 sm:px-4 text-slate-400 font-semibold align-top hidden sm:table-cell">
                      4
                    </td>
                    <td className="py-4 px-2 sm:px-4 align-top">
                      Synthesizes insights into a gut feeling or personal
                      recommendation
                    </td>
                    <td className="py-4 px-2 sm:px-4 text-slate-900 align-top">
                      Synthesizes insights into nuanced, data-driven ratings
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-2 sm:px-4 text-slate-400 font-semibold align-top hidden sm:table-cell">
                      5
                    </td>
                    <td className="py-4 px-2 sm:px-4 align-top">
                      Relies on memory, experience, and limited sources
                    </td>
                    <td className="py-4 px-2 sm:px-4 text-slate-900 align-top">
                      Operates at superhuman scale, capturing every thread,
                      nuance, and signal
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-12 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Love This Idea?
            </h2>
            <p className="text-slate-700 mb-4 text-sm sm:text-base">
              Built by Jeremy, lead engineer at{' '}
              <a
                href="https://codechefconsulting.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                CodeChef Consulting
              </a>
              . Open to feedback and dev collaboration.
            </p>
            <p className="text-slate-600 mb-6 text-xs sm:text-sm">
              <strong>Tech:</strong> Gemini AI (prompt engineering, batch
              processing), orthogonal-weighting scoring engine, Next.js, tRPC,
              PostgreSQL
            </p>
            <form onSubmit={handleContact} className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent text-sm sm:text-base"
              />
              <input
                type="email"
                placeholder="Your email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent text-sm sm:text-base"
              />
              <textarea
                placeholder="Message (feedback, questions, project inquiries...)"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent text-sm sm:text-base"
              />
              <button
                type="submit"
                disabled={contactStatus === 'sending'}
                className="w-full bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-900 transition disabled:opacity-50 text-sm sm:text-base"
              >
                {contactStatus === 'sending'
                  ? 'Sending...'
                  : contactStatus === 'success'
                    ? '✓ Sent!'
                    : contactStatus === 'error'
                      ? 'Error - Try again'
                      : 'Send Message'}
              </button>
            </form>
          </section>

          {/* Do Not Show Again Checkbox */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <input
              type="checkbox"
              id="doNotShowAgain"
              checked={doNotShowAgain}
              onChange={(e) => setDoNotShowAgain(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="doNotShowAgain"
              className="text-sm text-slate-600 cursor-pointer"
            >
              Do not show this again
            </label>
          </div>

          {/* Close Button at Bottom */}
          <div className="text-center">
            <button
              onClick={handleClose}
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
