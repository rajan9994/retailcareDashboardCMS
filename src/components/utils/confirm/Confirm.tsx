import React from 'react';
import Popup from 'devextreme-react/popup';
import Button from 'devextreme-react/button';
// import { Margin } from 'devextreme-react/cjs/bar-gauge';

export const ConfirmationPopup = ({ visible, msg, onConfirm, onCancel }) => {
  return (
    <Popup
      visible={visible}
      showTitle
      title='Confirm Delete'
      width={300}
      height={190}
      dragEnabled
      onHiding={onCancel}
    >
      <div style={{ padding: '0px' }}>
        <p>{msg}</p>
        <div style={{ float: 'right' }}>
          <Button text='Yes' onClick={onConfirm} style={{ margin: '10px' }} />
          <Button text='No' onClick={onCancel} />
        </div>
      </div>
    </Popup>
  );
};
