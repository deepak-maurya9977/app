import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { sendEmail, isEmailJSConfigured } from '@/lib/emailjs';
import { SERVICE_NAMES_FOR_DROPDOWN } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface ContactFormProps {
  showService?: boolean;
  className?: string;
  compact?: boolean;
}

export default function ContactForm({ showService = false, className = '', compact = false }: ContactFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [charCount, setCharCount] = useState(0);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Please tell us your name - we like knowing who we\'re talking to.';
    if (!formData.phone.trim()) newErrors.phone = 'We\'ll need your phone number to reach you quickly.';
    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'That doesn\'t look like a valid Indian mobile number - please check and try again.';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please double-check your email address - something looks off.';
    }
    if (!formData.message.trim()) newErrors.message = 'Please add a short note about your business - it helps us prepare for your call.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (!isEmailJSConfigured()) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    try {
      await sendEmail(formData);
      setStatus('success');
      setFormData({ firstName: '', email: '', phone: '', service: '', message: '' });
      setCharCount(0);
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'message') setCharCount(value.length);
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-4', className)}>
      {status === 'success' && (
        <div className="flex items-center gap-2 bg-green-50 text-green-700 p-4 rounded-lg">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">🎉 Message received! Rahul or Himanshu will personally reach out within 24 hours.</span>
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center gap-2 bg-red-50 text-red-700 p-4 rounded-lg">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">
            {!isEmailJSConfigured() ? 'Our form isn\'t set up yet - please call +91 8821953915 directly and we\'ll sort you out immediately.' : 'Something went wrong on our end - sorry about that. Please call us at +91 8821953915 and we\'ll pick up right away.'}
          </span>
        </div>
      )}

      <div className={cn(compact ? 'space-y-3' : 'grid grid-cols-1 md:grid-cols-2 gap-4')}>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            First Name <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Your name"
            className={cn(
              'w-full px-4 py-3 rounded-lg border bg-white text-sm transition-colors',
              errors.firstName ? 'border-red-300' : 'border-gray-200'
            )}
          />
          {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className={cn(
              'w-full px-4 py-3 rounded-lg border bg-white text-sm transition-colors',
              errors.email ? 'border-red-300' : 'border-gray-200'
            )}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className={cn(compact ? 'space-y-3' : 'grid grid-cols-1 md:grid-cols-2 gap-4')}>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Phone Number <span className="text-primary">*</span>
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 text-sm text-text-secondary">
              +91
            </span>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="8821953915"
              className={cn(
                'flex-1 px-4 py-3 rounded-r-lg border bg-white text-sm transition-colors',
                errors.phone ? 'border-red-300' : 'border-gray-200'
              )}
            />
          </div>
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
        </div>

        {showService && (
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              Service Interested In
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm"
            >
              <option value="">Select a service</option>
              {SERVICE_NAMES_FOR_DROPDOWN.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-1.5">
          Message <span className="text-primary">*</span>
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your business needs..."
          rows={compact ? 3 : 4}
          maxLength={180}
          className={cn(
            'w-full px-4 py-3 rounded-lg border bg-white text-sm resize-none transition-colors',
            errors.message ? 'border-red-300' : 'border-gray-200'
          )}
        />
        <div className="flex justify-between mt-1">
          {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
          <span className="text-xs text-text-muted ml-auto">{charCount}/180</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className={cn(
          'w-full flex items-center justify-center gap-2 bg-primary text-white font-medium py-3.5 rounded-lg hover:bg-primary-dark transition-all hover:shadow-cta disabled:opacity-60 disabled:cursor-not-allowed'
        )}
      >
        {status === 'loading' ? (
          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <Send className="w-4 h-4" />
            {compact ? 'Send My Message →' : 'Get My Free Strategy Call →'}
          </>
        )}
      </button>
    </form>
  );
}
