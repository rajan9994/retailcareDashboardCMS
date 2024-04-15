import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export function HtmlEditor({ initialValue, onEditorChange }) {
  const [value, setValue] = useState(initialValue ?? '');
  useEffect(() => {
    setValue(initialValue ?? '');
  }, [initialValue]);

  return (
    <Editor
      initialValue={initialValue}
      value={value}
      onEditorChange={(newValue) => setValue(newValue)}
      onChange={onEditorChange}
      apiKey='mfv85tyb4uhe8rhr0vbxbe20lvtg45lbyc2idc8ec0y3c2gs'
      init={{
        plugins:
          'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
        toolbar:
          'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        // ai_request: (request, respondWith) =>
        //   respondWith.string(() =>
        //     Promise.reject('See docs to implement AI Assistant')
        //   ),
      }}
    />
  );
}
