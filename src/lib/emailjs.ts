import emailjs from 'emailjs-com';

export interface FormData {
  firstName: string;
  email?: string;
  phone: string;
  message?: string;
  service?: string;
}

export const sendEmail = async (formData: FormData): Promise<void> => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS credentials not configured');
  }

  const templateParams = {
    from_name: formData.firstName,
    from_email: formData.email || 'Not provided',
    phone: formData.phone,
    message: formData.message || 'Not provided',
    service: formData.service || 'General Inquiry',
    to_name: 'eCommittra Team',
    reply_to: formData.email || 'no-reply@eCommittra.com',
  };

  await emailjs.send(serviceId, templateId, templateParams, publicKey);
};

export const isEmailJSConfigured = (): boolean => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  return !!(serviceId && templateId && publicKey);
};
