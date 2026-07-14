import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Linkedin, Phone, MapPin, Mail } from 'lucide-react';
import { BUSINESS, NAP } from '@/lib/constants';

export default function Footer() {
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Career', href: '/career' },
    { label: 'Contact Us', href: '/contact' },
  ];

  const serviceLinks = [
    'eCommerce Mgmt',
    'Website Dev',
    'Digital Mktg',
    'Graphic Design',
    'Product Photo',
    'GST Registration',
    'Social Media',
    'Inventory Mgmt',
  ];

  return (
    <footer className="bg-secondary text-white">
      <div className="container-main pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <img
                src="/logo.png"
                alt="eCommittra logo"
                width={36}
                height={36}
                className="w-9 h-9 object-contain"
              />
              <span className="text-2xl font-display font-bold" itemProp="name">
                <span className="text-primary">e</span>Committra
              </span>
            </Link>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              {BUSINESS.tagline}
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[
                { Icon: Instagram, href: '#' },
                { Icon: Facebook, href: '#' },
                { Icon: Youtube, href: '#' },
                { Icon: Linkedin, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-utility font-bold uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-sm font-utility font-bold uppercase tracking-wider mb-5">
              What We Do
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((label) => (
                <li key={label}>
                  <span className="text-sm text-white/70">{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us — LocalBusiness microdata block (Requirement 8.1) */}
          <div itemScope itemType="https://schema.org/LocalBusiness">
            {/* Hidden machine-readable name mirrors the visible brand name in the Brand Column */}
            <meta itemProp="name" content={NAP.name} />
            <h4 className="text-sm font-utility font-bold uppercase tracking-wider mb-5">
              Reach Us Directly
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">{BUSINESS.phone1Label}</p>
                  <a
                    href={`tel:${NAP.telephone}`}
                    itemProp="telephone"
                    className="text-sm text-white/70 hover:text-primary transition-colors"
                  >
                    {NAP.telephone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">{BUSINESS.phone2Label}</p>
                  <a
                    href={`tel:${NAP.telephone2}`}
                    itemProp="telephone"
                    className="text-sm text-white/70 hover:text-primary transition-colors"
                  >
                    {NAP.telephone2}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <a
                  href={`mailto:${NAP.email}`}
                  itemProp="email"
                  className="text-sm text-white/70 hover:text-primary transition-colors"
                >
                  {NAP.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span
                  itemScope
                  itemType="https://schema.org/PostalAddress"
                  itemProp="address"
                  className="text-sm text-white/70"
                >
                  <span itemProp="streetAddress">{NAP.streetAddress}</span>
                  {', '}
                  <span itemProp="addressLocality">{NAP.addressLocality}</span>
                  {', '}
                  <span itemProp="addressRegion">{NAP.addressRegion}</span>
                  {' '}
                  <span itemProp="postalCode">{NAP.postalCode}</span>
                  {', '}
                  <span itemProp="addressCountry">{NAP.addressCountry}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50">
            &copy; {BUSINESS.year} {BUSINESS.name} — Built to grow Indian businesses. All rights reserved.
          </p>
          <Link to="#" className="text-sm text-white/50 hover:text-primary transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
