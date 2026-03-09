export default function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tarik Tunç",
    alternateName: "Tarık Tunç",
    url: "https://tariktunc.vercel.app",
    jobTitle: "Full Stack Geliştirici",
    description:
      "React, Next.js ve TypeScript alanında uzmanlaşmış Full Stack Geliştirici. Blakfy'de modern web uygulamaları geliştiriyor.",
    worksFor: {
      "@type": "Organization",
      name: "Blakfy",
      url: "https://blakfy.com",
    },
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Node.js",
      "Web Geliştirme",
      "Full Stack Geliştirme",
    ],
    nationality: {
      "@type": "Country",
      name: "Türkiye",
    },
    sameAs: [
      "https://github.com/tariktunc",
      "https://www.linkedin.com/in/tarktunc/",
      "https://twitter.com/tarkktunc",
      "https://medium.com/@tariktunc",
      "https://stackoverflow.com/users/21361438/tar%c4%b1k-tunc",
      "https://www.instagram.com/tarkktunc/",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tarık Tunç — Full Stack Geliştirici Portfolyo",
    url: "https://tariktunc.vercel.app",
    description:
      "Tarık Tunç'un web geliştirme projeleri, blog yazıları ve teknik becerilerini sergileyen portfolyo sitesi.",
    author: {
      "@type": "Person",
      name: "Tarik Tunç",
    },
    inLanguage: ["tr"],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://tariktunc.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Projeler", item: "https://tariktunc.vercel.app/projeler" },
      { "@type": "ListItem", position: 3, name: "Blog", item: "https://blakfy.com/blog" },
      { "@type": "ListItem", position: 4, name: "Hakkımda", item: "https://tariktunc.vercel.app/ben-kimim" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
