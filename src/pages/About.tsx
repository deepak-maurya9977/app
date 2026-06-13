import { Check, Linkedin } from 'lucide-react';
import HeroBanner from '@/components/HeroBanner';
import ScrollReveal from '@/components/ScrollReveal';
import StatsCounter from '@/components/StatsCounter';
import FAQAccordion from '@/components/FAQAccordion';
import { TEAM_MEMBERS, COMPANY_VALUES } from '@/lib/constants';

const ABOUT_FAQ = [
  {
    question: 'Who are the founders of eCommittra?',
    answer: 'eCommittra is co-founded and led by Rahul Dwivedi (Owner) and Himanshu Mishra (CEO & Co-Owner), both with deep expertise in Indian eCommerce and digital marketing.',
  },
  {
    question: 'How experienced is the eCommittra team?',
    answer: 'Our team has 5+ years of experience managing marketplace accounts, building eCommerce websites, and running digital marketing campaigns for 500+ clients across India.',
  },
  {
    question: 'What makes eCommittra different from other agencies?',
    answer: 'We combine eCommerce expertise, technology, and creative execution under one roof — with personalized attention from our founders, not just account managers. Your growth is our commitment.',
  },
];

export default function About() {
  return (
    <div>
      <HeroBanner
        title="The Team Behind Your Growth"
        subtitle="Built by Sellers, Run by Experts, Committed to Your Success"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About Us', href: '/about' },
        ]}
      />

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center aspect-square"
                  >
                    <span className="text-3xl font-display font-bold text-gradient-orange">
                      {['Te', 'Of', 'Gr', 'Su'][i - 1]}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <span className="text-xs font-utility font-bold uppercase tracking-[2px] text-primary">
                THE ECOMMITTRA STORY
              </span>
              <h2 className="mt-3 text-3xl font-display font-semibold text-text-primary">
                We Started Because Sellers Deserved Better
              </h2>
              <p className="mt-4 text-text-secondary leading-relaxed">
                eCommittra was built on one belief: that every Indian seller — from a first-time entrepreneur to an established brand — deserves a partner who is as invested in their growth as they are. We provide complete account management, marketplace onboarding, website development, digital marketing, and social media services all under one roof.
              </p>
              <p className="mt-4 text-text-secondary leading-relaxed">
                Today we support hundreds of sellers and brands across Amazon, Flipkart, Meesho, AJIO, Nykaa and Myntra — with strategies grounded in data, listings built for conversion, and execution that never stops at "good enough."
              </p>
              <p className="mt-4 text-text-secondary leading-relaxed">
                Our mission is non-negotiable: be the most committed eCommerce partner our clients have ever worked with — from their very first product listing to the day they become the category leader.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  'Full-Stack Marketplace Support',
                  'Multi-Platform Sales Growth',
                  'Website, Brand & Creative',
                  'Performance Marketing & Ads',
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full"
                  >
                    <Check className="w-4 h-4" />
                    {item}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-surface">
        <div className="container-main">
          <StatsCounter />
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-text-primary text-center mb-12">
              The People Committed to Your Growth
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {TEAM_MEMBERS.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.15}>
                <div className="bg-white rounded-2xl p-8 shadow-card border border-gray-50 text-center">
                  <div className={`w-28 h-28 rounded-full ${member.color} flex items-center justify-center text-white text-3xl font-display font-bold mx-auto mb-5`}>
                    {member.initials}
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mt-1">{member.role}</p>
                  <a href={`tel:${member.phone}`} className="text-sm text-text-secondary hover:text-primary transition-colors mt-1 block">
                    {member.phone}
                  </a>
                  <p className="text-sm text-text-secondary leading-relaxed mt-4">{member.bio}</p>
                  <a href="#" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary/10 text-secondary hover:bg-primary hover:text-white transition-colors mt-4">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-surface">
        <div className="container-main">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-text-primary text-center mb-12">
              What We Stand For
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMPANY_VALUES.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 shadow-card text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <span className="text-primary text-2xl">
                      {v.icon === 'Target' && '◎'}
                      {v.icon === 'Eye' && '◉'}
                      {v.icon === 'Zap' && '⚡'}
                    </span>
                  </div>
                  <h3 className="font-semibold text-xl text-text-primary mb-3">{v.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{v.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-display font-semibold text-text-primary text-center mb-8">
              Everything You Wanted to Ask Us
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <FAQAccordion items={ABOUT_FAQ} />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
