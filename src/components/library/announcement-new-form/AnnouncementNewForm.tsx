import React, { useEffect, useState } from 'react';
import Form, {
  Item as FormItem,
  GroupItem,
  ColCountByScreen,
} from 'devextreme-react/form';
import { Announcements } from '../../../types/crm-Announcements';
import { FormTextbox, FormTextboxR } from '../..';
import { Htmleditor } from '../..';
import { getSizeQualifier } from '../../../utils/media-query';
import './announcements.css';
import { NumberBox } from 'devextreme-react';

export const AnnouncementsNewForm = ({
  initData,
  onDataChanged,
}: {
  initData: Announcements;
  onDataChanged: (data) => void;
}) => {
  const [newAnnouncementsData, setNewAnnouncementsData] =
    useState<Announcements>({ ...initData });
  useEffect(() => {
    // console.log('newAnnnountcement data', initData);
    setNewAnnouncementsData({ ...initData });
  }, [initData]);

  const updateField = (field: string) => (value) => {
    const newValue = value;
    const newData = { ...newAnnouncementsData, [field]: newValue };
    // console.log('in Updated ', newData);
    setNewAnnouncementsData(newData);
    onDataChanged(newData);
  };
  const updateField2 = (field: string) => (value) => {
    // setNewAnnouncementsData(prevData => ({
    //   ...prevData,
    //   description: value.value
    // }));
    // onDataChanged(prevData => ({
    //   ...prevData,
    //   description: value.value
    // }));
    setNewAnnouncementsData((prevData) => ({
      ...prevData,
      description: value.value,
    }));
    const newData = { ...newAnnouncementsData, description: value.value };
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
          <FormTextbox
            label='Title'
            value={newAnnouncementsData.name}
            isEditing={false}
            onValueChange={updateField('name')}
          />
        </FormItem>
        {/* </GroupItem>
      <GroupItem> */}
        <FormItem>
          <NumberBox
            label='Order'
            value={newAnnouncementsData.sortOrder}
            elementAttr={{ class: 'form-editor' }}
            inputAttr={{ class: 'form-editor-input' }}
            stylingMode='filled'
            onValueChange={updateField('sortOrder')}
          />
        </FormItem>
        <FormItem>
          <label>
            Status:
            <br />
          </label>
          <input
            className='chkbox'
            type='checkbox'
            checked={newAnnouncementsData.status === '1'}
            onChange={(event) =>
              updateField('status')(event.target.checked ? '1' : '0')
            }
          />
          <label>Active</label>
          <input
            className='chkbox'
            type='checkbox'
            checked={newAnnouncementsData.status === '0'}
            onChange={(event) =>
              updateField('status')(event.target.checked ? '0' : '1')
            }
          />
          <label>Inactive</label>
        </FormItem>
      </GroupItem>
      <GroupItem>
        <FormItem>
          <label>
            Type:
            <br />
          </label>
          <input
            className='chkbox'
            type='checkbox'
            checked={newAnnouncementsData.type === 1}
            onChange={(event) =>
              updateField('type')(event.target.checked ? 1 : 2)
            }
          />
          <label>Normal</label>
          <input
            className='chkbox'
            type='checkbox'
            checked={newAnnouncementsData.type === 2}
            onChange={(event) =>
              updateField('type')(event.target.checked ? 2 : 1)
            }
          />
          <label>Urgent</label>
        </FormItem>
      </GroupItem>
      <GroupItem>
        <FormItem>
          <FormTextboxR
            label='Internal Note'
            value={newAnnouncementsData.notes}
            isEditing={false}
            onValueChange={updateField('notes')}
            required={false}
          />
        </FormItem>
      </GroupItem>
      <GroupItem>
        <FormItem>
          <Htmleditor
            height='520px'
            value={newAnnouncementsData.description}
            onValueChange={updateField2('description')}
          />
        </FormItem>
      </GroupItem>
    </Form>
  );
};
