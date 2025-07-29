import { useEffect, useState, useCallback } from 'react';
import { X, Sparkles } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'danger';
}

export const Modal = ({ isOpen, onClose, title, children, size = 'md', variant = 'default' }: ModalProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 10);
      
      document.addEventListener('keydown', handleEscape);
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, handleEscape]);

  useEffect(() => {
    return () => {
      document.removeEventListener('keydown', handleEscape);    
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
      document.documentElement.style.overflow = 'unset';
      document.body.style.overflow = 'unset';
    };
  }, [handleEscape]);

  if (!isVisible) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-6xl'
  };

  const variantClasses = {
    default: {
      header: 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200',
      title: 'text-blue-900',
      icon: 'text-blue-600'
    },
    danger: {
      header: 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200',
      title: 'text-red-900',
      icon: 'text-red-600'
    }
  };

  const currentVariant = variantClasses[variant];

  return (
    <div className="modal-container z-50 flex items-center justify-center p-4">
      <div 
        className={`modal-backdrop bg-black/60 backdrop-blur-sm transition-all duration-500 ease-out ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      <div 
        className={`modal-content relative bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden border border-gray-100 transition-all duration-500 ease-out transform z-60 ${
          isAnimating 
            ? 'opacity-100 scale-100 translate-y-0 rotate-0' 
            : 'opacity-0 scale-95 translate-y-8 rotate-1'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`flex items-center justify-between p-6 border-b ${currentVariant.header} relative overflow-hidden z-20`}>
          <div className="absolute inset-0 opacity-10">
            <div className={`absolute top-0 left-0 w-20 h-20 bg-blue-400 rounded-full -translate-x-10 -translate-y-10 transition-all duration-1000 ${
              isAnimating ? 'animate-pulse' : 'opacity-0'
            }`}></div>
            <div className={`absolute bottom-0 right-0 w-16 h-16 bg-indigo-400 rounded-full translate-x-8 translate-y-8 transition-all duration-1000 delay-300 ${
              isAnimating ? 'animate-pulse' : 'opacity-0'
            }`}></div>
          </div>
          
          <div className={`flex items-center gap-3 relative z-10 transition-all duration-500 delay-200 ${
            isAnimating ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          }`}>
            <div className={`p-2 rounded-lg transition-all duration-300 ${
              variant === 'default' ? 'bg-blue-100' : 'bg-red-100'
            } ${isAnimating ? 'scale-100' : 'scale-90'}`}>
              <Sparkles className={`h-5 w-5 ${currentVariant.icon} transition-all duration-300 ${
                isAnimating ? 'rotate-0' : 'rotate-180'
              }`} />
            </div>
            <h2 className={`text-xl font-bold ${currentVariant.title} transition-all duration-300 ${
              isAnimating ? 'opacity-100' : 'opacity-0'
            }`}>{title}</h2>
          </div>
          
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();  
              onClose();
            }}
            className={`h-10 w-10 p-0 rounded-full hover:bg-white/50 transition-all duration-300 ${currentVariant.icon} flex items-center justify-center cursor-pointer relative z-20 ${
              isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
            type="button"
            aria-label="Zamknij modal"
          >
            <X className="h-5 w-5 transition-transform duration-200 hover:rotate-90" />
          </button>
        </div>
        
        <div className={`modal-content-inner p-6 overflow-y-auto max-h-[calc(90vh-120px)] bg-gradient-to-br from-gray-50 to-blue-50/30 transition-all duration-500 delay-100 ${
          isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          {children}
        </div>
      </div>
    </div>
  );
}; 