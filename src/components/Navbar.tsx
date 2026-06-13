import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import { NAV_LINKS, SERVICES_DROPDOWN } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isHome = location.pathname === '/';
  const isTransparent = isHome && !scrolled;

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isTransparent
            ? 'bg-transparent'
            : 'bg-white/95 backdrop-blur-md shadow-nav'
        )}
      >
        <div className="container-main">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex flex-col items-start">
              <span className={cn(
                'text-xl md:text-2xl font-display font-bold tracking-tight transition-colors',
                isTransparent ? 'text-white' : 'text-text-primary'
              )}>
                <span className="text-primary">e</span>
                <span>Committra</span>
              </span>
              <span className={cn(
                'text-[10px] font-body transition-colors -mt-0.5',
                isTransparent ? 'text-white/60' : 'text-text-secondary'
              )}>
                eCommerce Solutions
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <div key={link.label} className="relative"
                  onMouseEnter={() => link.label === 'Services' && setServicesOpen(true)}
                  onMouseLeave={() => link.label === 'Services' && setServicesOpen(false)}
                >
                  <Link
                    to={link.href}
                    className={cn(
                      'text-sm font-medium transition-colors flex items-center gap-1',
                      isTransparent ? 'text-white/90 hover:text-white' : 'text-text-primary hover:text-primary',
                      location.pathname === link.href && 'text-primary'
                    )}
                  >
                    {link.label}
                    {link.label === 'Services' && <ChevronDown className="w-3.5 h-3.5" />}
                  </Link>

                  {/* Services Mega Dropdown */}
                  {link.label === 'Services' && servicesOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[700px]">
                      <div className="bg-white rounded-xl shadow-card-hover border border-gray-100 p-6 grid grid-cols-3 gap-6">
                        <div>
                          <h4 className="text-xs font-utility font-bold uppercase tracking-wider text-primary mb-3">
                            Account Launch
                          </h4>
                          <ul className="space-y-2">
                            {SERVICES_DROPDOWN.accountLaunch.map((s) => (
                              <li key={s.href}>
                                <Link to={s.href} className="text-sm text-text-secondary hover:text-primary transition-colors">
                                  {s.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-utility font-bold uppercase tracking-wider text-primary mb-3">
                            Advertisement
                          </h4>
                          <ul className="space-y-2">
                            {SERVICES_DROPDOWN.advertisement.map((s) => (
                              <li key={s.href}>
                                <Link to={s.href} className="text-sm text-text-secondary hover:text-primary transition-colors">
                                  {s.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-utility font-bold uppercase tracking-wider text-primary mb-3">
                            Management
                          </h4>
                          <ul className="space-y-2">
                            {SERVICES_DROPDOWN.management.map((s) => (
                              <li key={s.href}>
                                <Link to={s.href} className="text-sm text-text-secondary hover:text-primary transition-colors">
                                  {s.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="col-span-3 pt-4 border-t border-gray-100">
                          <h4 className="text-xs font-utility font-bold uppercase tracking-wider text-primary mb-3">
                            More Services
                          </h4>
                          <div className="flex flex-wrap gap-x-4 gap-y-2">
                            {SERVICES_DROPDOWN.moreServices.map((s) => (
                              <Link key={s.href} to={s.href} className="text-sm text-text-secondary hover:text-primary transition-colors">
                                {s.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+918821953915"
                className="inline-flex items-center gap-2 bg-primary text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-primary-dark transition-all hover:shadow-cta hover:scale-[1.02]"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                'lg:hidden p-2 rounded-lg transition-colors',
                isTransparent ? 'text-white' : 'text-text-primary'
              )}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-secondary lg:hidden">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <Link to="/" className="text-xl font-display font-bold text-white">
                <span className="text-primary">e</span>committra
              </Link>
              <button onClick={() => setMobileOpen(false)} className="p-2 text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-6">
              {NAV_LINKS.map((link) => (
                <div key={link.label}>
                  {link.label === 'Services' ? (
                    <div>
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="w-full flex items-center justify-between text-lg font-medium text-white py-3"
                      >
                        {link.label}
                        <ChevronDown className={cn('w-5 h-5 transition-transform', mobileServicesOpen && 'rotate-180')} />
                      </button>
                      {mobileServicesOpen && (
                        <div className="pl-4 space-y-2 pb-4">
                          {[...SERVICES_DROPDOWN.accountLaunch, ...SERVICES_DROPDOWN.advertisement, ...SERVICES_DROPDOWN.management, ...SERVICES_DROPDOWN.moreServices].map((s) => (
                            <Link
                              key={s.href}
                              to={s.href}
                              className="block text-sm text-white/70 hover:text-primary py-1.5"
                            >
                              {s.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={link.href}
                      className="block text-lg font-medium text-white py-3 border-b border-white/10"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-white/10 space-y-3">
              <a
                href="tel:+918821953915"
                className="flex items-center justify-center gap-2 bg-primary text-white font-medium py-3 rounded-lg"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
              <a
                href="https://wa.me/918821953915"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-whatsapp text-white font-medium py-3 rounded-lg"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
