import { useState, type FormEvent } from 'react';

type Validator = (key: string, value: string) => string;
type Submitter = (values: Record<string, string>) => void | Promise<void>;

export const useForm = (validate: Validator, submit: Submitter): [Record<string, string> | null, (evt: FormEvent<HTMLFormElement>) => Promise<void>] => {
  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const formData = new FormData(form);
    const entries = Array.from(formData.entries());
    const errors = entries.map(([key, val]) => [key, validate(key, val as string)]);
    
    errors.forEach(([key, val]) => { 
      const element = form.elements.namedItem(key) as HTMLInputElement;
      if (element) {
        element.setCustomValidity(val as string);
      }
    });

    if (errors.some(([, val]) => val !== '')) {
      setErrors(Object.fromEntries(errors));
    } else {
      setErrors(null);
      // await the submitter in case it is async so callers can perform follow-up actions
      await submit(Object.fromEntries(entries as [string, string][]));
    }
  }

  return [errors, handleSubmit];
}