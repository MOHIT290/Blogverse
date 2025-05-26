import React from 'react'
import { Editor } from "@tinymce/tinymce-react"
import { Controller } from 'react-hook-form'

function RTE({ name, control, label,defaultValue="" }) {
    return (
        <div>
            {label && <label>{label}</label>}


            {/* What does this Controller do?
Controller is used to integrate TinyMCE with react-hook-form. 
control={control} connects this field to the form.  */}



            {/* <Controller
                name={name || "content"}
                rules={{ required: true }}
                control={control}
                render={({ field: { onChange } }) => (

                    <Editor
                        initialValue={defaultValue}
                        init={{
                            initialValue: defaultValue,
                            height: 500,
                            plugins: [
                                'a11ychecker', 'accordion', 'advlist', 'anchor', 'autolink', 'autosave',
                                'charmap', 'code', 'codesample', 'directionality', 'emoticons', 'exportpdf',
                                'exportword', 'fullscreen', 'help', 'image', 'importcss', 'importword',
                                'insertdatetime', 'link', 'lists', 'markdown', 'math', 'media', 'nonbreaking',
                                'pagebreak', 'preview', 'quickbars', 'save', 'searchreplace', 'table',
                                'visualblocks', 'visualchars', 'wordcount'
                            ],
                            toolbar: 'undo redo | accordion accordionremove | ' +
                                'importword exportword exportpdf | math | ' +
                                'blocks fontfamily fontsize | bold italic underline strikethrough | ' +
                                'align numlist bullist | link image | table media | ' +
                                'lineheight outdent indent | forecolor backcolor removeformat | ' +
                                'charmap emoticons | code fullscreen preview | save print | ' +
                                'pagebreak anchor codesample | ltr rtl',
                            menubar: 'file edit view insert format tools table help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        onEditorChange={onChange}
                    />

                )}

            /> */}

<Controller
    name={name || "content"}
    control={control}
    render={({field: {onChange}}) => (
        <Editor
        apiKey='6vcdyxhnt2tufjv1i48bbdzr7bj6uynmado8876258gf6z1s'
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}
        />
    )}
    />

        </div>
    )
}

export default RTE;