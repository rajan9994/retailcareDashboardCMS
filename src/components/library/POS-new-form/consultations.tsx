import React, { useEffect, useState } from 'react';
import Form, {
  Item as FormItem,
  GroupItem,
  ColCountByScreen,
} from 'devextreme-react/form';
import { consultations } from '../../../types/crm-POS';
import {
  //  FormTextbox,
  FormTextboxR,
} from '../..';
// import { Htmleditor } from '../..';
import { getSizeQualifier } from '../../../utils/media-query';
import './announcements.css';
// import { NumberBox } from 'devextreme-react';
// import { HtmlEditor } from '../../utils/html-editor/tinyHtmlEditor';

export const ConsultationsForm = ({
  initData,
  onDataChanged,
}: {
  initData: consultations;
  onDataChanged: (data) => void;
}) => {
  const [newPOSData, setNewPOSData] = useState<consultations>({ ...initData });
  useEffect(() => {
    // console.log('newAnnnountcement data', initData);
    setNewPOSData({ ...initData });
  }, [initData]);

  const updateField = (field: string) => (value) => {
    const newValue = value;
    const newData = { ...newPOSData, [field]: newValue };
    // console.log('in Updated POS ', newData);
    setNewPOSData(newData);
    onDataChanged(newData);
  };
  return (
    <Form className='plain-styled-form' screenByWidth={getSizeQualifier}>
      <GroupItem>
        <ColCountByScreen xs={1} sm={3} md={3} lg={3} />
        <FormItem>
          <FormTextboxR
            label='Name From'
            value={newPOSData.name}
            isEditing
            onValueChange={updateField('name')}
            required={false}
          />
        </FormItem>
        {/* <FormItem>
          <NumberBox
            label='Order'
            width='100%'
            value={newPOSData.sortOrder}
            elementAttr={{ class: 'form-editor' }}
            inputAttr={{ class: 'form-editor-input' }}
            stylingMode='filled'
            onValueChange={updateField('sortOrder')}
          /> */}
        {/* </FormItem> */}
        <FormItem>
          <FormTextboxR
            label='Email'
            value={newPOSData.email}
            isEditing
            onValueChange={updateField('email')}
            required={false}
          />
        </FormItem>
        <FormItem>
          <FormTextboxR
            label='Company'
            value={newPOSData.company}
            isEditing
            onValueChange={updateField('company')}
            required={false}
          />
        </FormItem>
      </GroupItem>
      <GroupItem>
        <FormItem>
          <FormTextboxR
            label='Internal Note'
            value={newPOSData.notes}
            isEditing={false}
            onValueChange={updateField('notes')}
            required={false}
          />
        </FormItem>
      </GroupItem>
      <GroupItem>
        <FormItem>
          <FormTextboxR
            label='Message'
            value={newPOSData.description}
            isEditing
            onValueChange={updateField('description')}
            required={false}
          />
        </FormItem>
      </GroupItem>
    </Form>
  );
};
