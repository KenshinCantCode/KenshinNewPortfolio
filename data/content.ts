import type { IconType } from "react-icons";
import {
  SiCisco,
  SiCss,
  SiFramer,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNextdotjs,
  SiOpenjdk,
  SiPhp,
  SiPython,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export interface Project {
  title: string;
  desc: string;
  tags: string[];
  link?: string;
  image?: string;
  alt?: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  image: string;
  width: number;
  height: number;
  alt: string;
}

export interface Tool {
  name: string;
  desc: string;
  icon: IconType;
  color: string;
}

/* Words that the hero types out one after another. */
export const ROLES: string[] = ["Full-Stack Web Developer", "UI/UX Designer", "Graphic Designer"];

/* Scrolling bands under the hero. */
export const MARQUEE_ROLES: string[] = ["Web Developer", "UI/UX Designer", "Graphic Designer"];
export const MARQUEE_SERVICES: string[] = [
  "Responsive websites",
  "Web systems",
  "Visual identities",
  "UI/UX design",
  "Graphic design",
];

/* TO ADD A PROJECT: copy one { ... } block, paste it after a comma, and change the text.
   image is optional. Save the screenshot in public/images and write image: "/images/my-project.jpg". */
export const PROJECTS: Project[] = [
  {
    title: "School Forms",
    desc: "A capstone website where senior high school students can quickly find and download school forms.",
    tags: ["HTML", "CSS", "JavaScript", "Front end"],
    link: "https://phinma-uiform.netlify.app/",
    image: "/images/p1.jpg",
  },
  {
    title: "Application and Appointment System",
    desc: "An easy way to apply and book appointments for businesses, services and government offices, with a dashboard for status and notifications.",
    tags: ["Full stack", "PHP", "MySQL"],
    link: "https://nbiclearanceken.gamer.gd/",
    image: "/images/p2.jpg",
  },
  {
    title: "Restaurant / Food Website",
    desc: "A restaurant website that shows the menu and the food it serves.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "https://inggosbatchoy.netlify.app/",
    image: "/images/p3.png",
  },
  {
    title: "Lost and Found Website",
    desc: "A Lost and Found project that helps people find items they lost around the campus.",
    tags: ["PHP", "MySQL", "Tailwind"],
    link: "https://lostandfoundui.ct.ws/",
    image: "/images/p4.png",
  },
  {
    title: "Rent A Dorm Iloilo",
    desc: "A Project that helps people find dormitories to rent in Iloilo City.",
    tags: ["React", "Next.js", "Tailwind"],
    link: "https://rentadormiloilo.vercel.app/",
    image: "/images/p5.png",
  },
];

export const TOOLS: Tool[] = [
  { name: "HTML5", desc: "Page structure", icon: SiHtml5, color: "#e34f26" },
  { name: "CSS", desc: "Styling and layout", icon: SiCss, color: "#2965f1" },
  { name: "JavaScript", desc: "Web scripting language", icon: SiJavascript, color: "#f7df1e" },
  { name: "TypeScript", desc: "Typed JavaScript", icon: SiTypescript, color: "#3178c6" },
  { name: "PHP", desc: "Server-side scripting", icon: SiPhp, color: "#8892bf" },
  { name: "MySQL", desc: "Relational database", icon: SiMysql, color: "#00b4d8" },
  { name: "Tailwind CSS", desc: "Utility-first CSS", icon: SiTailwindcss, color: "#38bdf8" },
  { name: "Java", desc: "Object-oriented programming language", icon: SiOpenjdk, color: "#f89820" },
  { name: "Python", desc: "Object-oriented programming language", icon: SiPython, color: "#3776ab" },
  { name: "Next.js", desc: "React framework", icon: SiNextdotjs, color: "#ffffff" },
  { name: "Cisco Packet Tracer", desc: "Network simulation", icon: SiCisco, color: "#1ba0d7" },
  { name: "GitHub", desc: "Version control", icon: SiGithub, color: "#a78bfa" },
];

/* TO ADD A CERTIFICATE: save the image in public/images and add a block here. */
export const CERTIFICATES: Certificate[] = [
  {
    title: "Networking Basics",
    issuer: "Cisco Networking Academy",
    date: "13 Oct 2026",
    image: "/images/certificate1.png",
    width: 1198,
    height: 804,
    alt: "Cisco Networking Academy certificate for Networking Basics awarded to Kenshin Entero Ruiz",
  },
  {
    title: "Web Development Basics",
    issuer: "IBM SkillsBuild",
    date: "26 Oct 2026",
    image: "/images/certificate2.png",
    width: 1063,
    height: 650,
    alt: "IBM SkillsBuild completion certificate for Web Development Basics awarded to Kenshin Ruiz",
  },
];

export const LINKS = {
  github: "https://github.com/kenshincantcode",
  githubHandle: "@kenshincantcode",
  facebook: "https://www.facebook.com/profile.php?id=61595081433960",
  formspree: "https://formspree.io/f/xwlljrql",
};

/* 3D scene for the Tools & Stack section.
   Leave this empty to show the built-in 3D cube. To use your own Spline scene:
   1. In Spline, open your scene and choose Export > Code > React.
   2. Copy the scene URL (it ends in .splinecode).
   3. Put it in a .env.local file as NEXT_PUBLIC_SPLINE_SCENE=<your url>, or paste it below. */
export const SPLINE_SCENE: string = process.env.NEXT_PUBLIC_SPLINE_SCENE ?? "";
