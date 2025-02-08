import React , {useState, useEffect, useRef} from "react";
const ContactSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.1 }
      );
  
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
  
      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    }, []);
  
    return (
      <div
        ref={sectionRef}
        className={`bg-gray-950 transition-opacity duration-1000 ease-in-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-20 relative">
          <div className="absolute top-0 right-0 opacity-10">
            <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
              <path d="M0 0L400 400M100 0L400 300M200 0L400 200" stroke="currentColor" strokeWidth="2" className="text-purple-500" />
            </svg>
          </div>
  
          <div className="text-white space-y-6 relative z-10 text-left">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight max-w-2xl text-left">
              Want to Bring your Chain or your Protocol on our app?
            </h2>
            
            <p className="text-gray-400 text-xl text-left">
              Get in Touch with our team to get onboarded
            </p>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <button className="bg-purple-400 text-gray-900 px-6 py-3 rounded-full hover:bg-purple-300 transition-colors shadow-lg shadow-purple-500/50">
                Schedule a Call
              </button>
              <button className="border border-purple-400 text-purple-400 px-6 py-3 rounded-full hover:bg-purple-400/10 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ContactSection;  