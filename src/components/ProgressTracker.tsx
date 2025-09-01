import React, { useState, useEffect } from 'react';
import { RotateCcw, Settings } from 'lucide-react';
import { cn } from '../lib/utils'

interface ProgressTrackerProps {
  value: number
  onChange: (value: number) => void
  isManual?: boolean
  onToggleManual?: () => void
  onReset?: () => void
  computedValue?: number
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function ProgressTracker({
  value,
  onChange,
  isManual = false,
  onToggleManual,
  onReset,
  computedValue,
  className,
  size = 'md'
}: ProgressTrackerProps) {
  const [optimisticValue, setOptimisticValue] = useState(value)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    setOptimisticValue(value)
  }, [value])

  const handleValueChange = async (newValue: number[]) => {
    const val = newValue[0]
    setOptimisticValue(val)
    
    try {
      setIsUpdating(true)
      await onChange(val)
    } catch (error) {
      // Rollback on error
      setOptimisticValue(value)
      console.error('Failed to update progress:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  }

  const thumbSizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  }

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-text-deep-brown">
            Progress
          </span>
          {isManual && (
            <span className="inline-flex items-center px-2 py-1 text-xs bg-accent-pink/20 text-text-brown rounded-full">
              Manual
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={cn(
            'text-sm font-semibold',
            optimisticValue >= 80 ? 'text-green-600' :
            optimisticValue >= 60 ? 'text-yellow-600' :
            optimisticValue >= 40 ? 'text-orange-600' :
            'text-red-600'
          )}>
            {optimisticValue}%
          </span>
          
          {isUpdating && (
            <div className="w-3 h-3 border border-accent-sage border-t-transparent rounded-full animate-spin" />
          )}
          
          <div className="flex items-center space-x-1">
            {onToggleManual && (
              <button
                onClick={onToggleManual}
                className="p-1 hover:bg-accent-sage/10 rounded transition-arete"
                title={isManual ? 'Switch to automatic' : 'Switch to manual'}
              >
                <Settings className="w-3 h-3 text-text-brown" />
              </button>
            )}
            
            {isManual && onReset && computedValue !== undefined && (
              <button
                onClick={onReset}
                className="p-1 hover:bg-accent-sage/10 rounded transition-arete"
                title={`Reset to computed value (${computedValue}%)`}
              >
                <RotateCcw className="w-3 h-3 text-text-brown" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="relative">
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={optimisticValue}
            onChange={(e) => handleValueChange([parseInt(e.target.value)])}
            disabled={isUpdating}
            className={cn(
              'w-full appearance-none bg-transparent cursor-pointer',
              sizeClasses[size],
              isUpdating && 'opacity-50 cursor-not-allowed'
            )}
            style={{
              background: `linear-gradient(to right, ${
                optimisticValue >= 80 ? '#10b981' :
                optimisticValue >= 60 ? '#eab308' :
                optimisticValue >= 40 ? '#f97316' :
                '#ef4444'
              } 0%, ${
                optimisticValue >= 80 ? '#10b981' :
                optimisticValue >= 60 ? '#eab308' :
                optimisticValue >= 40 ? '#f97316' :
                '#ef4444'
              } ${optimisticValue}%, #e5e7eb ${optimisticValue}%, #e5e7eb 100%)`
            }}
          />
        </div>
        
        {/* Computed value indicator */}
        {isManual && computedValue !== undefined && computedValue !== optimisticValue && (
          <div
            className="absolute top-0 w-0.5 bg-accent-sage/60 rounded-full pointer-events-none"
            style={{
              left: `${computedValue}%`,
              height: '100%',
              transform: 'translateX(-50%)'
            }}
            title={`Computed value: ${computedValue}%`}
          />
        )}
      </div>

      {/* Progress milestones */}
      <div className="flex justify-between text-xs text-text-brown/60">
        <span>0%</span>
        <span>25%</span>
        <span>50%</span>
        <span>75%</span>
        <span>100%</span>
      </div>
    </div>
  )
}
