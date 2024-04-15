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
export const announcementType = ({ text }: { text: string }) => (
  <div className='status'>
    <span>{text == '1' ? 'Normal' : 'Urgent'}</span>
  </div>
);
