import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [language, setLanguage] = useState('en');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const projectVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const translations = {
    en: {
      title: "Projects",
      description: "The products of my passion for web and mobile application development. These projects are full-stack works that were entirely designed and developed by me.",
      githubText: "For more, visit my",
      githubLink: "GitHub",
      profile: "profile.",
      visitLiveSite: "Visit Live Site",
      githubRepo: "GitHub Repo",
      visitSite: "Visit Site",
      moreProjects: "More Projects",
      underConstruction: "🚧 Site under construction — being fixed up",
      goGithubInstead: "Go GitHub Instead",
      projects: [
        {
          title: "Pixel Room",
          shortDesc: "Interactive portfolio showcase",
          description: "An immersive 3D portfolio website featuring interactive animations, smooth transitions, and engaging visual effects. Showcases creative web development skills with modern design principles."
        },
        {
          title: "Pixel Art Platform",
          shortDesc: "Canvas-based pixel art creation",
          description: "Canvas-based pixel art creation platform with social features, XP system, and monthly competitions. Built with Next.js 14, React, MongoDB, and HTML5 Canvas."
        },
        {
          title: "Önce Rehabilitasyon",
          shortDesc: "Professional rehabilitation center",
          description: "Professional rehabilitation center website with modern design and responsive layout. Features appointment booking, service information, and contact forms."
        },
        {
          title: "Kebapçı Kadir",
          shortDesc: "Restaurant website with menu",
          description: "Restaurant website with menu display, online ordering system and location information. Modern design with interactive features and mobile optimization."
        },
        {
          title: "React Native Notes App",
          shortDesc: "Mobile note-taking with Appwrite",
          description: "A cross-platform mobile application for note-taking with real-time synchronization. Built with React Native and Appwrite for backend services, authentication, and storage."
        },
        {
          title: "Social Media App",
          shortDesc: "Real-time posts & interactive comments",
          description: "A full-stack social media platform with user authentication, real-time posts, and interactive comments. Built using React, Node.js, and MongoDB."
        },
        {
          title: "Science Blog App",
          shortDesc: "Scientific articles & discussions",
          description: "A platform dedicated to scientific articles and discussions, where users can explore, comment, and share insights. Implemented with Next.js, Node.js, and a responsive layout."
        },
        {
          title: "E-commerce AI",
          shortDesc: "AI-driven product recommendations",
          description: "A modern e-commerce platform enhanced with AI-driven product recommendations. Built using React, Node.js, MongoDB, and integrated AI features to improve user experience."
        },
        {
          title: "Chat App Socket",
          shortDesc: "Real-time chat with Socket.IO",
          description: "A real-time chat application utilizing Socket.IO for seamless communication. Features user authentication, group chats, and private channels. Built with React, Node.js, and Express."
        }
      ]
    },
    tr: {
      title: "Projeler",
      description: "Web ve mobil uygulama geliştirme tutkumun ürünleri. Bu projeler tamamen benim tarafımdan tasarlanmış ve geliştirilmiş full-stack çalışmalardır.",
      githubText: "Daha fazlası için",
      githubLink: "GitHub",
      profile: "profilimi ziyaret edin.",
      visitLiveSite: "Canlı Siteyi Ziyaret Et",
      githubRepo: "GitHub Deposu",
      visitSite: "Siteyi Ziyaret Et",
      moreProjects: "Daha Fazla Proje",
      underConstruction: "🚧 Site şu an yapım aşamasında — düzeltiliyor",
      goGithubInstead: "Bunun Yerine GitHub'a Git",
      projects: [
        {
          title: "Pixel Room",
          shortDesc: "İnteraktif portfolyo vitrin",
          description: "İnteraktif animasyonlar, yumuşak geçişler ve etkileyici görsel efektler içeren sürükleyici 3D portfolyo web sitesi. Modern tasarım ilkeleri ile yaratıcı web geliştirme becerilerini sergiler."
        },
        {
          title: "Pixel Art Platform",
          shortDesc: "Canvas tabanlı pixel sanat yaratımı",
          description: "Sosyal özellikler, XP sistemi ve aylık yarışmalar içeren canvas tabanlı pixel sanat yaratım platformu. Next.js 14, React, MongoDB ve HTML5 Canvas ile geliştirildi."
        },
        {
          title: "Önce Rehabilitasyon",
          shortDesc: "Profesyonel rehabilitasyon merkezi",
          description: "Modern tasarım ve duyarlı düzen ile profesyonel rehabilitasyon merkezi web sitesi. Randevu alma, hizmet bilgileri ve iletişim formları içerir."
        },
        {
          title: "Kebapçı Kadir",
          shortDesc: "Menülü restoran web sitesi",
          description: "Menü gösterimi, online sipariş sistemi ve konum bilgileri içeren restoran web sitesi. İnteraktif özellikler ve mobil optimizasyon ile modern tasarım."
        },
        {
          title: "React Native Notes App",
          shortDesc: "Appwrite ile mobil not alma",
          description: "Gerçek zamanlı senkronizasyon ile not alma için çapraz platform mobil uygulaması. Backend hizmetleri, kimlik doğrulama ve depolama için React Native ve Appwrite ile geliştirildi."
        },
        {
          title: "Social Media App",
          shortDesc: "Gerçek zamanlı gönderiler ve etkileşimli yorumlar",
          description: "Kullanıcı kimlik doğrulama, gerçek zamanlı gönderiler ve etkileşimli yorumlar içeren tam yığın sosyal medya platformu. React, Node.js ve MongoDB kullanılarak geliştirildi."
        },
        {
          title: "Science Blog App",
          shortDesc: "Bilimsel makaleler ve tartışmalar",
          description: "Kullanıcıların keşfedebileceği, yorum yapabileceği ve görüş paylaşabileceği bilimsel makalelere ve tartışmalara adanmış platform. Next.js, Node.js ve duyarlı düzen ile uygulandı."
        },
        {
          title: "E-commerce AI",
          shortDesc: "AI odaklı ürün önerileri",
          description: "AI odaklı ürün önerileri ile geliştirilmiş modern e-ticaret platformu. Kullanıcı deneyimini iyileştirmek için React, Node.js, MongoDB ve entegre AI özellikleri kullanılarak geliştirildi."
        },
        {
          title: "Chat App Socket",
          shortDesc: "Socket.IO ile gerçek zamanlı sohbet",
          description: "Sorunsuz iletişim için Socket.IO kullanan gerçek zamanlı sohbet uygulaması. Kullanıcı kimlik doğrulama, grup sohbetleri ve özel kanallar içerir. React, Node.js ve Express ile geliştirildi."
        }
      ]
    }
  };

  const t = translations[language];

  const projects = [
    {
      id: 0,
      title: t.projects[0].title,
      shortDesc: t.projects[0].shortDesc,
      description: t.projects[0].description,
      image: "/pixelroom.png",
      link: "https://pixelroomtugu.vercel.app",
      tags: ["Next.js", "React", "Three.js", "Framer Motion"],
      featured: true,
    },
    {
      id: 1,
      title: t.projects[1].title,
      shortDesc: t.projects[1].shortDesc,
      description: t.projects[1].description,
      image: "/pixelphoto.png",
      link: "https://pixeltugu.vercel.app",
      repo: "https://github.com/turgutTM?tab=repositories",
      underConstruction: true,
      tags: ["Next.js", "React", "MongoDB", "Canvas"],
      featured: true,
    },
    {
      id: 2,
      title: t.projects[2].title,
      shortDesc: t.projects[2].shortDesc,
      description: t.projects[2].description,
      image: "/rehabphoto.png",
      link: "https://ozeloncurehabilitasyon.com",
      tags: ["Next.js", "React", "Tailwind", "Responsive"],
    },
    {
      id: 3,
      title: t.projects[3].title,
      shortDesc: t.projects[3].shortDesc,
      description: t.projects[3].description,
      image: "/kebapciphoto.png",
      link: "https://kebapcikadir.com.tr",
      tags: ["React", "Tailwind", "Responsive", "Mobile"],
    },
    {
      id: 4,
      title: t.projects[4].title,
      shortDesc: t.projects[4].shortDesc,
      description: t.projects[4].description,
      image: "/notenative.mov",
      isVideo: true,
      repo: "https://github.com/turgutTM/Note-ReactNative",
      tags: ["React Native", "Appwrite", "Mobile", "Expo"],
    },
    {
      id: 5,
      title: t.projects[5].title,
      shortDesc: t.projects[5].shortDesc,
      description: t.projects[5].description,
      image: "/Socialmediaphoto.png",
      repo: "https://github.com/turgutTM/Social-Media-App",
      tags: ["React", "Node.js", "MongoDB", "Tailwind"],
    },
    {
      id: 6,
      title: t.projects[6].title,
      shortDesc: t.projects[6].shortDesc,
      description: t.projects[6].description,
      image: "/Scienceproject-photo.png",
      repo: "https://github.com/turgutTM/Science-Blog-App",
      tags: ["Next.js", "Node.js", "Express", "Tailwind"],
    },
    {
      id: 7,
      title: t.projects[7].title,
      shortDesc: t.projects[7].shortDesc,
      description: t.projects[7].description,
      image: "/e-commercephoto.png",
      repo: "https://github.com/turgutTM/E-commerce-AI",
      tags: ["React", "Node.js", "AI", "Tailwind"],
    },
    {
      id: 8,
      title: t.projects[8].title,
      shortDesc: t.projects[8].shortDesc,
      description: t.projects[8].description,
      image: "/chatappphoto.png",
      repo: "https://github.com/turgutTM/Chat-App-Socket",
      tags: ["React", "Node.js", "Socket.IO", "Tailwind"],
    },
  ];

  return (
    <div
      id="projects"
      className="
        bg-gradient-to-b
        from-black/85
        via-[#070707]/80
        to-[#131212]/85
        backdrop-blur-[2px]
        py-24
        px-4
        md:px-6
        text-white
        relative
        overflow-hidden
      "
    >


      <div className="starry-bg absolute inset-0 opacity-60"></div>
      
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-900/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-16 relative z-10">
        <div className="flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="inline-block relative"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500 text-6xl md:text-7xl font-bold">
              {t.title}
            </span>
            <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
          </motion.div>
          
          <motion.div
            className="w-full md:w-[40rem] text-center font-mono"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-300 text-lg">
              {t.description}
              <br className="hidden md:block" />
              <span className="text-purple-300 inline-block mt-2">
                {t.githubText}{" "}
                <Link
                  href="https://github.com/turgutTM?tab=repositories"
                  target="_blank"
                  className="underline text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                >
                  {t.githubLink}
                </Link>{" "}
                {t.profile}
              </span>
            </p>
          </motion.div>

          {/* Language Toggle Button */}
          <motion.button
            onClick={() => setLanguage(language === 'en' ? 'tr' : 'en')}
            className="
              bg-gradient-to-r
              from-purple-600
              to-indigo-600
              hover:from-purple-500
              hover:to-indigo-500
              px-6
              py-2
              rounded-full
              text-white
              font-bold
              text-sm
              transition-all
              duration-300
              shadow-lg
              shadow-purple-500/30
              border
              border-purple-500/30
              mt-4
            "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
          >
            {language === 'en' ? 'TR' : 'EN'}
          </motion.button>
        </div>

        {projects.filter(p => p.featured).map(project => (
          <motion.div
            key={project.id}
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div
              className="group/card relative bg-gradient-to-br from-purple-900/30 to-indigo-900/30 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/20 shadow-2xl overflow-hidden transition-all duration-300 hover:border-purple-400/40"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgba(168,139,250,0.12), transparent 70%)",
                }}
              ></div>
              <div className="relative flex flex-col lg:flex-row gap-8">
                <div className="relative w-full lg:w-3/5 overflow-hidden rounded-xl group">
                  <Link href={project.link || project.repo} target="_blank">
                    <div className="relative h-72 lg:h-96 overflow-hidden rounded-xl">
                      {project.isVideo ? (
                        <video
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          src={project.image}
                          alt={project.title}
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      ) : (
                        <img
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          src={project.image}
                          alt={project.title}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                      {project.underConstruction && (
                        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/90 text-black shadow-lg">
                          🚧 Under Construction
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-3xl font-bold text-white">{project.title}</h3>
                      <p className="text-gray-300 mt-2">{project.shortDesc}</p>
                    </div>
                  </Link>
                </div>

                <div className="w-full lg:w-2/5 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-4 lg:hidden">{project.title}</h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-2">{project.description}</p>

                  {project.underConstruction && (
                    <p className="text-yellow-400/90 text-sm font-medium mb-4">
                      {t.underConstruction}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm font-medium bg-purple-900/50 text-purple-200 rounded-full border border-purple-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={project.underConstruction ? project.repo : (project.link || project.repo)}
                    target="_blank"
                    className="
                      bg-gradient-to-r
                      from-purple-600
                      to-indigo-600
                      px-6
                      py-3
                      rounded-lg
                      text-white
                      font-bold
                      tracking-wide
                      hover:from-purple-500
                      hover:to-indigo-500
                      transition
                      shadow-lg
                      shadow-purple-500/20
                      flex
                      items-center
                      justify-center
                      gap-2
                      w-full
                      md:w-auto
                    "
                  >
                    {project.underConstruction ? (
                      <>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        {t.goGithubInstead}
                      </>
                    ) : project.link ? (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                        {t.visitLiveSite}
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        {t.githubRepo}
                      </>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.filter(p => !p.featured).map((project) => (
            <motion.div
              key={project.id}
              className="relative bg-gradient-to-br from-gray-900/70 to-black/70 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 shadow-xl transform transition-all duration-300 hover:shadow-purple-500/10 hover:border-purple-500/30 hover:-translate-y-1 group"
              variants={projectVariants}
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="relative h-60">
                <Link href={project.link || project.repo} target="_blank">
                  {project.isVideo ? (
                    <video
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src={project.image}
                      alt={project.title}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src={project.image}
                      alt={project.title}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                </Link>
                
                <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                  <p className="text-gray-300 text-sm">{project.shortDesc}</p>
                </div>
              </div>
              
              <div className="p-5">
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-medium bg-gray-800 text-gray-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Link
                  href={project.link || project.repo}
                  target="_blank"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    w-full
                    bg-gradient-to-r
                    from-purple-600/80
                    to-indigo-600/80
                    hover:from-purple-500
                    hover:to-indigo-500
                    py-2
                    rounded-lg
                    text-white
                    font-medium
                    transition-all
                    duration-300
                  "
                >
                  {project.link ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                      {t.visitSite}
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
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
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <Link href="https://github.com/turgutTM" target="_blank">
            <button
              className="
                relative
                group
                overflow-hidden
                px-8
                py-4
                rounded-full
                bg-gradient-to-r
                from-purple-600
                to-indigo-600
                text-white
                font-bold
                tracking-wide
                shadow-lg
                shadow-purple-500/30
                hover:shadow-purple-500/50
                transition-all
                duration-300
              "
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>{t.moreProjects}</span>
                <svg 
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
              <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
            </button>
          </Link>
        </motion.div>
      </div>
      
      <style jsx>{`
        .starry-bg {
          background-image: radial-gradient(circle at 20% 35%, rgba(128, 78, 214, 0.08) 0%, transparent 20%),
                            radial-gradient(circle at 75% 75%, rgba(65, 88, 208, 0.08) 0%, transparent 20%),
                            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
          background-size: 100% 100%, 100% 100%, 100% 100%;
          background-position: 0% 0%, 0% 0%, 0% 0%;
          animation: starryBackground 20s ease infinite;
        }
        
        @keyframes starryBackground {
          0%, 100% {
            background-position: 0% 0%, 0% 0%, 0% 0%;
          }
          25% {
            background-position: 25% 0%, 75% 25%, 25% 50%;
          }
          50% {
            background-position: 50% 25%, 50% 50%, 50% 75%;
          }
          75% {
            background-position: 75% 50%, 25% 75%, 75% 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Projects;