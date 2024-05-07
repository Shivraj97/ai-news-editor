import { useEffect, useRef } from 'react'
import EditorJS, { EditorConfig, OutputData } from '@editorjs/editorjs'
import { EDITOR_CONFIG } from '../../configs/editorjs.config'
import classes from '../../styles/editorjs.module.css'

interface EditorJsProps {
  value?: OutputData
  onChange: (data: OutputData) => void
  holder: string
}

const EditorJs: React.FC<EditorJsProps> = ({ value, onChange, holder }) => {
  const ref = useRef<EditorJS | null>(null)

  useEffect(() => {
    if (!ref.current) {
      const editorConfig: EditorConfig = {
        holder: holder,
        tools: EDITOR_CONFIG,
        placeholder: 'Write an Amazing Blog',
        data: value,
        async onChange(api, event) {
          const data = await api.saver.save()
          onChange(data)
        },
        // i18n: {
        //   toolNames: {
        //     Hyperlink: 'Link',
        //   },
        //   tools: {
        //     hyperlink: {
        //       Save: 'Salvar',
        //       'Select target': 'Seleziona destinazione',
        //       'Select rel': 'Wählen rel',
        //     },
        //   },
        // },
      }

      const editor = new EditorJS(editorConfig)
      ref.current = editor
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy()
      }
    }
  }, [])

  return (
    <div
      id={holder}
      className={`py-4 border-[1px] border-[solid rgb(190, 195, 224, 0.4)] rounded-lg`}
    />
  )
}

export default EditorJs
