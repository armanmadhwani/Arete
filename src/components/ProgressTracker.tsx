import React, { useState, useEffect } from 'react';
import { Slider } from '@radix-ui/react-slider';
import { CheckCircle2, Circle, RotateCcw, Settings } from 'lucide-react';
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
        <Slider
          value={[optimisticValue]}
          onValueChange={handleValueChange}
          max={100}
          step={1}
          className="relative flex items-center select-none touch-none w-full"
          disabled={isUpdating}
        >
          <div className={cn(
            'relative flex-1 bg-accent-sage/20 rounded-full',
            sizeClasses[size]
          )}>
            <div
              className={cn(
                'absolute left-0 top-0 rounded-full transition-arete',
                sizeClasses[size],
                optimisticValue >= 80 ? 'bg-green-500' :
                optimisticValue >= 60 ? 'bg-yellow-500' :
                optimisticValue >= 40 ? 'bg-orange-500' :
                'bg-red-500'
              )}
              style={{ width: `${optimisticValue}%` }}
            />
          </div>
          
          <div
            className={cn(
              'block rounded-full bg-canvas-off-white border-2 border-accent-sage shadow-arete hover:shadow-arete-lg focus:outline-none focus:ring-2 focus:ring-accent-sage focus:ring-offset-2 focus:ring-offset-canvas-beige transition-arete cursor-pointer',
              thumbSizeClasses[size],
              isUpdating && 'opacity-50 cursor-not-allowed'
            )}
            style={{
              transform: `translateX(-50%)`,
              left: `${optimisticValue}%`
            }}
          />
        </Slider>
        
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
