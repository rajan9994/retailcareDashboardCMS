import React, { useEffect, useState } from 'react';
import Form, {
  Item as FormItem,
  GroupItem,
  ColCountByScreen,
} from 'devextreme-react/form';
import { POS } from '../../../types/crm-POS';
import {
  //  FormTextbox,
  FormTextboxR,
} from '../..';
import { Htmleditor } from '../..';
import { getSizeQualifier } from '../../../utils/media-query';
import './announcements.css';
// import { NumberBox } from 'devextreme-react';
// import { HtmlEditor } from '../../utils/html-editor/tinyHtmlEditor';

export const POSNewForm = ({
  initData,
  onDataChanged,
  hiddenInputValue,
}: {
  initData: POS;
  onDataChanged: (data) => void;
  hiddenInputValue: number;
}) => {
  const [newPOSData, setNewPOSData] = useState<POS>({ ...initData });
  useEffect(() => {
    // console.log('newAnnnountcement data', initData);
    setNewPOSData({ ...initData });
  }, [initData]);

  const updateField = (field: string) => (value) => {
    const newValue = value;
    const newData = { ...newPOSData, [field]: newValue };
    console.log('in Updated POS ', newData);
    setNewPOSData(newData);
    onDataChanged(newData);
  };
  const updateField2 = (field: string) => (value) => {
    setNewPOSData((prevData) => ({
      ...prevData,
      description: value.value,
    }));
    const newData = { ...newPOSData, description: value.value };
    // console.log('newData', newData);
    onDataChanged(newData);
    imp(field);
  };
  const imp = (val: string) => {
    return val;
  };
  return (
    <Form className='plain-styled-form' screenByWidth={getSizeQualifier}>
      <GroupItem>
        <ColCountByScreen xs={1} sm={3} md={3} lg={3} />
        <FormItem>
          <FormTextboxR
            label='Title'
            value={newPOSData.name}
            isEditing={false}
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
          <label>
            Status:
            <br />
          </label>
          <input
            className='chkbox'
            type='checkbox'
            checked={newPOSData.status === '1'}
            onChange={(event) =>
              updateField('status')(event.target.checked ? '1' : '0')
            }
          />
          <label>Active</label>
          <input
            type='checkbox'
            className='chkbox'
            checked={newPOSData.status === '0'}
            onChange={(event) =>
              updateField('status')(event.target.checked ? '0' : '1')
            }
          />
          <label>Inactive</label>
        </FormItem>
        <FormItem>
          <input
            type='hidden'
            value={hiddenInputValue}
            onChange={() => updateField('type')({ hiddenInputValue })}
          />
          {/* <FormItem></FormItem> */}
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
          <Htmleditor
            height = '520px'
            value={newPOSData.description}
            onValueChange={updateField2('description')}
          />
        </FormItem>
      </GroupItem>
    </Form>
  );
};
