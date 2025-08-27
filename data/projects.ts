export interface ProjectSkill { icon: string; alt: string }
export interface ProjectItem {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  skills: ProjectSkill[];
}

export const projects: ProjectItem[] = [
  {
    title: "Unbubble",
    description:
      "An interactive public installation where visitors can pop bubbles to read responses and share their own based on the daily prompt.",
    imageSrc: "/images/projects/unbubble.png",
    imageAlt: "Advertising screen mockup",
    skills: [
      { icon: "/images/skill-icons/react.svg", alt: "React" },
      { icon: "/images/skill-icons/threejs.svg", alt: "Three.js" },
      { icon: "/images/skill-icons/tailwind.svg", alt: "Tailwind" },
    ],
  },
  {
    title: "Het Hornemann Huis",
    description:
      "Interactive choose-your-own-adventure video experience for World War 2 museum Het Hornemann Huis.",
    imageSrc: "/images/projects/hornemann_1.png",
    imageAlt: "Auditorium screen mockup",
    skills: [
      { icon: "/images/skill-icons/js.svg", alt: "JavaScript" },
      { icon: "/images/skill-icons/node.svg", alt: "Node" },
    ],
  },
  {
    title: "Compass",
    description: 'Website for a "create-your-own media studio" project.',
    imageSrc: "/images/projects/compass_2.png",
    imageAlt: "Desktop screen mockup",
    skills: [
      { icon: "/images/skill-icons/html.svg", alt: "HTML" },
      { icon: "/images/skill-icons/css.svg", alt: "CSS" },
      { icon: "/images/skill-icons/figma.svg", alt: "Figma" },
    ],
  },
  {
    title: "3D OS",
    description: "3D environment with a monitor and replicated Operating System.",
    imageSrc: "/images/projects/monitor_2.png",
    imageAlt: "Desktop screen mockup",
    skills: [
      { icon: "/images/skill-icons/react.svg", alt: "React" },
      { icon: "/images/skill-icons/threejs.svg", alt: "Three.JS" },
    ],
  },
  {
    title: "Solair",
    description:
      "Website and live dashboard for automatic solar panel cleaning device.",
    imageSrc: "/images/projects/solair_4.png",
    imageAlt: "Desktop screen mockup",
    skills: [
      { icon: "/images/skill-icons/html.svg", alt: "HTML" },
      { icon: "/images/skill-icons/css.svg", alt: "CSS" },
      { icon: "/images/skill-icons/php.svg", alt: "PHP" },
    ],
  },
];
