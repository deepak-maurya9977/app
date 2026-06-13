import ServicePageTemplate from '@/components/ServicePageTemplate';
import { servicePages } from '@/lib/serviceData';

export default function Page() {
  const data = servicePages['warehouse-facility'];
  if (!data) return null;
  return <ServicePageTemplate {...data} />;
}
