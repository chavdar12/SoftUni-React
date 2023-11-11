import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { UseFormRegisterReturn } from "react-hook-form";

interface ITextEditor {
  classes?: string;
  data?: string;
  onChange?: (event: any, editor: any) => void;
  errorMessage?: string;
  label?: string;
  register?: UseFormRegisterReturn;
}

/**
 * TextEditor
 *
 * CkTextEditor component
 */
function TextEditor({
  classes,
  data = "",
  onChange,
  errorMessage,
  label,
  register,
}: ITextEditor) {
  return (
    <div className={["text-editor", classes].join(" ")}>
      {label && <p className="text-editor__label">{label}</p>}
      <CKEditor
        editor={ClassicEditor}
        data={data}
        onChange={(event: any, editor: any) => {
          if (onChange) {
            onChange(event, editor);
          }
          if (register) {
            const syntheticEvent = {
              target: {
                name: register.name,
                value: editor.getData(),
              },
            };
            register.onChange(syntheticEvent);
          }
        }}
        config={{
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "|",
            "link",
            "bulletedList",
            "numberedList",
            "|",
            "indent",
            "outdent",
            "|",
            "blockQuote",
            "|",
            "undo",
            "redo",
          ],
        }}
      />
    </div>
  );
}

export default TextEditor;
