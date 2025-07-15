'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-[3px] p-6 text-center">
            <div className="w-12 h-12 bg-red-500/20 border border-red-500/30 rounded-[3px] flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
            <p className="text-gray-400 mb-6">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-[3px] font-semibold hover:bg-purple-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
} 