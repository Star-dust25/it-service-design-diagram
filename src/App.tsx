import { useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
  type Node,
  type Edge
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode, { type CustomNodeData } from './components/CustomNode';
import { ThemeContext } from './ThemeContext';

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node<CustomNodeData>[] = [
  {
    id: 'root',
    type: 'custom',
    position: { x: 900, y: 0 },
    data: {
      title: 'Gestión del Diseño de Servicios de TI',
      content: [],
      theme: 'root',
      type: 'root',
      hasChildren: true,
    },
  },
  {
    id: 'sec',
    type: 'custom',
    position: { x: 0, y: 400 },
    data: {
      title: 'Seguridad de la Información',
      content: [
        'Confidencialidad, Integridad, Disponibilidad, controles como firewall y copias de seguridad; y cumplimiento con ISO 27001.',
        'Define políticas para proteger la CONFIDENCIALIDAD (acceso autorizado), INTEGRIDAD (exactitud de datos), y DISPONIBILIDAD (acceso oportuno).',
        'Implementa controles técnicos como firewalls y copias de seguridad.',
        'Se alinea con marcos internacionales como ISO 27001.'
      ],
      theme: 'security',
      hasChildren: false,
    },
  },
  {
    id: 'disp',
    type: 'custom',
    position: { x: 1800, y: 400 },
    data: {
      title: 'Disponibilidad de TI',
      content: [
        'SLAs (Service Level Agreement), Tiempo acordado vs Downtime, tolerancia a fallos, redundancia, y la fórmula de disponibilidad.',
        'Garantiza que los sistemas de TI estén operativos y accesibles.',
        'Define métricas clave en SLAs: Tiempo acordado y Tiempo de inactividad (Downtime).',
        'Implementa redundancia para Tolerancia a Fallos.',
        'Fórmula de disponibilidad %: (Tiempo acordado - Downtime) / Tiempo acordado x 100%.'
      ],
      theme: 'availability',
      hasChildren: false,
    },
  },
  {
    id: 'cont',
    type: 'custom',
    position: { x: 0, y: 1400 },
    data: {
      title: 'Continuidad del Servicio',
      content: [
        'BCP (Plan de Continuidad del Negocio), DLP (Plan de Recuperación ante Desastres), y sitios alternos.',
        'Desarrolla planes para la resiliencia operativa y la recuperación ante crisis. Incluye el BCP y el DLP.',
        'Utiliza pruebas de contingencia y sitios alternos para la recuperación.'
      ],
      theme: 'continuity',
      hasChildren: false,
    },
  },
  {
    id: 'risk',
    type: 'custom',
    position: { x: 900, y: 1400 },
    data: {
      title: 'Gestión de Riesgos',
      content: [
        'El proceso de riesgos, Riesgo = Probabilidad x Impacto, matriz de severidad, y métricas de riesgo.',
        'Identifica, evalúa, trata, y monitorea los riesgos de TI.',
        'Utiliza la fórmula: Riesgo = Probabilidad x Impacto.',
        'Emplea una Matriz de Riesgos para clasificar la severidad (de Bajo a Extremo) y monitorear métricas clave.'
      ],
      theme: 'risk',
      hasChildren: false,
    },
  },
  {
    id: 'sla',
    type: 'custom',
    position: { x: 1800, y: 1400 },
    data: {
      title: 'SLA y Tolerancia a Fallos',
      content: [
        'Acuerdos con clientes, balanceadores de carga, y prevención de caídas de servicio.',
        'Establece y gestiona acuerdos de nivel de servicio con los clientes. Equilibra las necesidades de rendimiento y costo.',
        'Implementa soluciones de hardware y red, como balanceadores de carga y redundancia para prevenir interrupciones graves.'
      ],
      theme: 'sla',
      hasChildren: false,
    },
  }
];

export default function App() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Generamos los edges dinámicamente para cambiar su color según el tema
  const edges: Edge[] = [
    { id: 'e-root-sec', source: 'root', target: 'sec', type: 'smoothstep', style: { stroke: isDarkMode ? 'rgba(230,230,230,0.4)' : 'rgba(57,57,58,0.4)', strokeWidth: 4 }, markerEnd: { type: MarkerType.ArrowClosed, color: isDarkMode ? 'rgba(230,230,230,0.4)' : 'rgba(57,57,58,0.4)' } },
    { id: 'e-root-disp', source: 'root', target: 'disp', type: 'smoothstep', style: { stroke: isDarkMode ? 'rgba(230,230,230,0.4)' : 'rgba(57,57,58,0.4)', strokeWidth: 4 }, markerEnd: { type: MarkerType.ArrowClosed, color: isDarkMode ? 'rgba(230,230,230,0.4)' : 'rgba(57,57,58,0.4)' } },
    { id: 'e-root-cont', source: 'root', target: 'cont', type: 'smoothstep', style: { stroke: isDarkMode ? 'rgba(230,230,230,0.4)' : 'rgba(57,57,58,0.4)', strokeWidth: 4 }, markerEnd: { type: MarkerType.ArrowClosed, color: isDarkMode ? 'rgba(230,230,230,0.4)' : 'rgba(57,57,58,0.4)' } },
    { id: 'e-root-risk', source: 'root', target: 'risk', type: 'smoothstep', style: { stroke: isDarkMode ? 'rgba(230,230,230,0.4)' : 'rgba(57,57,58,0.4)', strokeWidth: 4 }, markerEnd: { type: MarkerType.ArrowClosed, color: isDarkMode ? 'rgba(230,230,230,0.4)' : 'rgba(57,57,58,0.4)' } },
    { id: 'e-root-sla', source: 'root', target: 'sla', type: 'smoothstep', style: { stroke: isDarkMode ? 'rgba(230,230,230,0.4)' : 'rgba(57,57,58,0.4)', strokeWidth: 4 }, markerEnd: { type: MarkerType.ArrowClosed, color: isDarkMode ? 'rgba(230,230,230,0.4)' : 'rgba(57,57,58,0.4)' } },
  ];
  const [, , onEdgesChange] = useEdgesState(edges);

  return (
    <ThemeContext.Provider value={isDarkMode}>
      <div 
        className={`w-screen h-screen transition-colors duration-500 ${isDarkMode ? 'dark-theme' : 'light-theme'}`}
        style={{ 
          backgroundColor: isDarkMode ? '#39393A' : '#E6E6E6',
          backgroundImage: isDarkMode ? 'radial-gradient(circle at 50% 0%, #4a4a4b 0%, #39393A 70%)' : 'none'
        }}
      >
        
        {/* Toggle Theme Button */}
        <div className="absolute top-4 right-4 z-50">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`px-4 py-2 rounded-full font-bold shadow-md transition-colors ${isDarkMode ? 'bg-brand-light text-brand-dark hover:bg-white' : 'bg-brand-dark text-brand-light hover:bg-black'}`}
          >
            {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
          </button>
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.2}
        >
          <Background color={isDarkMode ? "#334155" : "#cbd5e1"} gap={24} size={2} />
          <Controls />
          <MiniMap 
            nodeColor={(node: Node) => {
              const data = node.data as CustomNodeData;
              switch (data.theme) {
                case 'root': return '#E9D758';
                case 'security': return '#297373';
                case 'availability': return '#FF8552';
                case 'continuity': return '#297373';
                case 'risk': return '#E9D758';
                case 'sla': return '#FF8552';
                default: return '#E6E6E6';
              }
            }}
            maskColor={isDarkMode ? "rgba(15, 23, 42, 0.7)" : "rgba(230, 230, 230, 0.7)"}
            style={{ backgroundColor: isDarkMode ? '#1e293b' : '#f8fafc' }}
          />
        </ReactFlow>
      </div>
    </ThemeContext.Provider>
  );
}
