export default function AboutSection() {
  return (
    <section
      id="about"
      className="mb-16 scroll-mt-16 sm:mb-24 md:mb-36 md:scroll-mt-24"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-navy/75 px-6 py-5 backdrop-blur sm:-mx-12 sm:px-12 md:sr-only md:relative md:top-auto md:mx-auto md:w-full md:px-0 md:py-0 md:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-lightest-slate md:sr-only">
          About
        </h2>
      </div>

      <div className="space-y-4 text-slate-custom leading-relaxed">
        <p>
          Hello there! I am{" "}
          <span className="font-medium text-lightest-slate">Tarik Tunc</span>, a
          passionate software developer based in Turkey. With a zeal for solving
          product-related problems, I am deeply committed to continuous learning
          and sharing knowledge with peers.
        </p>
        <p>
          Currently, I am crafting digital products at{" "}
          <a
            href="https://blakfy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-lightest-slate hover:text-green transition-colors"
          >
            Blakfy
          </a>
          , building modern web experiences with Next.js, React, and TypeScript.
          I have delivered 9+ client projects spanning e-commerce, tourism,
          beauty, and professional services.
        </p>
        <p>
          My main focus these days is building accessible, human-centered web
          applications. I most enjoy working at the intersection of design and
          engineering — creating pixel-perfect interfaces with thoughtful
          interactions. When I am not coding, you can find me writing about React
          on{" "}
          <a
            href="https://medium.com/@tariktunc"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-lightest-slate hover:text-green transition-colors"
          >
            Medium
          </a>
          .
        </p>
      </div>
    </section>
  );
}
