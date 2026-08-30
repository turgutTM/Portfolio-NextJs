import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { HiOutlineArrowUpRight } from "react-icons/hi2";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const projectVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const translations = {
  en: {
    title: "Projects",
    description:
      "The products of my passion for web and mobile application development. These projects are full-stack works that were entirely designed and developed by me.",
    githubText: "For more, visit my",
    githubLink: "GitHub",
    profile: "profile.",
    visitLiveSite: "Visit live site",
    githubRepo: "View repo",
    visitSite: "Visit site",
    moreProjects: "More projects",
    underConstruction: "Site under construction — being fixed up",
    goGithubInstead: "View on GitHub instead",
    projects: [
      { title: "Pixel Room", shortDesc: "Interactive portfolio showcase", description: "An immersive 3D portfolio website featuring interactive animations, smooth transitions, and engaging visual effects. Showcases creative web development skills with modern design principles." },
      { title: "Pixel Art Platform", shortDesc: "Canvas-based pixel art creation", description: "Canvas-based pixel art creation platform with social features, XP system, and monthly competitions. Built with Next.js 14, React, MongoDB, and HTML5 Canvas." },
      { title: "Önce Rehabilitasyon", shortDesc: "Professional rehabilitation center", description: "Professional rehabilitation center website with modern design and responsive layout. Features appointment booking, service information, and contact forms." },
      { title: "Kebapçı Kadir", shortDesc: "Restaurant website with menu", description: "Restaurant website with menu display, online ordering system and location information. Modern design with interactive features and mobile optimization." },
      { title: "React Native Notes App", shortDesc: "Mobile note-taking with Appwrite", description: "A cross-platform mobile application for note-taking with real-time synchronization. Built with React Native and Appwrite for backend services, authentication, and storage." },
      { title: "Social Media App", shortDesc: "Real-time posts & interactive comments", description: "A full-stack social media platform with user authentication, real-time posts, and interactive comments. Built using React, Node.js, and MongoDB." },
      { title: "Science Blog App", shortDesc: "Scientific articles & discussions", description: "A platform dedicated to scientific articles and discussions, where users can explore, comment, and share insights. Implemented with Next.js, Node.js, and a responsive layout." },
      { title: "E-commerce AI", shortDesc: "AI-driven product recommendations", description: "A modern e-commerce platform enhanced with AI-driven product recommendations. Built using React, Node.js, MongoDB, and integrated AI features to improve user experience." },
      { title: "Chat App Socket", shortDesc: "Real-time chat with Socket.IO", description: "A real-time chat application utilizing Socket.IO for seamless communication. Features user authentication, group chats, and private channels. Built with React, Node.js, and Express." },
    ],
  },
  tr: {
    title: "Projeler",
    description:
      "Web ve mobil uygulama geliştirme tutkumun ürünleri. Bu projeler tamamen benim tarafımdan tasarlanmış ve geliştirilmiş full-stack çalışmalardır.",
    githubText: "Daha fazlası için",
    githubLink: "GitHub",
    profile: "profilimi ziyaret edin.",
    visitLiveSite: "Canlı siteyi ziyaret et",
    githubRepo: "Repoyu görüntüle",
    visitSite: "Siteyi ziyaret et",
    moreProjects: "Daha fazla proje",
    underConstruction: "Site şu an yapım aşamasında — düzeltiliyor",
    goGithubInstead: "Bunun yerine GitHub'a git",
    projects: [
      { title: "Pixel Room", shortDesc: "İnteraktif portfolyo vitrin", description: "İnteraktif animasyonlar, yumuşak geçişler ve etkileyici görsel efektler içeren sürükleyici 3D portfolyo web sitesi. Modern tasarım ilkeleri ile yaratıcı web geliştirme becerilerini sergiler." },
      { title: "Pixel Art Platform", shortDesc: "Canvas tabanlı pixel sanat yaratımı", description: "Sosyal özellikler, XP sistemi ve aylık yarışmalar içeren canvas tabanlı pixel sanat yaratım platformu. Next.js 14, React, MongoDB ve HTML5 Canvas ile geliştirildi." },
      { title: "Önce Rehabilitasyon", shortDesc: "Profesyonel rehabilitasyon merkezi", description: "Modern tasarım ve duyarlı düzen ile profesyonel rehabilitasyon merkezi web sitesi. Randevu alma, hizmet bilgileri ve iletişim formları içerir." },
      { title: "Kebapçı Kadir", shortDesc: "Menülü restoran web sitesi", description: "Menü gösterimi, online sipariş sistemi ve konum bilgileri içeren restoran web sitesi. İnteraktif özellikler ve mobil optimizasyon ile modern tasarım." },
      { title: "React Native Notes App", shortDesc: "Appwrite ile mobil not alma", description: "Gerçek zamanlı senkronizasyon ile not alma için çapraz platform mobil uygulaması. Backend hizmetleri, kimlik doğrulama ve depolama için React Native ve Appwrite ile geliştirildi." },
      { title: "Social Media App", shortDesc: "Gerçek zamanlı gönderiler ve etkileşimli yorumlar", description: "Kullanıcı kimlik doğrulama, gerçek zamanlı gönderiler ve etkileşimli yorumlar içeren tam yığın sosyal medya platformu. React, Node.js ve MongoDB kullanılarak geliştirildi." },
      { title: "Science Blog App", shortDesc: "Bilimsel makaleler ve tartışmalar", description: "Kullanıcıların keşfedebileceği, yorum yapabileceği ve görüş paylaşabileceği bilimsel makalelere ve tartışmalara adanmış platform. Next.js, Node.js ve duyarlı düzen ile uygulandı." },
      { title: "E-commerce AI", shortDesc: "AI odaklı ürün önerileri", description: "AI odaklı ürün önerileri ile geliştirilmiş modern e-ticaret platformu. Kullanıcı deneyimini iyileştirmek için React, Node.js, MongoDB ve entegre AI özellikleri kullanılarak geliştirildi." },
      { title: "Chat App Socket", shortDesc: "Socket.IO ile gerçek zamanlı sohbet", description: "Sorunsuz iletişim için Socket.IO kullanan gerçek zamanlı sohbet uygulaması. Kullanıcı kimlik doğrulama, grup sohbetleri ve özel kanallar içerir. React, Node.js ve Express ile geliştirildi." },
    ],
  },
};

