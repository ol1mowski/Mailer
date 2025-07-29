import { useMemo } from 'react'
import DOMPurify from 'dompurify'

interface SafePreviewProps {
  htmlContent: string
  className?: string
}

export const SafePreview = ({ htmlContent, className = '' }: SafePreviewProps) => {
  const sanitizedHtml = useMemo(() => {
    if (!htmlContent || htmlContent.trim() === '') {
      return '<div class="text-gray-400 italic">Brak treści do wyświetlenia</div>'
    }

    const config = {
      ALLOWED_TAGS: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'br', 'hr',
        'div', 'span',
        'ul', 'ol', 'li',
        'table', 'thead', 'tbody', 'tr', 'td', 'th',
        'a', 'img',
        'strong', 'b', 'em', 'i', 'u', 's',
        'blockquote', 'pre', 'code',
        'form', 'input', 'textarea', 'button', 'select', 'option',
        'style'
      ],
      ALLOWED_ATTR: [
        'href', 'src', 'alt', 'title', 'target',
        'class', 'id', 'style',
        'width', 'height',
        'type', 'name', 'value', 'placeholder', 'required', 'disabled',
        'rows', 'cols',
        'selected', 'checked'
      ],
      ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
      KEEP_CONTENT: true,
      RETURN_DOM: false,
      RETURN_DOM_FRAGMENT: false,
      RETURN_TRUSTED_TYPE: false
    }

    const clean = DOMPurify.sanitize(htmlContent, config)
    
    return clean || '<div class="text-gray-400 italic">Treść została przefiltrowana</div>'
  }, [htmlContent])

  return (
    <div 
      className={`preview-content ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      style={{
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.6',
        color: '#333'
      }}
    />
  )
}