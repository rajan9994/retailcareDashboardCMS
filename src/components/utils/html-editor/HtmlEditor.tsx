import React from 'react';
import {
  HtmlEditor,
  Toolbar,
  MediaResizing,
  Item,
  ImageUpload,
  TableContextMenu,
  // TableResizing,
  // TableResizing,
} from 'devextreme-react/html-editor';
// import CheckBox from 'devextreme-react/check-box'; // Import CheckBox component

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
type TextboxProps = {
  value: string;
  onValueChange: (data) => void;
  height: string;
};
export const Htmleditor = ({
  value,
  onValueChange,
  height = '500px'
}: React.PropsWithChildren<TextboxProps>) => {
  return (
    <HtmlEditor value={value} onValueChanged={onValueChange} height={height}>
      <ImageUpload fileUploadMode='base64' tabs={['file', 'url']} />
      <MediaResizing />
      <TableContextMenu enabled />
      {/* <TableResizing enabled /> */}
      <Toolbar>
        <Item name='undo' />
        <Item name='redo' />
        <Item name='separator' />
        <Item
          name='size'
          acceptedValues={sizeValues}
          options={fontSizeOptions}
        />
        <Item
          name='font'
          acceptedValues={fontValues}
          options={fontFamilyOptions}
        />
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
        <Item
          name='header'
          acceptedValues={headerValues}
          options={headerOptions}
        />
        <Item name='separator' />
        <Item name='color' />
        <Item name='background' />
        <Item name='separator' />
        <Item name='link' />
        <Item name='image' />
        <Item name='separator' />
        <Item name='clear' />
        <Item name='blockquote' />
        <Item name='separator' />
        <Item name='insertTable' />
        <Item name='insertHeaderRow' />
        <Item name='insertRowAbove' />
        <Item name='insertRowBelow' />
        <Item name='separator' />
        <Item name='insertColumnLeft' />
        <Item name='insertColumnRight' />
        <Item name='separator' />
        <Item name='deleteColumn' />
        <Item name='deleteRow' />
        <Item name='deleteTable' />
        <Item name='separator' />
        <Item name='cellProperties' />
        <Item name='tableProperties' />
      </Toolbar>
    </HtmlEditor>
  );
};
