import React, { useState, useEffect, useCallback, useRef } from 'react';
import { jsPDF as JsPdf } from 'jspdf';
import { saveAs } from 'file-saver-es';
import { Workbook } from 'exceljs';
import './crm-contact-list.scss';
// import { getContacts } from 'dx-template-gallery-data';
import {
  getAnnouncements,
  saveAnnouncement,
  deleteAnnouncement,
} from '../../api/announcements';
import DataGrid, {
  Sorting,
  Selection,
  HeaderFilter,
  Scrolling,
  SearchPanel,
  ColumnChooser,
  Export,
  Column,
  Toolbar,
  Item,
  LoadPanel,
  DataGridTypes,
  RowDragging,
} from 'devextreme-react/data-grid';
import SelectBox from 'devextreme-react/select-box';
import TextBox from 'devextreme-react/text-box';
import Button from 'devextreme-react/button';
import DropDownButton, {
  DropDownButtonTypes,
} from 'devextreme-react/drop-down-button';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { exportDataGrid as exportDataGridToXLSX } from 'devextreme/excel_exporter';
import { ContactStatus as ContactStatusType } from '../../types/crm-contact';
import { Announcements } from '../../types/crm-Announcements';
import { FormPopup, AnnouncementsNewForm } from '../../components';
import { ContactStatus } from '../../components';
import {
  CONTACT_STATUS_LIST,
  newAnnoucement,
  statusMapping,
} from '../../shared/constants';
import DataSource from 'devextreme/data/data_source';
import notify from 'devextreme/ui/notify';
import {
  announcementStatus,
  announcementType,
} from '../../components/utils/contact-status/ContactStatus';
import { Confirm } from '../../components';

type FilterContactStatus = ContactStatusType | 'All';
const STATUS_LIST = Object.keys(statusMapping);
const filterStatusList = ['All', ...STATUS_LIST];
const cellNameRender = (cell: DataGridTypes.ColumnCellTemplateData) => (
  <div className='name-template'>
    <div>{cell.data.name}</div>
    <div className='position'>{cell.data.position}</div>
  </div>
);
const editCellStatusRender = () => (
  <SelectBox
    className='cell-info'
    dataSource={CONTACT_STATUS_LIST}
    itemRender={ContactStatus}
    fieldRender={fieldRender}
  />
);
const fieldRender = (text: string) => (
  <>
    <ContactStatus text={text} />
    <TextBox readOnly />
  </>
);
const onExporting = (e: DataGridTypes.ExportingEvent) => {
  if (e.format === 'pdf') {
    const doc = new JsPdf();
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: e.component,
    }).then(() => {
      doc.save('Contacts.pdf');
    });
  } else {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Contacts');
    exportDataGridToXLSX({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(
          new Blob([buffer], { type: 'application/octet-stream' }),
          'Contacts.xlsx'
        );
      });
    });
    e.cancel = true;
  }
};

const dropDownOptions = { width: 'auto' };
const exportFormats = ['xlsx', 'pdf'];

