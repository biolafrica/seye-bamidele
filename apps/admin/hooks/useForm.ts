'use client';

import { useEffect, useState, useCallback, ChangeEvent, FormEvent } from 'react';

export interface UseFormOptions<T> {
  initialValues?: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit: (values: T) => Promise<void> | void;
}

export interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  globalError: string;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setValues: React.Dispatch<React.SetStateAction<T>>;
  setGlobalError: React.Dispatch<React.SetStateAction<string>>;
  setFieldValue: (name: keyof T, value: any) => void;
  setFieldTouched: (name: keyof T, touched?: boolean) => void;
  resetForm: () => void;
  isValid: boolean;
}

export function useForm<T extends Record<string, any>>({
  initialValues = {} as T,
  validate = () => ({}),
  onSubmit,
}: UseFormOptions<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState('');

  // Reset values when initialValues change
  useEffect(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setGlobalError('');
  }, [initialValues]);

  // Validate on values change
  useEffect(() => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }, [values, validate]);

  const handleChange = useCallback((
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    // Handle checkbox inputs
    const fieldValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : value;

    setValues(prev => ({ ...prev, [name]: fieldValue } as T));
    setTouched(prev => ({ ...prev, [name]: true }));
    setGlobalError(''); // Clear global error on input change
  }, []);

  const setFieldValue = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value } as T));
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const setFieldTouched = useCallback((name: keyof T, isTouched = true) => {
    setTouched(prev => ({ ...prev, [name]: isTouched }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setGlobalError('');
  }, [initialValues]);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Touch all fields
    const allTouched = Object.keys(values).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    ) as Partial<Record<keyof T, boolean>>;
    setTouched(allTouched);
    
    // Validate
    const validationErrors = validate(values);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      setGlobalError('');
      
      try {
        await onSubmit(values);
      } catch (err) {
        const errorMessage = err instanceof Error 
          ? err.message 
          : 'An unexpected error occurred';
        setGlobalError(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [values, validate, onSubmit]);

  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    touched,
    isSubmitting,
    globalError,
    handleChange,
    handleSubmit,
    setValues,
    setGlobalError,
    setFieldValue,
    setFieldTouched,
    resetForm,
    isValid,
  };
}