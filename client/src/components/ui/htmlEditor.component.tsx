import { Editor } from '@monaco-editor/react'
import { useRef } from 'react'
import type * as monaco from 'monaco-editor'

interface HtmlEditorProps {
  value: string
  onChange: (value: string) => void
  height?: string | number
  disabled?: boolean
  className?: string
}

export const HtmlEditor = ({ 
  value, 
  onChange, 
  height = '400px', 
  disabled = false,
  className = '' 
}: HtmlEditorProps) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor, monacoInstance: typeof monaco) => {
    editorRef.current = editor

    monacoInstance.languages.html.htmlDefaults.setOptions({
      format: {
        tabSize: 2,
        insertSpaces: true,
        wrapLineLength: 120,
        unformatted: 'default"',
        contentUnformatted: 'pre,code,textarea',
        indentInnerHtml: false,
        preserveNewLines: true,
        maxPreserveNewLines: undefined,
        indentHandlebars: false,
        endWithNewline: false,
        extraLiners: 'head, body, /html',
        wrapAttributes: 'auto'
      }
    })

    monacoInstance.languages.registerCompletionItemProvider('html', {
      provideCompletionItems: (_, position) => ({
        suggestions: [
          {
            label: 'email-container',
            kind: monacoInstance.languages.CompletionItemKind.Snippet,
            insertText: [
              '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">',
              '  $0',
              '</div>'
            ].join('\n'),
            insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Podstawowy kontener dla email',
            range: {
              startLineNumber: position.lineNumber,
              startColumn: position.column,
              endLineNumber: position.lineNumber,
              endColumn: position.column
            }
          },
          {
            label: 'email-header',
            kind: monacoInstance.languages.CompletionItemKind.Snippet,
            insertText: [
              '<div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-bottom: 1px solid #dee2e6;">',
              '  <h1 style="color: #333; margin: 0;">$1</h1>',
              '</div>'
            ].join('\n'),
            insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Header dla email',
            range: {
              startLineNumber: position.lineNumber,
              startColumn: position.column,
              endLineNumber: position.lineNumber,
              endColumn: position.column
            }
          },
          {
            label: 'email-button',
            kind: monacoInstance.languages.CompletionItemKind.Snippet,
            insertText: [
              '<div style="text-align: center; margin: 30px 0;">',
              '  <a href="$1" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">$2</a>',
              '</div>'
            ].join('\n'),
            insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Przycisk CTA dla email',
            range: {
              startLineNumber: position.lineNumber,
              startColumn: position.column,
              endLineNumber: position.lineNumber,
              endColumn: position.column
            }
          },
          {
            label: 'email-footer',
            kind: monacoInstance.languages.CompletionItemKind.Snippet,
            insertText: [
              '<div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #dee2e6; margin-top: 30px;">',
              '  <p style="color: #6c757d; font-size: 12px; margin: 0;">',
              '    © 2024 $1. Wszystkie prawa zastrzeżone.',
              '  </p>',
              '</div>'
            ].join('\n'),
            insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Footer dla email',
            range: {
              startLineNumber: position.lineNumber,
              startColumn: position.column,
              endLineNumber: position.lineNumber,
              endColumn: position.column
            }
          }
        ]
      })
    })
  }

  const handleChange = (newValue: string | undefined) => {
    onChange(newValue || '')
  }

  const formatCode = () => {
    if (editorRef.current) {
      editorRef.current.trigger('keyboard', 'editor.action.formatDocument', {})
    }
  }

  return (
    <div className={`border border-gray-300 rounded-md overflow-hidden ${className}`}>
      <div className="bg-gray-50 border-b border-gray-200 px-3 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium text-gray-700">HTML Editor</span>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
        </div>
        <button
          type="button"
          onClick={formatCode}
          disabled={disabled}
          className="text-xs text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Formatuj kod
        </button>
      </div>
      <Editor
        height={height}
        defaultLanguage="html"
        value={value}
        onChange={handleChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly: disabled,
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          wordWrap: 'on',
          folding: true,
          foldingHighlight: true,
          showFoldingControls: 'always',
          formatOnPaste: true,
          formatOnType: true,
          bracketPairColorization: {
            enabled: true
          },
          guides: {
            bracketPairs: true,
            indentation: true
          },
          suggest: {
            showKeywords: true,
            showSnippets: true
          }
        }}
        theme="vs"
      />
    </div>
  )
}
