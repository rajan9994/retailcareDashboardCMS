import React, { useEffect, useState } from 'react';
import Form, { Item as FormItem, GroupItem, ColCountByScreen } from 'devextreme-react/form';
import { Announcements } from '../../../types/crm-Announcements';
import { FormTextbox } from '../..';
import { getSizeQualifier } from '../../../utils/media-query';
import './announcements.css';
import {
  HtmlEditor,
  Toolbar,
  MediaResizing,
  Item,
} from 'devextreme-react/html-editor';
import SelectBox from 'devextreme-react/select-box';

const sizeValues = ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'];
const fontValues = [
  'Arial',
  'Courier New',
  'Georgia',
  'Impact',
  'Lucida Console',
  'Tahoma',
  'Times New Roman',
  'Verdana',
];
const headerValues = [false, 1, 2, 3, 4, 5];
const fontSizeOptions = {
  inputAttr: {
    'aria-label': 'Font size',
  },
};
const fontFamilyOptions = {
  inputAttr: {
    'aria-label': 'Font family',
  },
};
const headerOptions = {
  inputAttr: {
    'aria-label': 'Font family',
  },
};

export const AnnouncementsNewForm = ({ initData, onDataChanged }: { initData: Announcements; onDataChanged: (data) => void; }) => {
  const [newAnnouncementsData, setNewAnnouncementsData] = useState<Announcements>({ ...initData });
  useEffect(() => {
    setNewAnnouncementsData({ ...initData });
  }, [initData]);

  const updateField = (field: string) => (value) => {
    let newValue;
    if (typeof value === 'object' && value !== null && 'value' in value) {
      newValue = value.value;
    } else {
      newValue = value;
    }
    const newData = { ...newAnnouncementsData, [field]: newValue };
    onDataChanged(newData);
    console.log('new value', newValue);
    setNewAnnouncementsData(newData);
  };

  return (
    <Form className='plain-styled-form' screenByWidth={getSizeQualifier}>
      <GroupItem>
        <ColCountByScreen xs={1} sm={2} md={2} lg={2} />
        <FormItem>
          <FormTextbox
            label='Title'
            value={newAnnouncementsData.name}
            isEditing={false}
            onValueChange={updateField('name')}
          />
        </FormItem>
        <FormItem>
          <SelectBox
            label='Status'
            dataSource={[
              { text: 'Active', value: '1' },
              { text: 'Inactive', value: '0' },
            ]}
            displayExpr='text'
            valueExpr='value'
            value={newAnnouncementsData.status}
            onValueChanged={updateField('status')}
          />
        </FormItem>
        <FormItem>
          <SelectBox
            label='Type'
            dataSource={[
              { text: 'Normal', value: 1 },
              { text: 'Urgent', value: 2 },
            ]}
            displayExpr='text'
            valueExpr='value'
            value={newAnnouncementsData.type}
            onValueChanged={updateField('type')}
          />
        </FormItem>
      </GroupItem>
      <GroupItem>
        <FormItem>
          <HtmlEditor
            value={newAnnouncementsData.description}
            onValueChanged={updateField('description')}
          >
            <MediaResizing />
            <Toolbar>
              <Item name='undo' />
              <Item name='redo' />
              <Item name='separator' />
              <Item name='size' acceptedValues={sizeValues} options={fontSizeOptions} />
              <Item name='font' acceptedValues={fontValues} options={fontFamilyOptions} />
              <Item name='separator' />
              <Item name='bold' />
              <Item name='italic' />
              <Item name='strike' />
              <Item name='underline' />
              <Item name='separator' />
              <Item name='alignLeft' />
              <Item name='alignCenter' />
              <Item name='alignRight' />
              <Item name='alignJustify' />
              <Item name='separator' />
              <Item name='orderedList' />
              <Item name='bulletList' />
              <Item name='separator' />
              <Item name='header' acceptedValues={headerValues} options={headerOptions} />
              <Item name='separator' />
              <Item name='color' />
              <Item name='background' />
              <Item name='separator' />
              <Item name='link' />
              <Item name='image' />
              <Item name='separator' />
              <Item name='clear' />
              <Item name='blockquote' />
            </Toolbar>
          </HtmlEditor>
        </FormItem>
      </GroupItem>
    </Form>
  );
};
