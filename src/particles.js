// Particle animation for background
export function initParticles() {
    const particlesContainer = document.getElementById('particles-bg');
    if (!particlesContainer) return;

    // Create floating particles
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random properties
        const size = Math.random() * 4 + 2;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.3 + 0.1;

        particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, rgba(102, 126, 234, ${opacity}), transparent);
      border-radius: 50%;
      left: ${startX}%;
      top: ${startY}%;
      animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
      pointer-events: none;
      filter: blur(1px);
    `;

        particlesContainer.appendChild(particle);
    }

    // Add keyframes if not already present
    if (!document.getElementById('particle-keyframes')) {
        const style = document.createElement('style');
        style.id = 'particle-keyframes';
        style.textContent = `
      @keyframes floatParticle {
        0%, 100% {
          transform: translate(0, 0) scale(1);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        25% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.2);
        }
        50% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0.8);
        }
        75% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.1);
        }
      }
    `;
        document.head.appendChild(style);
    }
}

// Initialize on load
if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initParticles);
    } else {
        initParticles();
    }
}
