import React from 'react';
import { Handle, Position } from 'reactflow';
import { motion } from 'framer-motion';

const themeMap = {
  root: {
    bg: 'bg-node-root',
    border: 'border-node-root',
    shadow: 'shadow-node-root',
    text: 'text-node-root',
    gradient: 'from-node-root/20 to-transparent'
  },
  security: {
    bg: 'bg-node-security',
    border: 'border-node-security',
    shadow: 'shadow-node-security',
    text: 'text-node-security',
    gradient: 'from-node-security/20 to-transparent'
  },
  availability: {
    bg: 'bg-node-availability',
    border: 'border-node-availability',
    shadow: 'shadow-node-availability',
    text: 'text-node-availability',
    gradient: 'from-node-availability/20 to-transparent'
  },
  continuity: {
    bg: 'bg-node-continuity',
    border: 'border-node-continuity',
    shadow: 'shadow-node-continuity',
    text: 'text-node-continuity',
    gradient: 'from-node-continuity/20 to-transparent'
  },
  risk: {
    bg: 'bg-node-risk',
    border: 'border-node-risk',
    shadow: 'shadow-node-risk',
    text: 'text-node-risk',
    gradient: 'from-node-risk/20 to-transparent'
  },
  sla: {
    bg: 'bg-node-sla',
    border: 'border-node-sla',
    shadow: 'shadow-node-sla',
    text: 'text-node-sla',
    gradient: 'from-node-sla/20 to-transparent'
  }
};

export default function CustomNode({ data, isConnectable }) {
  const theme = themeMap[data.theme] || themeMap.root;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`relative w-[320px] rounded-2xl border border-white/10 bg-[#1e293b]/80 backdrop-blur-xl shadow-2xl overflow-hidden`}
    >
      {/* Top Handles for incoming connections (except root) */}
      {data.type !== 'root' && (
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
          className="w-3 h-3 border-2 border-[#0f172a] bg-slate-400"
        />
      )}

      {/* Decorative Top Gradient Line */}
      <div className={`h-1 w-full ${theme.bg}`}></div>
      
      {/* Background ambient glow */}
      <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-b ${theme.gradient} opacity-50 pointer-events-none`}></div>

      <div className="p-5 flex flex-col gap-3 relative z-10">
        <h3 className={`text-base font-bold text-center tracking-wide uppercase ${theme.text}`}>
          {data.title}
        </h3>
        
        {data.content && data.content.length > 0 && (
          <div className="text-xs text-slate-300 leading-relaxed flex flex-col gap-2 font-medium">
            {data.content.map((p, i) => (
              <p key={i} className="bg-black/20 p-2 rounded-lg border border-white/5">{p}</p>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Handle for outgoing connections */}
      {data.hasChildren && (
        <Handle
          type="source"
          position={Position.Bottom}
          isConnectable={isConnectable}
          className="w-3 h-3 border-2 border-[#0f172a] bg-slate-400"
        />
      )}
    </motion.div>
  );
}
