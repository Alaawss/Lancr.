'use client';

import { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#E2E8F0] p-4">
          <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#0F172A] font-headline">Something went wrong</h1>
                <p className="text-sm text-[#64748B] font-small">An unexpected error occurred</p>
              </div>
            </div>
            
            <div className="bg-[#F8FAFC] rounded-xl p-4 mb-6">
              <p className="text-sm text-[#64748B] font-small">
                {this.state.error?.message || 'Please try refreshing the page. If the problem persists, contact support.'}
              </p>
            </div>

            <Button
              onClick={() => window.location.reload()}
              className="w-full bg-[#FF2A54] hover:bg-[#E62348] text-white rounded-2xl font-small"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
