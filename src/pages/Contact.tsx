import { Mail, MapPin, Phone, Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';
import HeroBanner from '@/components/HeroBanner';
import ScrollReveal from '@/components/ScrollReveal';
import ContactForm from '@/components/ContactForm';
import { BUSINESS } from '@/lib/constants';

export default function Contact() {
  return (
    <div>
      <HeroBanner
        title="Let's Start Your Growth Story"
        subtitle="One message, one call, or one WhatsApp — and you'll have a real conversation with our team within 24 hours. No bots, no automated replies."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact Us', href: '/contact' },
        ]}
      />

      {/* Contact Info Cards */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal>
              <div className="bg-white rounded-2xl p-8 shadow-card text-center border border-gray-50">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-text-primary mb-2">Drop Us an Email</h3>
                <a href={`mailto:${BUSINESS.email}`} className="text-sm text-text-secondary hover:text-primary transition-colors">
                  {BUSINESS.email}
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="bg-white rounded-2xl p-8 shadow-card text-center border border-gray-50">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-text-primary mb-2">Find Us Here</h3>
                <p className="text-sm text-text-secondary">{BUSINESS.address}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-white rounded-2xl p-8 shadow-card text-center border border-gray-50">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-text-primary mb-2">Speak to Us Directly</h3>
                <div className="space-y-1">
                  <a href={`tel:${BUSINESS.phone1}`} className="block text-sm text-text-secondary hover:text-primary transition-colors">
                    {BUSINESS.phone1Label}: {BUSINESS.phone1}
                  </a>
                  <a href={`tel:${BUSINESS.phone2}`} className="block text-sm text-text-secondary hover:text-primary transition-colors">
                    {BUSINESS.phone2Label}: {BUSINESS.phone2}
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Form + Map */}
      <section className="section-padding bg-surface">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <ScrollReveal>
                <div className="bg-white rounded-2xl p-6 md:p-10 shadow-card">
                  <h3 className="text-xl font-display font-semibold text-text-primary mb-6">
                    Tell Us About Your Business
                  </h3>
                  <ContactForm showService />
                </div>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-2">
              <ScrollReveal delay={0.1}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-card h-full min-h-[400px]">
                  <iframe
                    title="eCommittra Location"
                    src={`https://maps.google.com/maps?q=India&t=m&z=4&output=embed&iwloc=near`}
                    className="w-full h-full min-h-[400px] border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-12 bg-white">
        <div className="container-main text-center">
          <ScrollReveal>
            <h3 className="text-lg font-semibold text-text-primary mb-6">Stay Connected — We Post Useful Stuff</h3>
            <div className="flex justify-center gap-4">
              {[
                { Icon: Instagram, href: '#' },
                { Icon: Facebook, href: '#' },
                { Icon: Youtube, href: '#' },
                { Icon: Linkedin, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-12 h-12 rounded-full bg-surface flex items-center justify-center text-text-secondary hover:bg-primary hover:text-white transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
