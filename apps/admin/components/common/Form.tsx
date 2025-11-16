'use client';

import React from 'react';

import { Button } from './Button';
import { useForm } from '@/hooks/useForm';

export type FieldType = 
  | 'text' 
  | 'email' 
  | 'password' 
  | 'number' 
  | 'tel' 
  | 'url' 
  | 'date' 
  | 'time' 
  | 'datetime-local' 
  | 'select' 
  | 'textarea' 
  | 'checkbox' 
  | 'radio';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: SelectOption[];
  rows?: number;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  pattern?: string;
  autoComplete?: string;
  disabled?: boolean;
  helperText?: string;
}

export interface FormProps<T extends Record<string, any>> {
  fields: FormField[];
  initialValues?: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit: (values: T) => Promise<void> | void;
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
  showCancel?: boolean;
  className?: string;
  submitButtonVariant?: 'filled' | 'secondary' | 'outline';
  fullWidthSubmit?: boolean;
}

function Form<T extends Record<string, any>>({
  fields,
  initialValues = {} as T,
  validate,
  onSubmit,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  onCancel,
  showCancel = false,
  className = '',
  submitButtonVariant = 'filled',
  fullWidthSubmit = true,
}: FormProps<T>) {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    globalError,
    handleChange,
    handleSubmit,
    setGlobalError,
    isValid,
  } = useForm<T>({ 
    initialValues, 
    validate, 
    onSubmit 
  });

  // Check if form is valid including required fields
  const isFormValid = isValid && fields
    .filter(f => f.required)
    .every(f => {
      const val = values[f.name];
      return val !== undefined && val !== null && val.toString().trim() !== '';
    });

  const getInputClassName = (showError: boolean, isCheckbox = false) => {
    if (isCheckbox) {
      return `
        h-4 w-4 rounded border-border text-accent 
        focus:ring-2 focus:ring-accent focus:ring-offset-2 
        focus:ring-offset-background
        ${showError ? 'border-red-500' : ''}
      `;
    }

    return `
      mt-1 block w-full rounded-lg border px-3 py-2 
      bg-card text-text placeholder-secondary
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
      ${showError 
        ? 'border-red-500 focus:ring-red-500' 
        : 'border-border hover:border-secondary'
      }
      disabled:bg-hover disabled:text-disabled disabled:cursor-not-allowed
    `;
  };

  const renderField = (field: FormField) => {
    const { 
      name, 
      label, 
      type, 
      placeholder, 
      required, 
      options, 
      rows, 
      min, 
      max, 
      step,
      pattern,
      autoComplete,
      disabled,
      helperText,
    } = field;
    
    const showError = touched[name] && errors[name];
    const fieldId = `field-${name}`;

    switch (type) {
      case 'select':
        return (
          <select
            id={fieldId}
            name={name}
            value={values[name] ?? ''}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            className={getInputClassName(!!showError)}
            aria-invalid={!!showError}
            aria-describedby={showError ? `${fieldId}-error` : undefined}
          >
            {options?.map(opt => (
              <option 
                key={opt.value} 
                value={opt.value} 
                disabled={opt.disabled}
              >
                {opt.label}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            id={fieldId}
            name={name}
            placeholder={placeholder}
            value={values[name] ?? ''}
            onChange={handleChange}
            rows={rows || 4}
            disabled={disabled}
            required={required}
            className={getInputClassName(!!showError)}
            aria-invalid={!!showError}
            aria-describedby={showError ? `${fieldId}-error` : undefined}
          />
        );

      case 'checkbox':
        return (
          <div className="flex items-center">
            <input
              id={fieldId}
              name={name}
              type="checkbox"
              checked={values[name] ?? false}
              onChange={handleChange}
              disabled={disabled}
              className={getInputClassName(!!showError, true)}
              aria-invalid={!!showError}
              aria-describedby={showError ? `${fieldId}-error` : undefined}
            />
            <label 
              htmlFor={fieldId} 
              className="ml-2 text-sm text-text cursor-pointer select-none"
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          </div>
        );

      default:
        return (
          <input
            id={fieldId}
            name={name}
            type={type}
            placeholder={placeholder}
            value={values[name] ?? ''}
            onChange={handleChange}
            min={min}
            max={max}
            step={step}
            pattern={pattern}
            autoComplete={autoComplete}
            disabled={disabled}
            required={required}
            className={getInputClassName(!!showError)}
            aria-invalid={!!showError}
            aria-describedby={showError ? `${fieldId}-error` : undefined}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {/* Global Error Message */}
      {globalError && (
        <div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 text-red-800 dark:text-red-200 p-3 rounded-lg flex items-start gap-2">
          <svg 
            className="w-5 h-5 mt-0.5 flex-shrink-0" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="font-medium">Error</p>
            <p className="text-sm mt-1">{globalError}</p>
          </div>
          <button
            type="button"
            onClick={() => setGlobalError('')}
            className="ml-auto text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
          >
            <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Form Fields */}
      {fields.map(field => {
        const showError = touched[field.name] && errors[field.name];
        const fieldId = `field-${field.name}`;

        if (field.type === 'checkbox') {
          return (
            <div key={field.name}>
              {renderField(field)}
              {field.helperText && (
                <p className="mt-1 text-xs text-secondary">{field.helperText}</p>
              )}
              {showError && (
                <p id={`${fieldId}-error`} className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors[field.name]}
                </p>
              )}
            </div>
          );
        }

        return (
          <div key={field.name}>
            <label 
              htmlFor={fieldId} 
              className="block text-sm font-medium text-heading"
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {renderField(field)}
            {field.helperText && !showError && (
              <p className="mt-1 text-xs text-secondary">{field.helperText}</p>
            )}
            {showError && (
              <p id={`${fieldId}-error`} className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors[field.name]}
              </p>
            )}
          </div>
        );
      })}

      {/* Form Actions */}
      <div className={`flex ${fullWidthSubmit ? 'flex-col sm:flex-row' : 'flex-row'} gap-3 pt-2`}>
        {showCancel && onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            fullWidth={fullWidthSubmit}
            disabled={isSubmitting}
          >
            {cancelLabel}
          </Button>
        )}
        <Button
          type="submit"
          variant={submitButtonVariant}
          disabled={!isFormValid || isSubmitting}
          loading={isSubmitting}
          loadingText="Submitting..."
          fullWidth={fullWidthSubmit}
          className={showCancel ? '' : 'w-full'}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

export default Form;