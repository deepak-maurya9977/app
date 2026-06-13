import ServicePageTemplate from '@/components/ServicePageTemplate';
import { servicePages } from '@/lib/serviceData';

export default function Page() {
  const data = servicePages['brand-logo-design'];
  if (!data) return null;
  return <ServicePageTemplate {...data} />;
}
