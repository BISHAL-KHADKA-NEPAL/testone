'use client';

import { useState } from 'react';
import SuccessNotification from '../components/SuccessNotification'; // Adjust the path as needed

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, company, message }),
        });

        if (res.ok) {
            setSuccess('Your message has been sent successfully!');
            setName('');
            setEmail('');
            setCompany('');
            setMessage('');
            setError('');
        } else {
            const data = await res.json();
            setError(data.error || 'Failed to send message.');
            setSuccess('');
        }
    };

    const handleCloseNotification = () => {
        setSuccess('');
    };

    const contactMethods = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
            ),
            contact: "Support@example.com",
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
            ),
            contact: "+1 (555) 000-000",
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
            ),
            contact: "Mountain View, California, United States.",
        },
    ];

    return (
        <main className="py-14">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-700 md:px-8">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="flex-1 max-w-lg space-y-6">
                        <h1 className="text-gray-800 text-4xl font-bold">
                            Let us know how we can help
                        </h1>
                        <p className="text-gray-600">
                            We’re here to help and answer any questions you might have. Please fill out the form, or use the contact information below.
                        </p>
                        <ul className="flex flex-col gap-y-4">
                            {contactMethods.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-x-4 p-4 rounded-lg shadow-md">
                                    <div className="text-indigo-600">
                                        {item.icon}
                                    </div>
                                    <p className="text-gray-800">{item.contact}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1 max-w-lg">
                        <form onSubmit={handleSubmit} className="p-8 rounded-lg shadow-md space-y-6">
                            <div>
                                <label className="block text-gray-700 font-medium">Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Company</label>
                                <input
                                    type="text"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    required
                                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Message</label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                    rows="6"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                Submit
                            </button>
                            {success && <SuccessNotification message={success} onClose={handleCloseNotification} />}
                            {error && <p className="text-red-500">{error}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Contact;
