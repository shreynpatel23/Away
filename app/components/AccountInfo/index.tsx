'use client';

import React, { useState, useEffect } from 'react';
import Button from '../Button/index';
import UpdateButton from '../UpdateButton/index';
import { useSession } from 'next-auth/react';

const Form = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [defaultFirstName, setDefaultFirstName] = useState('');
  const [defaultLastName, setDefaultLastName] = useState('');
  const [defaultEmail, setDefaultEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      const fetchUser = async () => {
        try { 
          const email = session?.user?.email;
          const response = await fetch('/api/get-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });
          const data = await response.json();
          if (response.ok) {
            setFirstName(data.first_name);
            setLastName(data.last_name);
            setEmail(data.email);
            setDefaultFirstName(data.first_name);
            setDefaultLastName(data.last_name);
            setDefaultEmail(data.email);
            setError('');
          } else {
            setError(data.error);
          }
        } catch (err) {
          console.error('Error fetching user data:', err);
          setError('Failed to load user data.');
        }
      };

      fetchUser();
    }
  }, [status, session]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      firstName === defaultFirstName &&
      lastName === defaultLastName &&
      email === defaultEmail
    ) {
      setError('No changes made to update.');
      setSuccess('');
      return;
    }

    try {
      const response = await fetch('/api/update-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: defaultEmail,
          new_email: email,
          first_name: firstName,
          last_name: lastName,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(data.email);
        setDefaultFirstName(data.first_name);
        setDefaultLastName(data.last_name);
        setDefaultEmail(data.email);
        setError('');
        setSuccess('Update Successful');

        setTimeout(() => {
          setSuccess('');
        }, 5000);
      } else {
        setError(data.error);
        setSuccess('');
      }
    } catch (err) {
      console.error('Error updating user data:', err);
      setError('Failed to update user data.');
      setSuccess('');
    }
  };

  const handleCancel = () => {
    setFirstName(defaultFirstName);
    setLastName(defaultLastName);
    setEmail(defaultEmail);
    setError('');
    setSuccess('');
  };

  return (
    <form className="bg-white p-14 rounded-xl shadow-xl w-full max-w-xl" onSubmit={handleUpdate}>
      {error && <div className="text-red-700 mb-4">Error: {error}</div>}
      {success && <div className="text-green-700 mb-4">{success}</div>}
      <div className="mb-4 flex space-x-10">
        <div className="w-1/2">
          <label className="block mb-2">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-3 py-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-gradientColor1 text-black font-medium"
          />
        </div>
        <div className="w-1/2">
          <label className="block mb-2">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-3 py-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-gradientColor1 text-black font-medium"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 mb-8 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-gradientColor1 text-black font-medium"
        />
      </div>
      <div className="flex justify-start">
        <Button buttonText={'Cancel'} buttonClassName={'bg-gradientColor1 text-accent py-2 px-4 rounded mr-2 drop-shadow-lg'} onClick={handleCancel} />
        <UpdateButton buttonText={'Update'} buttonClassName={'bg-accent text-white py-2 px-4 rounded mr-2 drop-shadow-lg'} onClick={handleUpdate} />
      </div>
    </form>
  );
};

export default Form;
