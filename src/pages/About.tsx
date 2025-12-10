import { motion } from 'framer-motion';
import { Brain, Code, Cloud, Database, Network, Palette, MapPin, Calendar, Briefcase } from 'lucide-react';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const skills = [
  { name: 'Machine Learning', icon: Brain, description: 'Deep learning, NLP, computer vision' },
  { name: 'Full-Stack Development', icon: Code, description: 'React, Node.js, TypeScript' },
  { name: 'System Architecture', icon: Network, description: 'Distributed systems, microservices' },
  { name: 'Cloud Infrastructure', icon: Cloud, description: 'AWS, GCP, Kubernetes' },
  { name: 'Data Engineering', icon: Database, description: 'ETL pipelines, data lakes' },
  { name: 'UI/UX Design', icon: Palette, description: 'Design systems, prototyping' },
];

const timeline = [
  {
    year: '2024',
    title: 'Senior AI Engineer',
    company: 'Tech Company',
    description: 'Leading AI initiatives and building ML infrastructure.',
  },
  {
    year: '2022',
    title: 'Full-Stack Developer',
    company: 'Startup Inc',
    description: 'Built scalable web applications and mentored junior developers.',
  },
  {
    year: '2020',
    title: 'Software Engineer',
    company: 'Enterprise Corp',
    description: 'Developed microservices and improved system reliability.',
  },
  {
    year: '2018',
    title: 'CS Graduate',
    company: 'University',
    description: 'Specialized in AI and distributed computing.',
  },
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
            className="max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Avatar */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative shrink-0"
              >
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
                  <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden">
                    <span className="text-5xl font-bold text-gradient">YN</span>
                  </div>
                </div>
                <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl -z-10 animate-pulse" />
              </motion.div>

              {/* Bio */}
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  <span className="text-primary">//</span> About Me
                </h1>
                <p className="text-xl text-primary font-medium mb-4 glow-text">
                  Your Name
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> San Francisco, CA
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase size={14} /> AI Engineer
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> 5+ Years Experience
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                  I'm a passionate developer and AI enthusiast dedicated to building intelligent systems 
                  that make a difference. With a background in computer science and years of experience 
                  in both startups and enterprise environments, I bring a unique perspective to solving 
                  complex problems.
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
                My journey into technology started with a fascination for how things work. 
                As a kid, I would take apart electronics just to understand their inner workings. 
                This curiosity led me to computer science, where I discovered the power of 
                software to create and transform.
              </p>
              <p>
                During my time at university, I became captivated by artificial intelligence 
                and its potential to solve problems that seemed impossible. I spent countless 
                hours exploring neural networks, reinforcement learning, and natural language 
                processing.
              </p>
              <p>
                Today, I work at the intersection of AI and software engineering, building 
                systems that are not only intelligent but also reliable, scalable, and 
                maintainable. I believe that great technology should feel magical while 
                being grounded in solid engineering principles.
              </p>
              <p>
                When I'm not coding, you'll find me reading about cognitive science, hiking 
                in nature, or experimenting with new recipes in the kitchen. I also enjoy 
                contributing to open-source projects and mentoring aspiring developers.
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
        <section className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl font-bold mb-6">
              <span className="text-primary">&gt;</span> Beyond Code
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                '🧠 Cognitive Science',
                '📚 Philosophy',
                '🥾 Hiking',
                '🎮 Game Design',
                '🍳 Cooking',
                '🎵 Music Production',
                '📷 Photography',
                '✍️ Writing',
              ].map((interest) => (
                <span
                  key={interest}
                  className="px-4 py-2 rounded-full border border-border bg-card/50 text-sm hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                >
                  {interest}
                </span>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
