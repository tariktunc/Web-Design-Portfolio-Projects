export default function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tarik Tunç",
    url: "https://tariktunc.vercel.app",
    jobTitle: "Full Stack Developer",
    sameAs: [
      "https://github.com/tariktunc",
      "https://www.linkedin.com/in/tarktunc/",
      "https://twitter.com/tarkktunc",
      "https://medium.com/@tariktunc",
      "https://stackoverflow.com/users/21361438/tar%c4%b1k-tunc",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tarik Tunç Portfolio",
    url: "https://tariktunc.vercel.app",
    author: {
      "@type": "Person",
      name: "Tarik Tunç",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://tariktunc.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Laboratory", item: "https://tariktunc.vercel.app/laboratory" },
      { "@type": "ListItem", position: 3, name: "Blog", item: "https://tariktunc.vercel.app/weblog" },
      { "@type": "ListItem", position: 4, name: "Who Am I", item: "https://tariktunc.vercel.app/whoami" },
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
