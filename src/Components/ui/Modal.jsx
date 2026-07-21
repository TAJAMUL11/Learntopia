import { useEffect } from "react";
import { createPortal } from "react-dom";
import Card from "./Card";
import Icon from "./Icon";
import Button from "./Button";

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  icon, 
  actionText = "Confirm", 
  onAction, 
  actionVariant = "primary", 
  isDestructive = false,
  loading = false
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { 
      document.body.style.overflow = 'unset'; 
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={!loading ? onClose : undefined}
      />
      
      <Card className="relative z-10 w-full max-w-lg overflow-hidden p-6 md:p-8 animate-fade-up border-white/[0.12] shadow-[0_0_40px_rgba(0,0,0,0.8)]">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {icon && (
              <div className={`grid h-12 w-12 flex-none place-items-center rounded-2xl ${isDestructive ? 'bg-state-danger/15 text-state-danger' : 'bg-sky/15 text-sky'}`}>
                <Icon name={icon} size={24} />
              </div>
            )}
            <h2 className="text-xl font-extrabold text-ink-hi md:text-2xl">{title}</h2>
          </div>
          <button 
            onClick={!loading ? onClose : undefined}
            disabled={loading}
            className="rounded-xl p-2 text-ink-low transition-colors hover:bg-white/[0.06] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon name="x" size={20} />
          </button>
        </div>
        
        <div className="mb-8 text-ink">
          {children}
        </div>
        
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onClose} disabled={loading} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button variant={actionVariant} onClick={onAction} loading={loading} className="w-full sm:w-auto">
            {actionText}
          </Button>
        </div>
      </Card>
    </div>,
    document.body
  );
};

export default Modal;
