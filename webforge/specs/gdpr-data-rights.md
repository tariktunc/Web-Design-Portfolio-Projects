# GDPR / KVKK Data Rights Specification

> Auth varsa kullanici verisini silme/disa aktarma hakki YASAL ZORUNLULUK.
> Auth yoksa bu spec gecerli degil.

---

## When Does This Apply?

```
Auth YOK (sadece cookie consent) → Bu spec GECERLI DEGIL
Auth VAR (Clerk/NextAuth + DB)   → Bu spec ZORUNLU
```

---

## User Rights (GDPR Article 15-20, KVKK Madde 11)

| Hak | Ne Demek | Teknik Gereksinim |
|-----|----------|-------------------|
| Erisim hakki | "Hangi verilerim var?" | Veri export endpoint'i |
| Duzeltme hakki | "Bilgilerimi guncelleyeyim" | Profil duzenleme sayfasi |
| Silme hakki (unutulma) | "Tum verilerimi silin" | Hesap silme + cascade delete |
| Tasima hakki | "Verilerimi indireyim" | JSON/CSV export |
| Itiraz hakki | "Pazarlama istemiyorum" | Cookie consent + unsubscribe |

---

## Implementation

### Data Export (Right to Access + Portability)

```typescript
// src/app/api/user/export/route.ts

import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;

  // Collect ALL user data
  const userData = {
    exportDate: new Date().toISOString(),
    format: 'GDPR/KVKK Data Export',

    profile: await db.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true, createdAt: true },
    }),

    preferences: await db.userPreference.findMany({
      where: { userId },
      select: { key: true, value: true, updatedAt: true },
    }),

    blogActivity: {
      bookmarks: await db.bookmark.findMany({
        where: { userId },
        select: { postSlug: true, createdAt: true },
      }),
      comments: await db.comment.findMany({
        where: { userId },
        select: { postSlug: true, content: true, createdAt: true },
      }),
    },

    consentHistory: await db.consentLog.findMany({
      where: { userId },
      select: { categories: true, timestamp: true, action: true },
    }),
  };

  return new Response(JSON.stringify(userData, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="my-data-${userId}.json"`,
    },
  });
}
```

### Account Deletion (Right to Erasure)

```typescript
// src/app/api/user/delete/route.ts

export async function DELETE() {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;

  // CASCADE DELETE — remove ALL user data
  await db.$transaction([
    db.consentLog.deleteMany({ where: { userId } }),
    db.bookmark.deleteMany({ where: { userId } }),
    db.comment.deleteMany({ where: { userId } }),
    db.userPreference.deleteMany({ where: { userId } }),
    db.session.deleteMany({ where: { userId } }),
    db.user.delete({ where: { id: userId } }),
  ]);

  // Clear auth session
  // Clerk: clerk.users.deleteUser(userId)
  // NextAuth: handled by session deletion above

  return Response.json({ success: true, message: 'Account and all data deleted' });
}
```

### Consent Logging (Proof of Consent)

```prisma
// GDPR requires PROOF that consent was given
model ConsentLog {
  id         String   @id @default(cuid())
  userId     String?  // null for anonymous users
  action     String   // "accept_all" | "reject_all" | "custom" | "withdraw"
  categories Json     // { essential: true, analytics: true, marketing: false }
  ipHash     String?  // hashed IP (not raw — privacy)
  userAgent  String?
  timestamp  DateTime @default(now())

  @@index([userId])
  @@index([timestamp])
}
```

```typescript
// Log every consent action
export async function logConsent(
  action: string,
  categories: Record<string, boolean>,
  userId?: string
) {
  await db.consentLog.create({
    data: {
      userId,
      action,
      categories,
      ipHash: hashIP(request.headers.get('x-forwarded-for')),
      userAgent: request.headers.get('user-agent'),
    },
  });
}
```

---

## UI Components

### Account Settings Page
```
/hesap (or /account)
├── Profil Bilgileri
│   ├── Ad Soyad [duzenle]
│   ├── E-posta [duzenle]
│   └── Uyelik tarihi: 15 Mart 2026
│
├── Gizlilik
│   ├── Cerez Tercihleri [degistir]
│   ├── Verilerimi Indir [JSON olarak indir]
│   └── Hesabimi Sil [tehlikeli islem]
│
└── Hesabimi Sil
    ├── "Tum verileriniz kalici olarak silinecektir."
    ├── "Bu islem geri alinamaz."
    ├── [Onay kutucugu] "Anladim, hesabimi silmek istiyorum"
    └── [Hesabimi Sil] butonu (kirmizi, onay dialog'u ile)
```

### Deletion Confirmation Dialog
```
┌────────────────────────────────────────┐
│  Hesabinizi silmek istediginizden      │
│  emin misiniz?                         │
│                                        │
│  Silinecek veriler:                    │
│  • Profil bilgileriniz                 │
│  • Kayitli tercihleriniz               │
│  • Blog yer imleri                     │
│  • Yorum gecmisiniz                    │
│                                        │
│  Bu islem GERi ALINAMAZ.              │
│                                        │
│  Onaylamak icin "HESABIMI SIL" yazin: │
│  [________________]                    │
│                                        │
│  [Iptal]              [Kalici Olarak Sil] │
└────────────────────────────────────────┘
```

---

## Privacy Policy Requirements

When auth exists, privacy policy MUST include:
1. What data is collected (name, email, preferences, activity)
2. Why it's collected (account management, personalization)
3. How long it's stored (until deletion request)
4. Who has access (only site admins)
5. How to request export (settings page or email)
6. How to request deletion (settings page or email)
7. Data processing legal basis (consent or legitimate interest)
8. Data breach notification procedure (72 hours GDPR)
