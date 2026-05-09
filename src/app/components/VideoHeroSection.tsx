import { motion } from "motion/react";
import { Compass, Calendar, ArrowRight, Play } from "lucide-react";
import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";

export function VideoHeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: Math.random() * 1.5 - 0.75,
        speedY: Math.random() * 0.8 + 0.3,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    let animationFrame: number;

    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.fillStyle = `rgba(242, 230, 201, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.y > canvas.height) {
          particle.y = -10;
          particle.x = Math.random() * canvas.width;
        }
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
      });

      animationFrame = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1D2A] via-[#1A2F3D] to-[#4A3B2A]">
          <motion.div
            className="absolute inset-0 opacity-40"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 50%, rgba(216, 179, 106, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(193, 124, 84, 0.1) 0%, transparent 50%)
              `,
              backgroundSize: "200% 200%",
            }}
          />

          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1/3"
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
            }}
            style={{
              background: "radial-gradient(ellipse at bottom, rgba(216, 179, 106, 0.2) 0%, transparent 70%)",
            }}
          />
        </div>

        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-60" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />

        <motion.div
          className="absolute inset-0"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        >
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.6 + 0.2,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>
      </div>

      <div className="relative h-full flex items-center justify-center px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(216, 179, 106, 0.3)",
                  "0 0 40px rgba(216, 179, 106, 0.6)",
                  "0 0 20px rgba(216, 179, 106, 0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-6"
            >
              <div className="w-2 h-2 bg-[#D8B36A] rounded-full animate-pulse" />
              <span className="text-white/90 tracking-wider text-sm uppercase font-medium">
                Egypt's Premier Desert Platform
              </span>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-6xl md:text-8xl font-bold mb-6 text-white brand-text"
            style={{
              textShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
            }}
          >
            Discover Egypt
            <br />
            <span className="bg-gradient-to-r from-[#D8B36A] via-[#F2E6C9] to-[#D8B36A] bg-clip-text text-transparent">
              Beyond the Nile
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl mb-12 text-white/80 max-w-3xl mx-auto leading-relaxed"
          >
            Explore hidden deserts, luxury eco-camps, stargazing experiences,
            and authentic adventures across Egypt
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/explore"
                className="group relative px-10 py-5 bg-gradient-to-r from-[#D8B36A] via-[#C17C54] to-[#D8B36A] text-white rounded-full overflow-hidden shadow-2xl"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ["-200%", "200%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <span className="relative flex items-center gap-3 font-semibold text-lg">
                  <Compass className="w-6 h-6" />
                  Explore Deserts
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/plan"
                className="group px-10 py-5 bg-white/10 backdrop-blur-lg border-2 border-white/30 text-white rounded-full hover:bg-white/20 transition-all shadow-xl"
              >
                <span className="flex items-center gap-3 font-semibold text-lg">
                  <Calendar className="w-6 h-6" />
                  Plan Your Journey
                </span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-16 flex justify-center gap-12 text-white/60 text-sm"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="text-3xl font-bold text-[#D8B36A]">15+</div>
              <div>Desert Locations</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-3xl font-bold text-[#D8B36A]">50+</div>
              <div>Eco-Camps</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-3xl font-bold text-[#D8B36A]">10K+</div>
              <div>Happy Travelers</div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 cursor-pointer"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm tracking-wider">Scroll to Explore</span>
          <ArrowRight className="w-5 h-5 rotate-90" />
        </div>
      </motion.div>
    </section>
  );
}
