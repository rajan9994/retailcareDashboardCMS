import React from 'react';

import TextBox, { Button as TextBoxButton } from 'devextreme-react/text-box';
import Validator, { RequiredRule } from 'devextreme-react/validator';
import './FormTextbox.scss';

type TextboxProps = {
  value: string,
  label?: string,
  isEditing: boolean,
  onValueChange: (data) => void,
  mask?: string,
  icon?: string,
  required: boolean,
}

export const FormTextboxR = ({ value, label, isEditing, onValueChange, mask = '', icon, children, required = true }: React.PropsWithChildren<TextboxProps>) => {
  return (
    <TextBox
      label={label}
      value={value}
      mask={mask}
      readOnly={isEditing}
      elementAttr={{ class: 'form-editor' }}
      inputAttr={{ class: 'form-editor-input' }}
      stylingMode='filled'
      onValueChange={onValueChange}
    >
      { icon &&
      <TextBoxButton
        name='icon'
        location='before'
        options={{
          icon: icon,
          stylingMode: 'text',
          elementAttr: { class: 'form-editor-icon' }
        }} />
      }
      <Validator>
        {required && <RequiredRule />} {/* Only include RequiredRule if 'required' prop is true */}
        {children}
      </Validator>
    </TextBox>
  );
};
