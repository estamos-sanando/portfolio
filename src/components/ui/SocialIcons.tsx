"use client";

import React from "react";

export function InstagramIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ig-grad" cx="30%" cy="107%" r="130%" fx="30%" fy="107%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig-grad)" />
      <path
        d="M12 7A5 5 0 1012 17A5 5 0 1012 7Z"
        stroke="white"
        strokeWidth="1.8"
        fill="none"
      />
      <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
    </svg>
  );
}

export function FacebookIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="5" fill="#1877F2" />
      <path
        d="M14 13.5L14.5 9.5H10.5V7C10.5 5.9 11 5 12.5 5H14.5V1.5C14.1 1.45 13 1 11.5 1C8.5 1 6.5 2.8 6.5 6.2V9.5H3V13.5H6.5V23H10.5V13.5H14Z"
        fill="white"
      />
    </svg>
  );
}

export function TikTokIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="5" fill="#000000" />
      <path
        d="M15.5 7.5C14.5 7.5 13.6 7 13 6.2C12.7 5.8 12.5 5.4 12.4 4.9V13.5C12.4 16.2 10.2 18.5 7.5 18.5C4.8 18.5 2.5 16.2 2.5 13.5C2.5 10.8 4.8 8.5 7.5 8.5C7.8 8.5 8.1 8.5 8.4 8.6V11.2C8.1 11.1 7.8 11.1 7.5 11.1C6.2 11.1 5.1 12.2 5.1 13.5C5.1 14.8 6.2 15.9 7.5 15.9C8.8 15.9 9.9 14.8 9.9 13.5V2H12.5C12.5 2.8 12.8 3.5 13.3 4.1C13.9 4.8 14.8 5.3 15.8 5.5V7.5H15.5Z"
        fill="#25F4EE"
      />
      <path
        d="M16.5 8.5C15.5 8.5 14.6 8 14 7.2C13.7 6.8 13.5 6.4 13.4 5.9V14.5C13.4 17.2 11.2 19.5 8.5 19.5C7 19.5 5.7 18.8 4.8 17.7C5.7 18.3 6.8 18.7 8 18.7C10.7 18.7 12.9 16.5 12.9 13.8V2H15.5C15.5 2.8 15.8 3.5 16.3 4.1C16.9 4.8 17.8 5.3 18.8 5.5V7.5H16.5Z"
        fill="#FE2C55"
      />
      <path
        d="M16 8C15 8 14.1 7.5 13.5 6.7C13.2 6.3 13 5.9 12.9 5.4V14C12.9 16.7 10.7 18.9 8 18.9C6.7 18.9 5.5 18.4 4.6 17.4C5.5 18.2 6.7 18.7 8 18.7C10.7 18.7 12.9 16.5 12.9 13.8V2H15.5C15.5 2.8 15.8 3.5 16.3 4.1C16.9 4.8 17.8 5.3 18.8 5.5V7.5H16Z"
        fill="white"
      />
    </svg>
  );
}

export function PodcastIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="5" fill="#1DB954" />
      <path
        d="M12 4C7.6 4 4 7.6 4 12C4 16.4 7.6 20 12 20C16.4 20 20 16.4 20 12C20 7.6 16.4 4 12 4ZM15.6 15.6C15.4 15.9 15 16 14.7 15.8C12.2 14.3 9 13.9 5.3 14.8C4.9 14.9 4.6 14.6 4.5 14.2C4.4 13.8 4.7 13.5 5.1 13.4C9.2 12.4 12.8 12.9 15.6 14.6C15.9 14.8 16 15.3 15.6 15.6ZM16.9 12.7C16.6 13.1 16.1 13.2 15.7 13C12.8 11.2 8.5 10.7 5.1 11.7C4.6 11.8 4.1 11.5 4 11.1C3.9 10.6 4.2 10.1 4.6 10C8.6 8.8 13.4 9.4 16.7 11.4C17 11.7 17.1 12.3 16.9 12.7ZM17 9.6C13.6 7.6 7.9 7.4 4.6 8.4C4.1 8.6 3.5 8.3 3.3 7.8C3.1 7.3 3.4 6.7 3.9 6.5C7.7 5.3 14 5.6 17.9 7.9C18.4 8.2 18.5 8.8 18.2 9.3C17.9 9.8 17.4 9.9 17 9.6Z"
        fill="white"
      />
    </svg>
  );
}

export function WebIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="5" fill="#8E24AA" />
      <path
        d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM11 4.1V9H4.1C4.7 6.7 6.6 4.8 9 4.3C9.7 4.1 10.3 4.1 11 4.1ZM4.1 11H11V19.9C8.4 19.7 6.1 18.2 4.9 16C4.3 14.5 4 12.8 4.1 11ZM13 19.9V11H19.9C19.7 13.6 18.2 15.9 16 17.1C14.5 17.7 12.8 18 13 19.9ZM13 9V4.1C15.6 4.3 17.9 5.8 19.1 8C19.7 9.5 20 11.2 19.9 13H13V9Z"
        fill="white"
      />
    </svg>
  );
}
