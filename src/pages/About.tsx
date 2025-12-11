import { motion } from 'framer-motion';
import {
  Brain, Code, Cloud, Database, Network, Palette, MapPin, Calendar, Briefcase,
  Cpu, Globe, Award, Zap, Server, Shield
} from 'lucide-react';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const skills = [
  { name: 'Data Architecture', icon: Database, description: 'Conceptual → Logical → Physical Modeling' },
  { name: 'Real-time Pipelines', icon: Zap, description: 'Sports Tracking, Kafka, Kinesis' },
  { name: 'Cloud Architecture', icon: Cloud, description: 'AWS, Data Lakes, Distributed Systems' },
  { name: 'Data Governance', icon: Shield, description: 'Security, IAM, Compliance' },
  { name: 'AI/ML Enablement', icon: Brain, description: 'Simulation Systems, Platform Engineering' },
  { name: 'Tech Leadership', icon: Network, description: 'Technology Evaluation & Strategy' },
];

const timeline = [
  {
    year: '2024-Present',
    title: 'Data Architect',
    company: 'Hawk-Eye Innovations',
    description: 'Leading real-time sports data architecture for FIFA, NFL, NHL, ICC, ATP systems.',
  },
  {
    year: '2022-2024',
    title: 'Cloud & Data Architect',
    company: 'Atos',
    description: 'Delivered enterprise cloud/AI solutions, AWS data lakes, and DevSecOps implementations.',
  },
  {
    year: '2012-2023',
    title: 'Systems Engineering Architect',
    company: 'Qatar Public Sector',
    description: 'Designed datacenter/cloud infra for national platforms, including FIFA World Cup 2022 support.',
  },
];

const projects = [
  { name: 'NFL & NHL Tracking', desc: 'Ultra-low latency tracking for officiating and analytics' },
  { name: 'AI Simulation Platform', desc: 'Scalable ML platform for predictive football models' },
  { name: 'Cricket Data Architecture', desc: 'End-to-end pipelines for ball and player tracking' },
  { name: 'SkeleTRACK (FIFA)', desc: 'Real-time skeletal tracking at World Cup' },
  { name: 'Goal-Line Technology', desc: 'Millisecond-accurate decision systems' },
  { name: 'INSIGHT Platform', desc: 'Unified data management & visualization' },
];

const certifications = [
  'AWS Solutions Architect – Professional',
  'AWS DevOps Engineer – Professional',
  'AWS Generative AI Essentials',
  'AWS Global Community Builder (2021)',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <NeuralBackground />
      <Navigation />

      <main className="relative pt-24 pb-16">
        {/* Hero section */}
        <section className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto bg-card/30 backdrop-blur-md rounded-2xl border border-white/10 p-8 md:p-12 shadow-2xl overflow-hidden relative"
          >
            {/* Ambient Background Glow inside card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10 opacity-50 pointer-events-none" />

            <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
              {/* Avatar */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative shrink-0"
              >
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary to-secondary p-1 shadow-xl">
                  <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden relative">
                    <div className="absolute inset-0 bg-primary/5"></div>
                    <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary">AB</span>
                  </div>
                </div>
                <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl -z-10 animate-pulse" />
              </motion.div>

              {/* Bio */}
              <div className="text-center md:text-left flex-1">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 font-heading tracking-tight">
                  About Me
                </h1>
                <p className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 font-medium mb-6">
                  Ajmal Nazir Baba
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-medium text-muted-foreground mb-8">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/50 border border-white/10">
                    <MapPin size={14} className="text-primary" /> London, UK
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/50 border border-white/10">
                    <Briefcase size={14} className="text-primary" /> Data Architect
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/50 border border-white/10">
                    <Globe size={14} className="text-primary" /> Sports Tech
                  </span>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I’m a Data Architect working at the intersection of sports, data, and real-time technology.
                  At Hawk-Eye Innovations, I design the data platforms behind world-leading tracking, officiating,
                  broadcast, and analytics systems used across 20+ global sports.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                  From skeletal tracking and ball-flight modelling to AI simulation platforms and video review systems,
                  I build scalable architectures that turn complex sensor data into instant, reliable insights.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Long bio */}
        <section className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-primary">&gt;</span> My Story
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I’ve always been fascinated by how data can reveal the hidden patterns that define sport.
                Over the years, that curiosity evolved into a career focused on architecting high-performance
                systems that support the world’s biggest sporting events and federations.
              </p>
              <p>
                Before joining Hawk-Eye, I designed enterprise cloud, AI, and datacenter architectures across
                Europe and the Middle East — including platforms used during the FIFA World Cup Qatar 2022.
                Today, I bring that experience into sports technology, building solutions that capture the game
                with precision and deliver insights in milliseconds.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Skills */}
        <section className="container mx-auto px-6 py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <motion.h2
              variants={itemVariants}
              className="text-2xl font-bold mb-8 text-center"
            >
              <span className="text-primary">&gt;</span> Skills & Expertise
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="group p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <skill.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                        {skill.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Timeline */}
        <section className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-8 text-center">
              <span className="text-primary">&gt;</span> Career Timeline
            </h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />

              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-20"
                  >
                    {/* Year marker */}
                    <div className="absolute left-0 w-16 text-right">
                      <span className="text-sm font-bold text-primary glow-text">
                        {item.year}
                      </span>
                    </div>

                    {/* Dot */}
                    <div className="absolute left-[30px] top-1 w-3 h-3 rounded-full bg-primary animate-glow-pulse" />

                    {/* Content */}
                    <div className="p-4 rounded-lg border border-border bg-card/50 hover:border-primary/50 transition-colors">
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm text-primary mb-2">{item.company}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Interests */}
        {/* Key Projects */}
        <section className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-8 text-center">
              <span className="text-primary">&gt;</span> Key Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {projects.map((project, index) => (
                <div key={index} className="p-5 rounded-lg border border-border bg-card/50 hover:bg-card/80 transition-colors flex flex-col justify-center">
                  <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <Server size={16} className="text-primary" /> {project.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{project.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Certifications */}
        <section className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-8 text-center">
              <span className="text-primary">&gt;</span> Certifications & Recognition
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <Award className="text-primary shrink-0" size={20} />
                  <span className="font-medium text-sm">{cert}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Passion */}
        <section className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center bg-card/30 backdrop-blur-sm rounded-xl p-8 md:p-12 border border-white/10"
          >
            <h2 className="text-3xl font-bold mb-6 font-heading">
              <span className="text-primary">&gt;</span> Passion
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed italic">
              "I’m driven by the challenge of shaping the future of sports technology. By blending cloud, AI, and real-time data, I help build systems that don’t just record the game — they transform how it’s played, officiated, and experienced."
            </p>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
