import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Toast utilities with dark theme styling
export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      style: {
        background: '#18181b',
        border: '1px solid #3f3f46',
        borderRadius: '2px',
        color: '#ffffff',
      },
    })
  },
  error: (message: string) => {
    toast.error(message, {
      style: {
        background: '#18181b',
        border: '1px solid #3f3f46',
        borderRadius: '2px',
        color: '#ffffff',
      },
    })
  },
  info: (message: string) => {
    toast.info(message, {
      style: {
        background: '#18181b',
        border: '1px solid #3f3f46',
        borderRadius: '2px',
        color: '#ffffff',
      },
    })
  },
  warning: (message: string) => {
    toast.warning(message, {
      style: {
        background: '#18181b',
        border: '1px solid #3f3f46',
        borderRadius: '2px',
        color: '#ffffff',
      },
    })
  },
}

// Server-side validation utilities
export function validateUsername(username: string): boolean {
  // Must be 2-16 characters, alphanumeric, hyphens, underscores only
  const regex = /^[a-zA-Z0-9-_]{2,16}$/
  return regex.test(username) && username.length >= 2 && username.length <= 16
}

export function sanitizeUsername(username: string): string {
  // Remove any non-alphanumeric characters except hyphens and underscores
  return username.toLowerCase().replace(/[^a-z0-9-_]/g, '').slice(0, 16)
}

export function validateUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return ['http:', 'https:'].includes(parsed.protocol)
  } catch {
    return false
  }
}

export function sanitizeText(text: string, maxLength: number = 1000): string {
  // Remove HTML tags and limit length
  return text.replace(/<[^>]*>/g, '').slice(0, maxLength)
}