const Projects = () => {
  const [language, setLanguage] = useState("en");
  const t = translations[language];

  const projects = [
    { id: 0, ...t.projects[0], image: "/pixelroom.png", link: "https://pixelroomtugu.vercel.app", tags: ["Next.js", "React", "Three.js", "Framer Motion"], featured: true },
    { id: 1, ...t.projects[1], image: "/pixelphoto.png", link: "https://pixeltugu.vercel.app", repo: "https://github.com/turgutTM?tab=repositories", underConstruction: true, tags: ["Next.js", "React", "MongoDB", "Canvas"], featured: true },
    { id: 2, ...t.projects[2], image: "/rehabphoto.png", link: "https://ozeloncurehabilitasyon.com", tags: ["Next.js", "React", "Tailwind", "Responsive"] },
    { id: 3, ...t.projects[3], image: "/kebapciphoto.png", link: "https://kebapcikadir.com.tr", tags: ["React", "Tailwind", "Responsive", "Mobile"] },
    { id: 4, ...t.projects[4], image: "/notenative.mov", isVideo: true, repo: "https://github.com/turgutTM/Note-ReactNative", tags: ["React Native", "Appwrite", "Mobile", "Expo"] },
    { id: 5, ...t.projects[5], image: "/Socialmediaphoto.png", repo: "https://github.com/turgutTM/Social-Media-App", tags: ["React", "Node.js", "MongoDB", "Tailwind"] },
    { id: 6, ...t.projects[6], image: "/Scienceproject-photo.png", repo: "https://github.com/turgutTM/Science-Blog-App", tags: ["Next.js", "Node.js", "Express", "Tailwind"] },
    { id: 7, ...t.projects[7], image: "/e-commercephoto.png", repo: "https://github.com/turgutTM/E-commerce-AI", tags: ["React", "Node.js", "AI", "Tailwind"] },
    { id: 8, ...t.projects[8], image: "/chatappphoto.png", repo: "https://github.com/turgutTM/Chat-App-Socket", tags: ["React", "Node.js", "Socket.IO", "Tailwind"] },
  ];

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <div className="bg-white text-black py-24 md:py-32 px-6 md:px-10 border-t border-black/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">
              {t.title}
            </h2>
            <p className="mt-5 text-black/55 text-lg leading-relaxed">
              {t.description}{" "}
              <span className="text-black">
                {t.githubText}{" "}
                <Link
                  href="https://github.com/turgutTM?tab=repositories"
                  target="_blank"
                  className="underline underline-offset-4 font-semibold hover:text-black/60 transition-colors"
                >
                  {t.githubLink}
                </Link>{" "}
                {t.profile}
              </span>
            </p>
          </motion.div>

          <motion.button
            onClick={() => setLanguage(language === "en" ? "tr" : "en")}
            className="shrink-0 w-fit px-5 py-2.5 rounded-full border border-black/20 font-bold text-sm hover:bg-black hover:text-white transition-colors duration-300"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
          >
            {language === "en" ? "TR" : "EN"}
          </motion.button>
        </div>

        <div className="flex flex-col gap-16 mb-8">
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="group grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 border border-black/10 rounded-2xl p-6 md:p-8 hover:border-black/30 transition-colors"
            >
              <Link
                href={project.link || project.repo}
                target="_blank"
                className="lg:col-span-3 relative block h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden bg-black/5"
              >
                {project.isVideo ? (
                  <video
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    src={project.image}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    src={project.image}
                    alt={project.title}
                  />
                )}
                {project.underConstruction && (
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-white text-black border border-black/10">
                    {t.underConstruction}
                  </span>
                )}
              </Link>

              <div className="lg:col-span-2 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-black tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-1 text-black/40 font-medium">{project.shortDesc}</p>
                <p className="mt-4 text-black/60 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-semibold border border-black/15 rounded-full text-black/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={project.underConstruction ? project.repo : project.link || project.repo}
                  target="_blank"
                  className="inline-flex items-center gap-2 mt-7 px-6 py-3 rounded-full bg-black text-white font-semibold w-fit hover:bg-black/85 transition-colors"
                >
                  {project.underConstruction ? (
                    <>
                      <FaGithub size={16} />
                      {t.goGithubInstead}
                    </>
                  ) : project.link ? (
                    <>
                      {t.visitLiveSite}
                      <HiOutlineArrowUpRight size={16} />
                    </>
                  ) : (
                    <>
                      <FaGithub size={16} />
                      {t.githubRepo}
                    </>
                  )}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {otherProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={projectVariants}
              className="group border border-black/10 rounded-2xl overflow-hidden hover:border-black/30 transition-colors"
            >
              <Link
                href={project.link || project.repo}
                target="_blank"
                className="relative block h-48 overflow-hidden bg-black/5"
              >
                {project.isVideo ? (
                  <video
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    src={project.image}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    src={project.image}
                    alt={project.title}
                  />
                )}
              </Link>

              <div className="p-5">
                <h3 className="text-lg font-bold">{project.title}</h3>
                <p className="text-black/40 text-sm font-medium">{project.shortDesc}</p>
                <p className="mt-3 text-sm text-black/55 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-medium border border-black/10 rounded-full text-black/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={project.link || project.repo}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 w-full mt-5 py-2.5 rounded-full border border-black/20 font-semibold text-sm hover:bg-black hover:text-white transition-colors"
                >
                  {project.link ? (
                    <>
                      {t.visitSite}
                      <HiOutlineArrowUpRight size={14} />
                    </>
                  ) : (
                    <>
                      <FaGithub size={14} />
                      {t.githubRepo}
                    </>
                  )}
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mt-16"
        >
          <Link href="https://github.com/turgutTM" target="_blank">
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-black text-white font-bold hover:bg-black/85 transition-colors duration-300">
              {t.moreProjects}
              <HiOutlineArrowUpRight size={18} />
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
