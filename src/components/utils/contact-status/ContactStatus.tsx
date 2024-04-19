import React from 'react';

import './ContactStatus.scss';
// import { Button } from 'devextreme-react';

export const ContactStatus = ({
  text,
  contentClass = '',
  showText = true,
}: {
  text: string;
  contentClass?: string;
  showText?: boolean;
}) => (
  <div
    className={`status status-contact status-${text?.toLowerCase()} ${contentClass}`}
  >
    <span>{showText ? text : ''}</span>
  </div>
);

export const announcementStatus = ({ text }: { text: string }) => (
  <div className='status'>
    <span>{text == '1' ? 'Active' : 'Inactive'}</span>
  </div>
);

export const consultationStatus = ({ text }: { text: string }) => {
  let statusColor: string;
  switch (text) {
    case '1':
      statusColor = 'red'; // Not Read
      break;
    case '2':
      statusColor = 'green'; // Read
      break;
    case '3':
      statusColor = 'blue'; // Archived
      break;
    default:
      statusColor = 'black'; // Unknown Status
      break;
  }
  return (
    <div className='status'>
      <span style={{ color: statusColor }}>
        {text === '1' ? 'Not Read' : text === '2' ? 'Read' : text === '3' ? 'Archived' : 'Unknown Status'}
      </span>
    </div>
  );
};
export const announcementType = ({ text }: { text: string }) => (
  <div className='status'>
    <span>{text == '1' ? 'Normal' : 'Urgent'}</span>
  </div>
);
