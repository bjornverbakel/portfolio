export interface ProjectSkill { icon: string; alt: string }
export interface ProjectImage {
  src: string;
  alt: string;
}
export interface ProjectItem {
  title: string;
  descriptionShort: string;
  descriptionLong: string;
  images: ProjectImage[];
  skills: ProjectSkill[];
  liveUrl?: string;
}

export const projects: ProjectItem[] = [
  {
    title: "Unbubble",
    descriptionShort:
      "An interactive public installation where visitors can pop bubbles to read responses and share their own based on the daily prompt.",
    descriptionLong:
      "Unbubble is a public installation that invites visitors to engage with daily rotating prompts by popping bubbles. Each bubble reveals an anonymous response of a prior participant, and visitors are encouraged to share their own insights, creating a dialogue around the daily theme. This way people are encouraged to interact with the viewpoints of others, and step out of their bubble.",
    images: [
      { src: "/images/projects/unbubble_1.png", alt: "Advertising screen mockup 1" },
    ],
    skills: [
      { icon: "/images/skill-icons/react.svg", alt: "React" },
      { icon: "/images/skill-icons/threejs.svg", alt: "Three.js" },
      { icon: "/images/skill-icons/tailwind.svg", alt: "Tailwind" },
    ],
    liveUrl: "",
  },
  {
    title: "Het Hornemann Huis",
    descriptionShort:
      "Interactive choose-your-own-adventure video experience for World War 2 museum Het Hornemann Huis.",
    descriptionLong:
      "An interactive choose-your-own-adventure video experience for World War 2 museum Het Hornemann Huis, with the goal of making users think about the various dilemmas people had to go through during the war. Viewers are able to make choices that influence the storyline, providing a personalized and engaging way to learn about history.",
    images: [
      { src: "/images/projects/hornemann_1.png", alt: "Auditorium screen mockup 1" },
      { src: "/images/projects/hornemann_2.png", alt: "Auditorium screen mockup 2" },
      { src: "/images/projects/hornemann_3.png", alt: "Auditorium screen mockup 3" },
    ],
    skills: [
      { icon: "/images/skill-icons/js.svg", alt: "JavaScript" },
      { icon: "/images/skill-icons/node.svg", alt: "Node" },
    ],
    liveUrl: "https://hornemann.onrender.com/videoscreen.html",
  },
  {
    title: "Compass",
    descriptionShort: 'Website for a "create-your-own media studio" project.',
    descriptionLong: 'Compass is a website designed and developed for a "create-your-own media studio" project. The goal was to create a unique visual identity. This was achieved through various storytelling techniques and theming around the client being lost at sea, and the Compass being a guiding tool for their journey.',
    images: [
      { src: "/images/projects/compass_1.png", alt: "Desktop screen mockup 1" },
    ],
    skills: [
      { icon: "/images/skill-icons/html.svg", alt: "HTML" },
      { icon: "/images/skill-icons/css.svg", alt: "CSS" },
      { icon: "/images/skill-icons/figma.svg", alt: "Figma" },
    ],
    liveUrl: "https://compass-pink-eta.vercel.app/",
  },
  {
    title: "3D OS",
    descriptionShort: "3D environment with a monitor and replicated Operating System.",
    descriptionLong: "This is a 3D environment that simulates a desktop experience with a monitor and a functional replicated Operating System.",
    images: [
      { src: "/images/projects/monitor_1.png", alt: "Desktop screen mockup 1" },
    ],
    skills: [
      { icon: "/images/skill-icons/react.svg", alt: "React" },
      { icon: "/images/skill-icons/threejs.svg", alt: "Three.JS" },
    ],
    liveUrl: "https://3d-monitor-lyart.vercel.app/",
  },
  {
    title: "Solair",
    descriptionShort:
      "Website and live dashboard for automatic solar panel cleaning device.",
    descriptionLong:
      "Solair is a website and live dashboard developed for an automatic solar panel cleaning device. It provides real-time monitoring and control over the cleaning process, ensuring optimal performance and efficiency.",
    images: [
      { src: "/images/projects/solair_1.png", alt: "Desktop screen mockup 1" },
      { src: "/images/projects/solair_2.png", alt: "Desktop screen mockup 2" },
      { src: "/images/projects/solair_3.png", alt: "Desktop screen mockup 3" },
    ],
    skills: [
      { icon: "/images/skill-icons/html.svg", alt: "HTML" },
      { icon: "/images/skill-icons/css.svg", alt: "CSS" },
      { icon: "/images/skill-icons/php.svg", alt: "PHP" },
    ],
    liveUrl: "",
  },
];
