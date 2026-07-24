'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextType {
  toast: (props: Omit<Toast, 'id'>) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Shared global state so Toaster (standalone) and useToast (anywhere) share one store
type Listener = (toasts: Toast[]) => void;
const listeners: Set<Listener> = new Set();
let globalToasts: Toast[] = [];

function notifyListeners() {
  listeners.forEach((l) => l([...globalToasts]));
}

export function addToast(props: Omit<Toast, 'id'>) {
  const id = Math.random().toString(36).substring(2, 9);
  globalToasts = [...globalToasts, { id, ...props }];
  notifyListeners();
  setTimeout(() => {
    globalToasts = globalToasts.filter((t) => t.id !== id);
    notifyListeners();
  }, 5000);
}

function removeToast(id: string) {
  globalToasts = globalToasts.filter((t) => t.id !== id);
  notifyListeners();
}

// Standalone portal renderer — no children needed, place once in root layout
export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const listener: Listener = (t) => setToasts(t);
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-3 w-full max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
      ))}
    </div>,
    document.body
  );
}

// Optional context provider wrapper (for components that use useToast hook)
export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
    error: <XCircle className="h-5 w-5 text-red-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
  };

  return (
    <div
      className={cn(
        'pointer-events-auto flex w-full items-start gap-3 rounded-xl bg-white p-4',
        'shadow-lg ring-1 ring-slate-200 animate-slide-up'
      )}
    >
      <div className="flex-shrink-0 mt-0.5">{icons[toast.type]}</div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-slate-900">{toast.title}</p>
        {toast.message && <p className="mt-0.5 text-sm text-slate-500">{toast.message}</p>}
      </div>
      <button
        onClick={onDismiss}
        className="flex-shrink-0 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function useToast() {
  return { toast: addToast };
}
