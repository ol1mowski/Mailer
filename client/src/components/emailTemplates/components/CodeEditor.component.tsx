import { useRef, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import type { editor } from 'monaco-editor'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
  height?: string
  placeholder?: string
  disabled?: boolean
}

export const CodeEditor = ({
  value,
  onChange,
  language = 'html',
  height = '400px',
  placeholder = 'Wprowadź kod HTML...',
  disabled = false
}: CodeEditorProps) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor
    
    editor.updateOptions({
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      lineNumbers: 'on',
      folding: true,
      fontSize: 14,
      fontFamily: 'Consolas, "Courier New", monospace',
      theme: 'vs-light',
      automaticLayout: true,
      readOnly: disabled
    })

    if (!value.trim()) {
      editor.setValue(placeholder)
    }
  }

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      if (value === placeholder) {
        onChange('')
      } else {
        onChange(value)
      }
    }
  }

  useEffect(() => {
    if (editorRef.current && !disabled) {
      const model = editorRef.current.getModel()
      if (model && value !== model.getValue()) {
        model.setValue(value || '')
      }
    }
  }, [value, disabled])

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      <Editor
        height={height}
        language={language}
        value={value || ''}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          lineNumbers: 'on',
          folding: true,
          fontSize: 14,
          fontFamily: 'Consolas, "Courier New", monospace',
          theme: 'vs-light',
          automaticLayout: true,
          readOnly: disabled,
          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
          parameterHints: {
            enabled: true
          },
          hover: {
            enabled: true
          },
          formatOnPaste: true,
          formatOnType: true
        }}
      />
    </div>
  )
}