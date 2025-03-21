import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Code, Eye, Mail, MapPin, Github, ArrowRight, Send } from 'lucide-react';

const Index: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [typedText, setTypedText] = useState('');
  const fullText = "Learning sharp. Thinking smart. Staying curious.";
  const typingSpeed = 50;
  
  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(prevText => prevText + fullText.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);
    
    return () => clearInterval(typingInterval);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      if (homeRef.current && scrollPosition < homeRef.current.offsetHeight) {
        setCurrentSection('home');
      } else if (aboutRef.current && scrollPosition < aboutRef.current.offsetTop + aboutRef.current.offsetHeight) {
        setCurrentSection('about');
      } else if (contactRef.current) {
        setCurrentSection('contact');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! (This is a demo - no actual message was sent)');
  };
  
  return (
    <div className={`min-h-screen overflow-x-hidden ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
      <header className="fixed top-0 left-0 right-0 z-50 glass-card px-6 py-4">
        <nav className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-hacker-red font-bold text-xl glowing-border px-3 py-2 inline-block animate-pulse">
            MKM
          </div>
          
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection(homeRef)} 
              className={`nav-link ${currentSection === 'home' ? 'text-white' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection(aboutRef)} 
              className={`nav-link ${currentSection === 'about' ? 'text-white' : ''}`}
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection(contactRef)} 
              className={`nav-link ${currentSection === 'contact' ? 'text-white' : ''}`}
            >
              Contact
            </button>
          </div>
        </nav>
      </header>
      
      <section ref={homeRef} className="min-h-screen pt-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="inline-flex items-center space-x-2 text-hacker-red">
              <Code size={18} className="animate-pulse" />
              <span className="text-sm font-mono tracking-wider">CYBERSECURITY ENTHUSIAST</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Manish Kumar <br />
              <span className="text-gradient">Maharjan</span>
            </h1>
            
            <p className="text-lg text-gray-400 terminal-text typing-cursor">
              {typedText}
            </p>
            
            <p className="text-gray-400 max-w-lg">
              Every system has its weak spots, every puzzle its key. I learn by analyzing patterns, dismantling layers, 
              and putting it all back smarter and stronger.
            </p>
            
            <div className="flex space-x-4 pt-4">
              <button 
                onClick={() => scrollToSection(aboutRef)}
                className="neo-button group"
              >
                <span className="flex items-center">
                  Explore Portfolio
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
                </span>
              </button>
              
              <button 
                onClick={() => scrollToSection(contactRef)}
                className="px-6 py-3 border border-hacker-red/30 text-white rounded-md hover:bg-hacker-red/10 transition-colors duration-300"
              >
                Contact Me
              </button>
            </div>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="glass-card rounded-xl p-6 terminal-text space-y-4 relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-40 h-40 bg-hacker-red/20 rounded-full blur-3xl"></div>
              <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-hacker-red/10 rounded-full blur-3xl"></div>
              
              <div className="flex items-center space-x-2 text-hacker-red mb-4">
                <Terminal size={18} />
                <span>root@mkm:~$</span>
              </div>
              
              <div className="pl-4 space-y-3">
                <div className="animate-slide-in" style={{ animationDelay: '1s' }}>
                  <span className="text-gray-500">{'>'}</span> <span className="text-hacker-red">whoami</span>
                  <p className="text-gray-400 mt-1">Ethical Hacker & Full-Stack Developer</p>
                </div>
                
                <div className="animate-slide-in" style={{ animationDelay: '1.4s' }}>
                  <span className="text-gray-500">{'>'}</span> <span className="text-hacker-red">./list_skills</span>
                  <div className="text-gray-400 mt-1 grid grid-cols-2 gap-2">
                    <span>Penetration Testing</span>
                    <span>Network Security</span>
                    <span>Vulnerability Assessment</span>
                    <span>Web Development</span>
                    <span>Security Automation</span>
                    <span>Ethical Hacking</span>
                  </div>
                </div>
                
                <div className="animate-slide-in" style={{ animationDelay: '1.8s' }}>
                  <span className="text-gray-500">{'>'}</span> <span className="text-hacker-red">cat mission.txt</span>
                  <p className="text-gray-400 mt-1">Securing digital landscapes one vulnerability at a time.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section ref={aboutRef} className="min-h-screen pt-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-hacker-red mb-4">
            <Eye size={18} className="animate-pulse" />
            <span className="text-sm font-mono tracking-wider">ABOUT ME</span>
          </div>
          
          <div className="grid md:grid-cols-7 gap-12">
            <div className="md:col-span-3">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center">
                <span className="text-hacker-red mr-3">MKM</span>
                Manish Kumar Maharjan
              </h2>
              
              <div className="glass-card rounded-xl overflow-hidden animate-fade-in">
                <div className="h-64 md:h-96 bg-hacker-dark relative flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/0a932973-0837-40c7-a1dc-2395a35f3745.png" 
                    alt="Digital hacker with glowing green face" 
                    className="object-contain h-full w-full p-4"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-hacker-dark to-transparent"></div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-4 space-y-6">
              <div className="glass-card rounded-xl p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <p className="text-gray-300 terminal-text">
                  A passionate cybersecurity enthusiast and full-stack developer with a keen interest in ethical hacking, 
                  network security, and security automation. Currently pursuing a Bachelor's degree in Ethical Hacking 
                  and Cyber Security, I am dedicated to developing my skills in identifying and mitigating security vulnerabilities.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass-card rounded-xl p-6 hover:border-hacker-red/30 transition-colors duration-300 animate-fade-in" 
                  style={{ animationDelay: '0.4s' }}
                >
                  <div className="flex items-start space-x-3">
                    <Mail className="text-hacker-red mt-1" size={18} />
                    <div>
                      <h3 className="text-sm text-gray-500 mb-1">Email</h3>
                      <p className="text-gray-200 terminal-text">mmanishnp@gmail.com</p>
                    </div>
                  </div>
                </div>
                
                <div className="glass-card rounded-xl p-6 hover:border-hacker-red/30 transition-colors duration-300 animate-fade-in" 
                  style={{ animationDelay: '0.5s' }}
                >
                  <div className="flex items-start space-x-3">
                    <MapPin className="text-hacker-red mt-1" size={18} />
                    <div>
                      <h3 className="text-sm text-gray-500 mb-1">Location</h3>
                      <p className="text-gray-200 terminal-text">Kathmandu, Nepal</p>
                    </div>
                  </div>
                </div>
                
                <div className="glass-card rounded-xl p-6 hover:border-hacker-red/30 transition-colors duration-300 animate-fade-in" 
                  style={{ animationDelay: '0.6s' }}
                >
                  <div className="flex items-start space-x-3">
                    <Github className="text-hacker-red mt-1" size={18} />
                    <div>
                      <h3 className="text-sm text-gray-500 mb-1">GitHub</h3>
                      <p className="text-gray-200 terminal-text">github.com/itsuserM</p>
                    </div>
                  </div>
                </div>
                
                <div className="glass-card rounded-xl p-6 hover:border-hacker-red/30 transition-colors duration-300 animate-fade-in" 
                  style={{ animationDelay: '0.7s' }}
                >
                  <div className="flex items-start space-x-3">
                    <Code className="text-hacker-red mt-1" size={18} />
                    <div>
                      <h3 className="text-sm text-gray-500 mb-1">Phone</h3>
                      <p className="text-gray-200 terminal-text">+977-9744373128</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-6">
                <button 
                  onClick={() => scrollToSection(contactRef)}
                  className="neo-button group"
                >
                  <span className="flex items-center">
                    Get In Touch
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section ref={contactRef} className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-hacker-red mb-4">
            <Mail size={18} className="animate-pulse" />
            <span className="text-sm font-mono tracking-wider">CONTACT ME</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Let's Work <span className="text-gradient">Together</span></h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="glass-card rounded-xl p-6 terminal-text space-y-4 h-full">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm text-gray-400 block">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full bg-hacker-dark border border-hacker-gray/30 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-hacker-red/50 focus:border-hacker-red/50 transition-colors duration-300" 
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm text-gray-400 block">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full bg-hacker-dark border border-hacker-gray/30 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-hacker-red/50 focus:border-hacker-red/50 transition-colors duration-300" 
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm text-gray-400 block">Message</label>
                    <textarea 
                      id="message" 
                      rows={5} 
                      className="w-full bg-hacker-dark border border-hacker-gray/30 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-hacker-red/50 focus:border-hacker-red/50 transition-colors duration-300 resize-none" 
                      required
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="neo-button group w-full"
                  >
                    <span className="flex items-center justify-center">
                      Send Message
                      <Send className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
                    </span>
                  </button>
                </form>
              </div>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="glass-card rounded-xl p-6 h-full relative overflow-hidden">
                <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-hacker-red/10 rounded-full blur-3xl"></div>
                
                <div className="terminal-text space-y-6 relative z-10">
                  <div className="flex items-center space-x-2 text-hacker-red mb-6">
                    <Terminal size={18} />
                    <span>root@mkm:~$</span>
                  </div>
                  
                  <div className="pl-4 space-y-6">
                    <div>
                      <span className="text-gray-500">{'>'}</span> <span className="text-hacker-red">./connect.sh</span>
                      <p className="text-gray-400 mt-3">Let's connect and discuss how we can collaborate on your project. Whether it's improving security, developing innovative solutions, or solving complex problems, I'm excited to hear from you.</p>
                    </div>
                    
                    <div>
                      <span className="text-gray-500">{'>'}</span> <span className="text-hacker-red">cat availability.txt</span>
                      <p className="text-gray-400 mt-3">I'm currently available for freelance work, internship opportunities, and collaborative projects in the field of cybersecurity and web development.</p>
                    </div>
                    
                    <div>
                      <span className="text-gray-500">{'>'}</span> <span className="text-hacker-red">echo $RESPONSE_TIME</span>
                      <p className="text-gray-400 mt-3">I typically respond within 24 hours. Looking forward to connecting with you!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="bg-hacker-darker border-t border-hacker-red/10 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-hacker-red font-bold text-xl mb-4 md:mb-0">MKM</div>
          
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <p className="text-gray-500 text-sm terminal-text">© {new Date().getFullYear()} Manish Kumar Maharjan. All rights reserved.</p>
            <div className="flex space-x-4">
              <button onClick={() => scrollToSection(homeRef)} className="text-gray-500 hover:text-white transition-colors duration-300 text-sm">Home</button>
              <button onClick={() => scrollToSection(aboutRef)} className="text-gray-500 hover:text-white transition-colors duration-300 text-sm">About</button>
              <button onClick={() => scrollToSection(contactRef)} className="text-gray-500 hover:text-white transition-colors duration-300 text-sm">Contact</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
