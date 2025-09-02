export interface ProjectSkill { icon: string; alt: string }
export interface ProjectItem {
  title: string;
  descriptionShort: string;
  descriptionLong: string;
  imageSrc: string;
  imageAlt: string;
  skills: ProjectSkill[];
}

export const projects: ProjectItem[] = [
  {
    title: "Unbubble",
    descriptionShort:
      "An interactive public installation where visitors can pop bubbles to read responses and share their own based on the daily prompt.",
    descriptionLong:
      "Unbubble is a public installation that invites visitors to engage with thought-provoking prompts by popping bubbles. Each bubble reveals a unique response, and participants are encouraged to share their own insights, creating a dynamic dialogue around the daily theme.",
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
    descriptionShort:
      "Interactive choose-your-own-adventure video experience for World War 2 museum Het Hornemann Huis.",
    descriptionLong:
      "Het Hornemann Huis offers an immersive choose-your-own-adventure video experience that allows visitors to explore the complexities of World War 2 through interactive storytelling. Users can make choices that influence the narrative, providing a personalized and engaging way to learn about history.",
    imageSrc: "/images/projects/hornemann_1.png",
    imageAlt: "Auditorium screen mockup",
    skills: [
      { icon: "/images/skill-icons/js.svg", alt: "JavaScript" },
      { icon: "/images/skill-icons/node.svg", alt: "Node" },
    ],
  },
  {
    title: "Compass",
    descriptionShort: 'Website for a "create-your-own media studio" project.',
    descriptionLong: 'Compass is a website designed for a "create-your-own media studio" project.',
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
    descriptionShort: "3D environment with a monitor and replicated Operating System.",
    descriptionLong: "3D OS is a virtual environment that simulates a desktop experience with a monitor and a fully functional replicated Operating System.",
    imageSrc: "/images/projects/monitor_2.png",
    imageAlt: "Desktop screen mockup",
    skills: [
      { icon: "/images/skill-icons/react.svg", alt: "React" },
      { icon: "/images/skill-icons/threejs.svg", alt: "Three.JS" },
    ],
  },
  {
    title: "Solair",
    descriptionShort:
      "Website and live dashboard for automatic solar panel cleaning device.",
    descriptionLong:
      "Solair is a website and live dashboard designed for an automatic solar panel cleaning device. It provides real-time monitoring and control over the cleaning process, ensuring optimal performance and efficiency.",
    imageSrc: "/images/projects/solair_4.png",
    imageAlt: "Desktop screen mockup",
    skills: [
      { icon: "/images/skill-icons/html.svg", alt: "HTML" },
      { icon: "/images/skill-icons/css.svg", alt: "CSS" },
      { icon: "/images/skill-icons/php.svg", alt: "PHP" },
    ],
  },
];
