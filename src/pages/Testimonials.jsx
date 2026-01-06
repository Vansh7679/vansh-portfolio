import React, { useState, useEffect, useCallback } from 'react';
import { motion as Motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    id: 0,
    testimonial:
      "Vansh's work on our IoT project was exceptional. The solution was innovative and perfectly executed.",
    by: 'Rajesh Kumar, CTO at TechVision',
    imgSrc: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: 1,
    testimonial:
      'Outstanding Python developer with deep knowledge of cloud platforms. Highly recommend!',
    by: 'Priya Sharma, Lead Engineer',
    imgSrc:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 2,
    testimonial:
      'Working with Vansh was a pleasure. His full-stack expertise made our project a success.',
    by: 'Amit Patel, Product Manager',
    imgSrc:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 3,
    testimonial:
      'Excellent problem-solving skills and attention to detail. Delivered beyond expectations.',
    by: 'Neha Verma, Tech Lead',
    imgSrc:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 4,
    testimonial:
      "Vansh's AWS expertise helped us scale our infrastructure seamlessly. Great work!",
    by: 'Vikram Singh, DevOps Lead',
    imgSrc:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 5,
    testimonial:
      'Professional, knowledgeable, and always delivers on time. A true asset to any team.',
    by: 'Sneha Reddy, Engineering Manager',
    imgSrc:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 6,
    testimonial:
      'His data analytics skills with PowerBI transformed our business insights.',
    by: 'Rahul Mehta, Data Analyst',
    imgSrc: 'https://i.pravatar.cc/150?img=7'
  },
  {
    id: 7,
    testimonial:
      'Creative solutions and excellent communication throughout the project lifecycle.',
    by: 'Kavita Joshi, Project Lead',
    imgSrc: 'https://i.pravatar.cc/150?img=8'
  }
];


const TestimonialCard = ({
  position,
  testimonial,
  handleMove,
  cardSize,
  isDark
}) => {
  const isCenter = position === 0;

  return (
    <Motion.div
      onClick={() => handleMove(position)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: `calc(-50% + ${(cardSize / 1.5) * position}px)`,
        y: isCenter
          ? 'calc(-50% - 65px)'
          : position % 2
          ? 'calc(-50% + 15px)'
          : 'calc(-50% - 15px)',
        rotate: isCenter ? 0 : position % 2 ? 2.5 : -2.5
      }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      whileHover={!isCenter ? { scale: 1.05 } : {}}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: cardSize,
        height: cardSize,
        cursor: 'pointer',
        background: isCenter
          ? isDark
            ? 'rgb(100, 180, 255)'
            : 'rgb(53, 60, 154)'
          : isDark
          ? 'rgba(33, 37, 65, 0.9)'
          : 'rgba(255, 255, 255, 0.95)',
        color: isCenter
          ? '#ffffff'
          : isDark
          ? 'rgba(255, 255, 255, 0.9)'
          : 'rgb(20, 20, 30)',
        border: `2px solid ${
          isCenter
            ? isDark
              ? 'rgb(100, 180, 255)'
              : 'rgb(53, 60, 154)'
            : isDark
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.1)'
        }`,
        borderRadius: '0.625rem',
        padding: '2rem',
        clipPath:
          'polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)',
        boxShadow: isCenter
          ? '0px 8px 0px 4px rgba(0, 0, 0, 0.1)'
          : 'none',
        zIndex: isCenter ? 10 : 0,
        backdropFilter: 'blur(10px)'
      }}
    >
      <img
        src={testimonial.imgSrc}
        alt={testimonial.by.split(',')[0]}
        style={{
          marginBottom: '1rem',
          height: '3.5rem',
          width: '3rem',
          objectFit: 'cover',
          objectPosition: 'top',
          boxShadow: '3px 3px 0px rgba(0, 0, 0, 0.1)',
          borderRadius: '0.25rem'
        }}
      />
      <h3
        style={{
          fontSize: 'clamp(0.95rem, 2vw, 1.25rem)',
          fontWeight: 500,
          marginBottom: '1rem',
          lineHeight: 1.5
        }}
      >
        "{testimonial.testimonial}"
      </h3>
      <p
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '2rem',
          right: '2rem',
          fontSize: '0.875rem',
          fontStyle: 'italic',
          opacity: 0.8
        }}
      >
        - {testimonial.by}
      </p>
    </Motion.div>
  );
};

const Testimonials = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  /* ✅ THEME SYNC FIX (MINIMAL, SAFE) */
  const [isDark, setIsDark] = useState(
    document.body.classList.contains('dark-theme')
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains('dark-theme'));
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const handleMove = useCallback(
    (steps) => {
      const newList = [...testimonialsList];

      if (steps > 0) {
        for (let i = 0; i < steps; i++) {
          const item = newList.shift();
          newList.push({ ...item, tempId: Math.random() });
        }
      } else {
        for (let i = 0; i < Math.abs(steps); i++) {
          const item = newList.pop();
          newList.unshift({ ...item, tempId: Math.random() });
        }
      }
      setTestimonialsList(newList);
    },
    [testimonialsList]
  );

  useEffect(() => {
    const updateSize = () => {
      const isSmall = window.matchMedia('(max-width: 640px)').matches;
      setCardSize(isSmall ? 290 : 365);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <Motion.div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: '6rem',
        paddingBottom: '4rem',
        background: isDark
          ? 'linear-gradient(135deg, #0f1428 0%, #1a1f3a 50%, #0f1428 100%)'
          : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)'
      }}
    >
      {/* Cards */}
      <div style={{ position: 'relative', width: '100%', height: '500px' }}>
        {testimonialsList.map((testimonial, index) => {
          const centerIndex = Math.floor(testimonialsList.length / 2);
          const position = index - centerIndex;
          if (Math.abs(position) > 3) return null;

          return (
            <TestimonialCard
              key={testimonial.tempId || testimonial.id}
              testimonial={testimonial}
              handleMove={handleMove}
              position={position}
              cardSize={cardSize}
              isDark={isDark}
            />
          );
        })}
      </div>

      {/* ✅ ARROWS (SAME LOGIC, JUST VISIBLE & THEMED) */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem' }}>
        <button
          onClick={() => handleMove(-1)}
          style={{
            background: isDark ? '#1a1f3a' : '#ffffff',
            color: isDark ? '#ffffff' : '#0f1428',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '50%',
            padding: '0.75rem',
            cursor: 'pointer'
          }}
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={() => handleMove(1)}
          style={{
            background: isDark ? '#1a1f3a' : '#ffffff',
            color: isDark ? '#ffffff' : '#0f1428',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '50%',
            padding: '0.75rem',
            cursor: 'pointer'
          }}
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </Motion.div>
  );
};

export default Testimonials;
