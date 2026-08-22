import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Linkedin, MapPin, Send, CheckCircle2, AlertCircle, MailOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import personalData from '@/data/personal.json';
import type { ContactFormData, PersonalData } from '@/types/portfolio.types';
import { ANIMATION } from '@/lib/animations';
import { submitContact, type SubmissionResult } from '@/lib/contactSubmission';

gsap.registerPlugin(ScrollTrigger);

const data = personalData as PersonalData;

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: ANIMATION.DURATIONS.slow,
          ease: ANIMATION.EASINGS.outExpo,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 90%',
          },
        }
      );

      // Form animation
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: ANIMATION.DURATIONS.slow,
          ease: ANIMATION.EASINGS.outExpo,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 90%',
          },
        }
      );

      // Info animation
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: ANIMATION.DURATIONS.slow,
          ease: ANIMATION.EASINGS.outExpo,
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 90%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    const submission = await submitContact(formData, data.contact.email);
    setIsSubmitting(false);
    setResult(submission);
    if (submission.status === 'sent' || submission.status === 'handed-off') {
      setFormData({ name: '', email: '', message: '' });
    }
  };

  const resetForm = () => {
    setResult(null);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      aria-label="Contact section"
    >
      {/* Background Elements */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none" />

      <div className="container-wide mx-auto relative z-10">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="font-mono text-sm text-[hsl(var(--primary))] uppercase tracking-wider mb-4 block">
            / Contact
          </span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-[hsl(var(--fg-primary))] mb-6 tracking-tight">
            Let&apos;s <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-lg text-[hsl(var(--fg-secondary))] max-w-2xl mx-auto leading-relaxed">
            Available for EPC and PMC engineering leadership opportunities worldwide
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass-card rounded-3xl p-8"
              aria-label="Contact form"
            >
              {result ? (
                <div className="text-center py-12" role="status" aria-live="polite">
                  {result.status === 'error' ? (
                    <>
                      <div className="w-16 h-16 mx-auto rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                        <AlertCircle className="w-8 h-8 text-red-400" />
                      </div>
                      <h3 className="font-heading font-semibold text-2xl text-[hsl(var(--fg-primary))] mb-2">
                        {result.headline}
                      </h3>
                      <p className="text-[hsl(var(--fg-secondary))] mb-6">{result.detail}</p>
                      <Button type="button" variant="outline" onClick={resetForm} className="btn-secondary">
                        Try again
                      </Button>
                    </>
                  ) : result.status === 'handed-off' ? (
                    <>
                      <div className="w-16 h-16 mx-auto rounded-full bg-cyan-500/20 flex items-center justify-center mb-4">
                        <MailOpen className="w-8 h-8 text-cyan-400" />
                      </div>
                      <h3 className="font-heading font-semibold text-2xl text-[hsl(var(--fg-primary))] mb-2">
                        {result.headline}
                      </h3>
                      <p className="text-[hsl(var(--fg-secondary))] mb-6">{result.detail}</p>
                      <a
                        href={`mailto:${data.contact.email}`}
                        className="text-[hsl(var(--primary))] underline underline-offset-4"
                      >
                        Or open a new draft manually
                      </a>
                      <div className="mt-6">
                        <Button type="button" variant="outline" onClick={resetForm} className="btn-secondary">
                          Compose another message
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-400" />
                      </div>
                      <h3 className="font-heading font-semibold text-2xl text-[hsl(var(--fg-primary))] mb-2">
                        {result.headline}
                      </h3>
                      <p className="text-[hsl(var(--fg-secondary))]">{result.detail}</p>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <h3 className="font-heading font-semibold text-xl text-[hsl(var(--fg-primary))] mb-6">
                    Send a Message
                  </h3>

                  <div className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <Label htmlFor="name" className="text-[hsl(var(--fg-secondary))] mb-2 block">
                        Name <span className="text-[hsl(var(--primary))]">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={`bg-[hsl(var(--input-bg))] border-[hsl(var(--input-border))] text-[hsl(var(--fg-primary))] placeholder:text-[hsl(var(--fg-tertiary))] focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]/20 ${
                          errors.name ? 'border-red-500' : ''
                        }`}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="text-red-400 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <Label htmlFor="email" className="text-[hsl(var(--fg-secondary))] mb-2 block">
                        Email <span className="text-[hsl(var(--primary))]">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className={`bg-[hsl(var(--input-bg))] border-[hsl(var(--input-border))] text-[hsl(var(--fg-primary))] placeholder:text-[hsl(var(--fg-tertiary))] focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]/20 ${
                          errors.email ? 'border-red-500' : ''
                        }`}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-red-400 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div>
                      <Label htmlFor="message" className="text-[hsl(var(--fg-secondary))] mb-2 block">
                        Message <span className="text-[hsl(var(--primary))]">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project or opportunity..."
                        rows={5}
                        className={`bg-[hsl(var(--input-bg))] border-[hsl(var(--input-border))] text-[hsl(var(--fg-primary))] placeholder:text-[hsl(var(--fg-tertiary))] focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]/20 resize-none ${
                          errors.message ? 'border-red-500' : ''
                        }`}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                      />
                      {errors.message && (
                        <p id="message-error" className="text-red-400 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-5 h-5" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </div>
                </>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="lg:col-span-2 space-y-6">
            {/* Availability Card */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-sm text-green-400 uppercase tracking-wider">
                  {data.contact.availabilityStatus}
                </span>
              </div>
              <p className="text-[hsl(var(--fg-secondary))] text-sm leading-relaxed">
                {data.contact.availabilityDescription}
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <h3 className="font-heading font-semibold text-[hsl(var(--fg-primary))] mb-4">
                Contact Information
              </h3>

              <a
                href={`mailto:${data.contact.email}`}
                className="flex items-center gap-4 p-4 glass-card rounded-xl group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 flex items-center justify-center group-hover:shadow-glow transition-shadow duration-500">
                  <Mail className="w-5 h-5 text-[hsl(var(--primary))]" />
                </div>
                <div>
                  <div className="font-mono text-xs text-[hsl(var(--fg-tertiary))] uppercase tracking-wider mb-1">
                    Email
                  </div>
                  <div className="text-[hsl(var(--fg-primary))] group-hover:text-[hsl(var(--primary))] transition-colors duration-300">
                    {data.contact.email}
                  </div>
                </div>
              </a>

              <a
                href={data.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 glass-card rounded-xl group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-violet-500/10 flex items-center justify-center group-hover:shadow-glow-violet transition-shadow duration-500">
                  <Linkedin className="w-5 h-5 text-[hsl(var(--secondary))]" />
                </div>
                <div>
                  <div className="font-mono text-xs text-[hsl(var(--fg-tertiary))] uppercase tracking-wider mb-1">
                    LinkedIn
                  </div>
                  <div className="text-[hsl(var(--fg-primary))] group-hover:text-[hsl(var(--secondary))] transition-colors duration-300">
                    {data.contact.linkedin.replace('https://', '')}
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 glass-card rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[hsl(var(--primary))]" />
                </div>
                <div>
                  <div className="font-mono text-xs text-[hsl(var(--fg-tertiary))] uppercase tracking-wider mb-1">
                    Location
                  </div>
                  <div className="text-[hsl(var(--fg-primary))]">
                    {data.contact.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Response */}
            <div className="glass-card rounded-xl p-4 border border-[hsl(var(--primary))]/20">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[hsl(var(--primary))]" />
                <span className="text-[hsl(var(--fg-secondary))] text-sm">
                  {data.contact.responseNote}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
