import React from 'react';

function Notification({ height, width }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 19 18"
      fill="none"
    >
      <path
        d="M14.2998 6C14.2998 4.80652 13.8257 3.66193 12.9818 2.81802C12.1379 1.97411 10.9933 1.5 9.7998 1.5C8.60633 1.5 7.46174 1.97411 6.61782 2.81802C5.77391 3.66193 5.2998 4.80652 5.2998 6C5.2998 11.25 3.0498 12.75 3.0498 12.75H16.5498C16.5498 12.75 14.2998 11.25 14.2998 6Z"
        stroke="#EBEDEE"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.097 15.75C10.9651 15.9773 10.7759 16.166 10.5481 16.2971C10.3204 16.4283 10.0623 16.4974 9.79945 16.4974C9.53665 16.4974 9.2785 16.4283 9.0508 16.2971C8.8231 16.166 8.6338 15.9773 8.50195 15.75"
        stroke="#EBEDEE"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default Notification;
