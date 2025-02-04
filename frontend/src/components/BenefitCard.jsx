import React , {useState, useEffect , useRef} from "react";
const BenefitCard = ({ title, description, children, animationDelay = 0, className = '' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, animationDelay);
          }
        },
        { threshold: 0.2 }
      );
  
      if (cardRef.current) {
        observer.observe(cardRef.current);
      }
  
      return () => {
        if (cardRef.current) {
          observer.unobserve(cardRef.current);
        }
      };
    }, [animationDelay]);
  
    return (
      <div
        ref={cardRef}
        className={`bg-gray-900/50 backdrop-blur-sm rounded-3xl border border-purple-900/30 p-8 transform transition-all duration-1000 ease-out h-full shadow-lg shadow-purple-500/5 hover:shadow-purple-500/10 ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        } ${className}`}
      >
        <h3 className="text-2xl font-bold mb-4 text-purple-400">{title}</h3>
        <p className="text-gray-400 mb-6">{description}</p>
        {children}
      </div>
    );
  };

export default BenefitCard;