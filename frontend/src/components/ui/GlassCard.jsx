export default function GlassCard({ children, className = '' }) {
  return (
    <main
      className={`
        w-full max-w-6xl mx-auto 
        bg-dark/60 backdrop-blur-xl 
        rounded-3xl 
        border border-light/20 
        shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_10px_30px_rgba(0,0,0,0.3)] 
        p-6 md:p-8 space-y-6 
        ${className}
      `}
    >
      {children}
    </main>
  );
};