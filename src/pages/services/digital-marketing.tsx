import ServicePageTemplate from '@/components/ServicePageTemplate';
import { servicePages } from '@/lib/serviceData';

export default function Page() {
  const data = servicePages['digital-marketing'];
  if (!data) return null;
  return <ServicePageTemplate {...data} />;
}