export const CRMContactList = () => {
  const [gridDataSource, setGridDataSource] =
    useState<DataSource<Announcements[], string>>();
  const [popupVisible, setPopupVisible] = useState(false);
  const [formDataDefaults, setFormDataDefaults] = useState({
    ...newAnnoucement,
  });
  const gridRef = useRef<DataGrid>(null);
  let newContactData: Announcements;
  const deleteButtonClickedRef = useRef(false);
  useEffect(() => {
    setGridDataSource(
      new DataSource({
        key: 'id',
        load: () => getAnnouncements(),
      })
    );
  }, []);

  const changePopupVisibility = useCallback((isVisble) => {
    // console.log('in change visi');
    setPopupVisible(isVisble);
  }, []);
  const onAddContactClick = useCallback(() => {
    setFormDataDefaults(newAnnoucement);
    setPopupVisible(true);
  }, []);
  const onRowClick = useCallback(
    ({ data }: DataGridTypes.RowClickEvent) => {
      if (!deleteButtonClickedRef.current) {
        const newData = {
          name: data.name,
          description: data.description,
          status: data.status,
          id: parseInt(data.id),
          type: parseInt(data.type),
          notes: data.notes,
          sortOrder: parseInt(data.sortOrder)
        };
        setFormDataDefaults(newData);
        changePopupVisibility(true); // Open the form popup for editing
      }
      deleteButtonClickedRef.current = false; // Reset the flag
    },
    [changePopupVisibility]
  );
  const [status, setStatus] = useState(filterStatusList[0]);
  const filterByStatus = useCallback(
    (e: DropDownButtonTypes.SelectionChangedEvent) => {
      const { item: statusItem }: { item: FilterContactStatus } = e;
      let statusValue = statusItem;
      if (statusItem !== 'All') {
        statusValue = statusMapping[statusItem];
      }
      if (statusItem === 'All') {
        gridRef.current?.instance.clearFilter();
      } else {
        gridRef.current?.instance.filter(['status', '=', statusValue]);
      }
      setStatus(statusItem);
    },
    []
  );
  const processReorder = async(e) => {
    const newOrderIndex = parseInt(e.toIndex) + 1;
    const newContactData = {
      id: e.itemData.id,
      sortOrder: newOrderIndex,
      isRowOrder: true,
      // type:2
    };
    await saveAnnouncement(newContactData);
    await refresh();
  };
  const onReorder = (e) => {
    e.promise = processReorder(e);
  };
  const refresh = useCallback(() => {
    gridRef.current?.instance.refresh();
  }, []);
  const deleteButtonCellRender = (cell) => {
    const [confirmationVisible, setConfirmationVisible] = useState(false);
    const handleButtonClick = async() => {
      deleteButtonClickedRef.current = true;
      setConfirmationVisible(true);
    };
    const handleConfirm = async() => {
      const id = cell.data.id;
      await deleteAnnouncement(id);
      refresh();
      setConfirmationVisible(false); // Hide the confirmation popup after delete action
    };
    const handleCancel = () => {
      setConfirmationVisible(false); // Hide the confirmation popup if canceled
    };
    return (
      <>
        <Button
          type='danger'
          icon='remove'
          stylingMode='outlined'
          onClick={handleButtonClick}
          style={{ cursor: 'pointer', color: 'red', border:'0px' }}
        />
        <Confirm
          visible={confirmationVisible}
          msg='Are you sure you want to delete?'
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </>
    );
  };
  const onDataChanged = useCallback((data) => {
    newContactData = data;
  }, []);
  const onSaveClick = useCallback(async() => {
    try {
      await saveAnnouncement(newContactData);
      notify(
        {
          message: `"${newContactData.name}" saved successfully`,
          position: { at: 'bottom center', my: 'bottom center' },
        },
        'success'
      );
      setFormDataDefaults({ ...newAnnoucement });
      setPopupVisible(false);
    } catch (error) {
      console.error('Error saving announcement:', error);
      notify(
        {
          message: 'Failed to save announcement. Please try again later.',
          position: { at: 'bottom center', my: 'bottom center' },
        },
        'error'
      );
      setFormDataDefaults({ ...newAnnoucement });
    }
    refresh();
  }, []);
  return (
    <div className='view crm-contact-list'>
      <div className='view-wrapper view-wrapper-contact-list list-page'>
        <DataGrid
          className='grid theme-dependent'
          noDataText=''
          focusedRowEnabled
          height='100%'
          dataSource={gridDataSource}
          onRowClick={onRowClick}
          onExporting={onExporting}
          allowColumnReordering
          showBorders
          ref={gridRef}
          allowColumnResizing
          columnResizingMode='widget'
        >
          <RowDragging
            allowReordering
            onReorder={onReorder}
            dropFeedbackMode='push'
          />
          <LoadPanel showPane={false} />
          <SearchPanel visible placeholder='Announcements Search' />
          <ColumnChooser enabled />
          <Export enabled allowExportSelectedData formats={exportFormats} />
          <Selection
            selectAllMode='allPages'
            showCheckBoxesMode='always'
            mode='multiple'
          />
          <HeaderFilter visible />
          <Sorting mode='multiple' />
          <Scrolling mode='virtual' />
          <Toolbar>
            <Item location='before'>
              <div className='grid-header'>Announcements</div>
            </Item>
            <Item location='before' locateInMenu='auto'>
              <DropDownButton
                items={filterStatusList}
                stylingMode='text'
                text={status}
                dropDownOptions={dropDownOptions}
                useSelectMode
                onSelectionChanged={filterByStatus}
              />
            </Item>
            <Item location='after' locateInMenu='auto'>
              <Button
                icon='plus'
                text='Add Announcments'
                type='default'
                stylingMode='contained'
                onClick={onAddContactClick}
              />
            </Item>
            <Item
              location='after'
              locateInMenu='auto'
              showText='inMenu'
              widget='dxButton'
            >
              <Button
                icon='refresh'
                text='Refresh'
                stylingMode='text'
                onClick={refresh}
              />
            </Item>
            <Item location='after' locateInMenu='auto'>
              <div className='separator' />
            </Item>
            <Item name='exportButton' />
            <Item location='after' locateInMenu='auto'>
              <div className='separator' />
            </Item>
            <Item name='columnChooserButton' locateInMenu='auto' />
            <Item name='searchPanel' locateInMenu='auto' />
          </Toolbar>
          <Column
            dataField='sortOrder'
            caption='Order'
            width='95'
            // sortOrder='asc'
            dataType='string'
          />
          <Column
            dataField='name'
            caption='Title'
            cellRender={cellNameRender}
          />
          {/* <Column dataField='description' caption='Description' /> */}
          <Column
            dataField='status'
            caption='Status'
            dataType='string'
            width='95'
            cellRender={announcementStatus}
            editCellRender={editCellStatusRender}
          />
          <Column
            dataField='notes'
            caption='Internal Notes'
            dataType='string'
          />
          <Column
            dataField='type'
            caption='Type'
            width='95'
            dataType='string'
            cellRender={announcementType}
          />
          <Column
            dataField='addedDate'
            caption='Added DateTime'
            dataType='datetime'
            format='yyyy-MM-dd hh:mm:ss a'
          />
          {/* <Column
            dataField='lastUpdated'
            caption='Last Updated DateTime'
            dataType='datetime'
            format='yyyy-MM-dd hh:mm:ss a'
          /> */}
          <Column
            caption=''
            width={50}
            cellRender={deleteButtonCellRender}
          />
        </DataGrid>
        <FormPopup
          title='Add/Edit Announcment'
          visible={popupVisible}
          setVisible={changePopupVisibility}
          onSave={onSaveClick}
        >
          <AnnouncementsNewForm
            initData={formDataDefaults}
            onDataChanged={onDataChanged}
          />
        </FormPopup>
      </div>
    </div>
  );
};
