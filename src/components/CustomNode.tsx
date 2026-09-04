import { useContext } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import { ThemeContext } from '../ThemeContext';

export type CustomNodeData = {
  title: string;
  content: string[];
  theme: 'root' | 'security' | 'availability' | 'continuity' | 'risk' | 'sla';
  hasChildren: boolean;
  type?: string;
};

const themeMap: Record<CustomNodeData['theme'], { text: string; hex: string }> = {
  root: { text: 'text-brand-yellow', hex: 'rgba(233,215,88,1)' },
  security: { text: 'text-brand-teal', hex: 'rgba(41,115,115,1)' },
  availability: { text: 'text-brand-orange', hex: 'rgba(255,133,82,1)' },
  continuity: { text: 'text-brand-teal', hex: 'rgba(41,115,115,1)' },
  risk: { text: 'text-brand-yellow', hex: 'rgba(233,215,88,1)' },
  sla: { text: 'text-brand-orange', hex: 'rgba(255,133,82,1)' }
};

export default function CustomNode({ data, isConnectable }: NodeProps<CustomNodeData>) {
  const isDark = useContext(ThemeContext);
  const theme = themeMap[data.theme] || themeMap.root;

  // Dark Mode Styles
  const darkBg = `bg-[${theme.hex}]/10`;
  const darkBorder = `border-[${theme.hex}]/50`;
  const darkGlow = `shadow-[0_0_25px_${theme.hex.replace(',1)', ',0.3)')}]`;
  const darkGradient = `from-[${theme.hex}]/30 to-transparent`;
  const darkContentBg = 'bg-black/40';
  const darkContentText = 'text-white';

  // Light Mode Styles
  const lightBg = 'bg-white';
  const lightBorder = `border-[${theme.hex}]`;
  const lightGlow = 'shadow-lg';
  const lightGradient = `from-[${theme.hex}]/10 to-transparent`;
  const lightContentBg = 'bg-brand-light/40';
  const lightContentText = 'text-brand-dark';

  const currentBg = isDark ? darkBg : lightBg;
  const currentBorder = isDark ? darkBorder : lightBorder;
  const currentGlow = isDark ? darkGlow : lightGlow;
  const currentGradient = isDark ? darkGradient : lightGradient;
  const currentContentBg = isDark ? darkContentBg : lightContentBg;
  const currentContentText = isDark ? darkContentText : lightContentText;

  // En Light Mode, el texto principal oscuro puede verse mejor para temas claros como el amarillo.
  // Pero como definiste text-brand-yellow, en fondo blanco no se leerá bien. 
  // Usaremos un color de texto más legible en modo claro si es amarillo, o simplemente el brand-dark.
  const isYellow = data.theme === 'root' || data.theme === 'risk';
  const titleTextClass = isDark ? theme.text : (isYellow ? 'text-[#a18f27]' : theme.text);

  return (
    <div
      className={`relative w-[700px] rounded-3xl border-2 ${currentBorder} ${currentBg} ${isDark ? 'backdrop-blur-2xl' : ''} ${currentGlow} overflow-hidden transition-colors duration-500`}
    >
      {data.type !== 'root' && (
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
          className={`w-4 h-4 border-2 ${isDark ? 'border-brand-dark bg-brand-light' : 'border-brand-light bg-brand-dark'} shadow-sm`}
        />
      )}

      {/* Decorative Top Gradient Line */}
      <div className={`h-2 w-full bg-gradient-to-r ${currentGradient} to-transparent`}></div>
      
      {/* Background ambient glow */}
      <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-b ${currentGradient} opacity-20 pointer-events-none`}></div>

      <div className="p-10 flex flex-col gap-6 relative z-10">
        <div className={`flex items-center gap-6 border-b ${isDark ? 'border-brand-light/10' : 'border-brand-dark/10'} pb-6`}>
          <h3 className={`text-3xl font-black tracking-wider uppercase leading-tight ${titleTextClass}`}>
            {data.title}
          </h3>
        </div>
        
        {data.content && data.content.length > 0 && (
          <div className={`text-2xl ${currentContentText} leading-relaxed flex flex-col gap-5 font-medium`}>
            {data.content.map((p: string, i: number) => (
              <p 
                key={i} 
                className={`${currentContentBg} p-5 rounded-xl border-2 ${isDark ? 'border-brand-light/5 shadow-inner' : 'border-brand-dark/5'}`}
              >
                {p}
              </p>
            ))}
          </div>
        )}
      </div>

      {data.hasChildren && (
        <Handle
          type="source"
          position={Position.Bottom}
          isConnectable={isConnectable}
          className={`w-4 h-4 border-2 ${isDark ? 'border-brand-dark bg-brand-light' : 'border-brand-light bg-brand-dark'} shadow-sm`}
        />
      )}
    </div>
  );
}
