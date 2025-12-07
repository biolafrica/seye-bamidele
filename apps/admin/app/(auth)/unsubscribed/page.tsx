'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';

function UnsubscribedContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const already = searchParams.get('already');
  const error = searchParams.get('error');

  // Error states
  if (error === 'not_found') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
          <div className="mb-4">
            <span className="text-6xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Invalid Link</h1>
          <p className="text-gray-600 mb-6">
            This unsubscribe link is invalid or has expired.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  if (error === 'failed') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
          <div className="mb-4">
            <span className="text-6xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Something Went Wrong</h1>
          <p className="text-gray-600 mb-6">
            We couldn't process your unsubscribe request. Please try again later or contact support.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  // Already unsubscribed
  if (already === 'true') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
          <div className="mb-4">
            <span className="text-6xl">ℹ️</span>
          </div>
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Already Unsubscribed</h1>
          {email && (
            <p className="text-gray-600 mb-4">
              <strong>{email}</strong> was already removed from our mailing list.
            </p>
          )}
          <p className="text-gray-600 mb-6">
            You won't receive any further emails from us.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  // Success
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-16 w-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Successfully Unsubscribed</h1>
        
        {email && (
          <p className="text-gray-600 mb-4">
            <strong>{email}</strong> has been removed from our mailing list.
          </p>
        )}
        
        <p className="text-gray-600 mb-6">
          You won't receive any more newsletters from us. We're sorry to see you go!
        </p>
        
        <div className="space-y-3">
          <Link
            href="/"
            className="block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Return to Homepage
          </Link>
          
          <p className="text-sm text-gray-500">
            Changed your mind?{' '}
            <Link href="/subscribe" className="text-blue-600 hover:underline">
              Subscribe again
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function UnsubscribedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    }>
      <UnsubscribedContent />
    </Suspense>
  );
}