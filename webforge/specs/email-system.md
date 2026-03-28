# Email System Specification

> Progressive: No email service by default. Asked during discovery.
> Contact form works with any provider. Templates are reusable.

---

## Progressive Levels

```
Level 0 (default)    → Form submits to console.log (dev only)
Level 1 (basic)      → Resend / SendGrid / SMTP — transactional emails
Level 2 (advanced)   → + Newsletter, drip campaigns, audience management
```

---

## Discovery Questions

```
E-posta servisi:
- [ ] Resend (modern, ucretli, kolay API — ONERILEN)
- [ ] SendGrid (yaygin, ucretsiz tier)
- [ ] Amazon SES (ucuz, yuksek hacim)
- [ ] Postmark (transactional odakli)
- [ ] SMTP (kendi sunucu)
- [ ] Simdilik gerekmiyor, sonra ekleriz

Ne tur e-postalar gonderilecek?
- [x] Iletisim formu → site sahibine bildirim
- [x] Iletisim formu → gonderene onay
- [ ] Newsletter
- [ ] Hosgeldin e-postasi (kayit sonrasi)
- [ ] Sifre sifirlama (auth varsa)
- [ ] Siparis bildirimi (e-ticaret varsa)
```

---

## Architecture

### Email Service Abstraction

```typescript
// src/lib/email/index.ts

interface EmailService {
  send(options: SendEmailOptions): Promise<EmailResult>;
}

interface SendEmailOptions {
  to: string | string[];
  from?: string;              // defaults to SITE_EMAIL
  replyTo?: string;
  subject: string;
  html: string;
  text?: string;              // plain text fallback
  tags?: string[];            // for analytics
}

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Factory
export function createEmailService(): EmailService {
  const provider = process.env.EMAIL_PROVIDER; // resend | sendgrid | ses | smtp

  switch (provider) {
    case 'resend':    return new ResendService();
    case 'sendgrid':  return new SendGridService();
    case 'ses':       return new AmazonSESService();
    case 'smtp':      return new SMTPService();
    default:          return new ConsoleService(); // dev fallback
  }
}
```

### Provider Implementations

```typescript
// src/lib/email/providers/resend.ts
import { Resend } from 'resend';

export class ResendService implements EmailService {
  private client = new Resend(process.env.RESEND_API_KEY);

  async send(options: SendEmailOptions): Promise<EmailResult> {
    try {
      const { data, error } = await this.client.emails.send({
        from: options.from || process.env.EMAIL_FROM!,
        to: options.to,
        replyTo: options.replyTo,
        subject: options.subject,
        html: options.html,
        text: options.text,
      });
      if (error) return { success: false, error: error.message };
      return { success: true, messageId: data?.id };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }
}

// src/lib/email/providers/console.ts (dev fallback)
export class ConsoleService implements EmailService {
  async send(options: SendEmailOptions): Promise<EmailResult> {
    console.log('=== EMAIL (dev mode) ===');
    console.log('To:', options.to);
    console.log('Subject:', options.subject);
    console.log('Body:', options.text || options.html);
    return { success: true, messageId: 'dev-' + Date.now() };
  }
}
```

### Email Templates (React Email)

```typescript
// src/lib/email/templates/contact-notification.tsx
// Uses @react-email/components for type-safe, styled emails

import { Html, Head, Body, Container, Heading, Text, Hr } from '@react-email/components';

interface ContactNotificationProps {
  name: string;
  email: string;
  phone?: string;
  message: string;
  submittedAt: string;
}

export function ContactNotification({ name, email, phone, message, submittedAt }: ContactNotificationProps) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f5' }}>
        <Container style={{ maxWidth: 600, margin: '0 auto', padding: 20, backgroundColor: '#fff' }}>
          <Heading>Yeni Iletisim Formu</Heading>
          <Hr />
          <Text><strong>Ad Soyad:</strong> {name}</Text>
          <Text><strong>E-posta:</strong> {email}</Text>
          {phone && <Text><strong>Telefon:</strong> {phone}</Text>}
          <Text><strong>Mesaj:</strong></Text>
          <Text>{message}</Text>
          <Hr />
          <Text style={{ color: '#666', fontSize: 12 }}>
            Gonderim: {submittedAt}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
```

```typescript
// src/lib/email/templates/contact-confirmation.tsx
// Auto-reply to the person who submitted the form

export function ContactConfirmation({ name }: { name: string }) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'Arial, sans-serif' }}>
        <Container style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
          <Heading>Mesajiniz Alindi</Heading>
          <Text>Merhaba {name},</Text>
          <Text>
            Mesajiniz basariyla iletildi. En kisa surede size donecegiz.
          </Text>
          <Text>Tesekkurler,<br />[Marka Adi] Ekibi</Text>
        </Container>
      </Body>
    </Html>
  );
}
```

### Contact Form API Route

```typescript
// src/app/api/contact/route.ts

import { createEmailService } from '@/lib/email';
import { contactSchema } from '@/lib/validators/contact';
import { render } from '@react-email/render';
import { ContactNotification } from '@/lib/email/templates/contact-notification';
import { ContactConfirmation } from '@/lib/email/templates/contact-confirmation';

export async function POST(request: Request) {
  // 1. Parse & validate
  const body = await request.json();
  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return Response.json({ error: 'Gecersiz veri', details: result.error.flatten() }, { status: 400 });
  }

  // 2. Honeypot check
  if (body.website) {
    // Hidden field filled = bot
    return Response.json({ success: true }); // fake success to confuse bot
  }

  // 3. Rate limit check (optional)
  // ...

  const { name, email, phone, message } = result.data;
  const email_service = createEmailService();
  const now = new Date().toLocaleString('tr-TR');

  // 4. Send notification to site owner
  await email_service.send({
    to: process.env.CONTACT_EMAIL!,
    replyTo: email,
    subject: `Iletisim Formu: ${name}`,
    html: render(ContactNotification({ name, email, phone, message, submittedAt: now })),
    text: `Ad: ${name}\nE-posta: ${email}\nTelefon: ${phone || '-'}\nMesaj: ${message}`,
  });

  // 5. Send confirmation to user
  await email_service.send({
    to: email,
    subject: 'Mesajiniz Alindi',
    html: render(ContactConfirmation({ name })),
  });

  // 6. Track event (consent-aware)
  // dataLayer.push({ event: 'form_submit', form_name: 'contact' });

  return Response.json({ success: true });
}
```

### Env Variables

```bash
# .env.example
EMAIL_PROVIDER=resend          # resend | sendgrid | ses | smtp
EMAIL_FROM="Site Adi <noreply@site.com>"
CONTACT_EMAIL=info@site.com    # where contact forms go

# Provider-specific
RESEND_API_KEY=re_xxxxx
# OR
SENDGRID_API_KEY=SG.xxxxx
# OR
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=user@gmail.com
SMTP_PASS=app-password
```

---

## File Structure

```
src/lib/email/
├── index.ts                    → createEmailService factory
├── types.ts                    → EmailService interface
├── providers/
│   ├── resend.ts
│   ├── sendgrid.ts
│   ├── ses.ts
│   ├── smtp.ts
│   └── console.ts             → dev fallback
└── templates/
    ├── contact-notification.tsx → owner notification
    ├── contact-confirmation.tsx → user auto-reply
    ├── newsletter-welcome.tsx   → (if newsletter)
    └── layout.tsx              → shared email layout
```
