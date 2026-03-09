"use client";
import { Text, Box, Section } from "@radix-ui/themes";
import Image from "next/image";
import { useAnimeStagger, useAnimeScrollReveal, useAnimeDraggable } from "@/app/hooks/useAnime";

const webSkills = [
  "html", "css", "javascript", "typescript", "sass", "react", "nextjs",
  "redux", "tailwindcss", "nodejs", "express", "mongodb",
];

const cyberSkills = [
  "python", "linux", "bash", "docker", "git", "c",
];

function DraggableSkill({ skill }: { skill: string }) {
  const { ref } = useAnimeDraggable({ cursor: true, releaseEase: "outElastic(2, .3)" });

  return (
    <div ref={ref} className="skill-drag-item cursor-grab active:cursor-grabbing">
      <Image
        src={`https://skillicons.dev/icons?i=${skill}`}
        alt={`${skill} icon`}
        width={30}
        height={30}
        className="initial:w-7 xs:w-10 h-full hover:drop-shadow-[0_0_8px_rgba(100,255,218,0.5)] transition-all duration-300 pointer-events-none"
      />
    </div>
  );
}

export default function SoftwareLanguages() {
  const headingRef = useAnimeScrollReveal(".sw-heading", {
    translateX: [-60, 0],
    translateY: [0, 0],
    duration: 800,
  });
  const textRef = useAnimeScrollReveal(".sw-text", {
    translateY: [40, 0],
    duration: 900,
  });
  const staggerRef = useAnimeStagger(".skill-item", {
    delay: 80,
    from: "center",
  });

  const heading2Ref = useAnimeScrollReveal(".sw-heading-2", {
    translateX: [-60, 0],
    translateY: [0, 0],
    duration: 800,
  });
  const text2Ref = useAnimeScrollReveal(".sw-text-2", {
    translateY: [40, 0],
    duration: 900,
  });
  const stagger2Ref = useAnimeStagger(".skill-item-2", {
    delay: 80,
    from: "center",
  });

  return (
    <Section size={"1"}>
      {/* Web Geliştirme */}
      <Box my={"5"}>
        <div ref={headingRef}>
          <h2 className="sw-heading text-lg xs:text-xl font-bold text-lightest-slate mt-5 mb-5">
            Web Geliştirme Teknoloji Yığını
          </h2>
        </div>
        <div ref={textRef}>
          <Text as="p" color="gray" className="sw-text">
            Tam yığın web geliştirme süreçlerinde kullanılan temel teknolojiler
            ve çerçeveler. Ön yüz (client-side) ve arka yüz (server-side)
            mimarilerinde endüstri standardı araçlar:
          </Text>
        </div>
      </Box>
      <div ref={staggerRef} className="flex gap-5 justify-center items-center flex-wrap">
        {webSkills.map((skill) => (
          <div className="skill-item" key={skill}>
            <DraggableSkill skill={skill} />
          </div>
        ))}
      </div>

      {/* Siber Güvenlik & Sistem */}
      <Box my={"5"} mt={"8"}>
        <div ref={heading2Ref}>
          <h2 className="sw-heading-2 text-lg xs:text-xl font-bold text-lightest-slate mt-5 mb-5">
            Siber Güvenlik ve Sistem Araçları
          </h2>
        </div>
        <div ref={text2Ref}>
          <Text as="p" color="gray" className="sw-text-2">
            Penetrasyon testi (pentest), ağ güvenliği analizi ve savunma
            sistemleri geliştirmede kullanılan programlama dilleri ve
            platform araçları:
          </Text>
        </div>
      </Box>
      <div ref={stagger2Ref} className="flex gap-5 justify-center items-center flex-wrap">
        {cyberSkills.map((skill) => (
          <div className="skill-item-2" key={skill}>
            <DraggableSkill skill={skill} />
          </div>
        ))}
      </div>

      {/* Siber Güvenlik Araçları Listesi */}
      <Box my={"5"} mt={"8"}>
        <h3 className="text-base xs:text-lg font-semibold text-lightest-slate mb-4">
          Kullanılan Güvenlik Araçları
        </h3>
        <div className="grid grid-cols-2 xs:grid-cols-3 gap-3">
          {[
            { name: "Kali Linux", desc: "Penetrasyon testi dağıtımı" },
            { name: "Metasploit", desc: "Exploit çerçevesi" },
            { name: "Burp Suite", desc: "Web uygulama güvenlik testi" },
            { name: "Nmap", desc: "Ağ keşfi ve port tarama" },
            { name: "Wireshark", desc: "Ağ protokol analizörü" },
            { name: "Hydra", desc: "Brute-force saldırı aracı" },
            { name: "John the Ripper", desc: "Parola kırma aracı" },
            { name: "OWASP ZAP", desc: "Zafiyet tarayıcısı" },
            { name: "Aircrack-ng", desc: "Kablosuz ağ güvenlik aracı" },
          ].map((tool) => (
            <div
              key={tool.name}
              className="border border-teal-400/20 rounded-lg p-3 hover:border-teal-400/50 hover:bg-teal-400/5 transition-all duration-300"
            >
              <p className="text-sm font-medium text-lightest-slate">{tool.name}</p>
              <p className="text-xs text-light-slate mt-1">{tool.desc}</p>
            </div>
          ))}
        </div>
      </Box>
    </Section>
  );
}
