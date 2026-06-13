import { useState, useRef } from 'react';
import { Rocket, DollarSign, BookOpen, Users, Home, Star, MapPin, Clock, CheckCircle, AlertCircle, Send } from 'lucide-react';
import HeroBanner from '@/components/HeroBanner';
import ScrollReveal from '@/components/ScrollReveal';
import { JOB_POSITIONS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const whyJoin = [
  { icon: <Rocket className="w-6 h-6" />, title: 'Real Ownership From Day 1', desc: 'Make real decisions and see immediate impact' },
  { icon: <DollarSign className="w-6 h-6" />, title: 'Performance-Linked Pay', desc: 'Your results directly impact what you earn' },
  { icon: <BookOpen className="w-6 h-6" />, title: 'Learn the Full eCommerce Stack', desc: 'Grow from platforms to marketing to operations' },
  { icon: <Users className="w-6 h-6" />, title: 'A Team That Has Your Back', desc: 'Small team = everyone knows everyone' },
  { icon: <Home className="w-6 h-6" />, title: 'Flexible Work, Serious Results', desc: 'Remote or office — just deliver the goods' },
  { icon: <Star className="w-6 h-6" />, title: 'Your Ideas Actually Get Implemented', desc: 'Suggest an improvement and watch it happen' },
];

export default function Career() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <div>
      <HeroBanner
        title="Come Build the Future of Indian eCommerce With Us"
        subtitle="eCommittra is not a big corporation with endless hierarchies. We're a fast-moving team of specialists who care deeply about client results — and we're looking for people who feel the same way. If you want your work to genuinely matter, you're in the right place."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Career', href: '/career' },
        ]}
      />

      {/* Why Join Us */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <ScrollReveal>
            <h2 className="text-3xl font-display font-semibold text-text-primary text-center mb-10">
              Why eCommittra Is Different
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyJoin.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <div className="flex items-start gap-4 bg-surface rounded-xl p-5">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">{item.title}</h3>
                    <p className="text-sm text-text-secondary mt-1">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section-padding bg-surface">
        <div className="container-main">
          <ScrollReveal>
            <h2 className="text-3xl font-display font-semibold text-text-primary text-center mb-10">
              We're Hiring — Come Grow With Us
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {JOB_POSITIONS.map((job, i) => (
              <ScrollReveal key={job.title} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-6 shadow-card">
                  <h3 className="font-semibold text-lg text-text-primary">{job.title}</h3>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="inline-flex items-center gap-1 text-xs bg-surface text-text-secondary px-3 py-1 rounded-full">
                      <MapPin className="w-3 h-3" /> {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs bg-surface text-text-secondary px-3 py-1 rounded-full">
                      <Clock className="w-3 h-3" /> {job.type}
                    </span>
                  </div>
                  <button
                    onClick={scrollToForm}
                    className="mt-4 bg-primary text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Apply for This Role →
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section ref={formRef} className="section-padding bg-white">
        <div className="container-main max-w-2xl">
          <ScrollReveal>
            <div className="bg-white rounded-2xl p-6 md:p-10 shadow-card border border-gray-100">
              <h3 className="text-xl font-display font-semibold text-text-primary text-center mb-6">
                Submit Your Application
              </h3>

              {status === 'success' && (
                <div className="flex items-center gap-2 bg-green-50 text-green-700 p-4 rounded-lg mb-6">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">Thank you! We will review your application and get back to you.</span>
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 bg-red-50 text-red-700 p-4 rounded-lg mb-6">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">Something went wrong. Please try again or email us directly.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Full Name <span className="text-primary">*</span></label>
                    <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Email Address <span className="text-primary">*</span></label>
                    <input type="email" required className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm" placeholder="john@email.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Phone Number</label>
                    <input type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm" placeholder="+91 9876543210" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Applying For <span className="text-primary">*</span></label>
                    <select required className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm">
                      <option value="">Select position</option>
                      {JOB_POSITIONS.map((j) => (
                        <option key={j.title} value={j.title}>{j.title}</option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Your Address <span className="text-primary">*</span></label>
                  <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm" placeholder="Full address" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Upload CV/Resume <span className="text-primary">*</span></label>
                  <input type="file" accept=".pdf,.doc,.docx" required className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary-dark" />
                  <p className="text-xs text-text-muted mt-1">PDF, DOC, or DOCX only. Max 5MB.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Cover Letter / Message</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm resize-none" placeholder="Tell us why you'd be a great fit..." />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={cn(
                    'w-full flex items-center justify-center gap-2 bg-primary text-white font-medium py-3.5 rounded-lg hover:bg-primary-dark transition-all disabled:opacity-60'
                  )}
                >
                  {status === 'loading' ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Application
                    </>
                  )}
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
