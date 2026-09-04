import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './components/CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes = [
  {
    id: 'root',
    type: 'custom',
    position: { x: 500, y: 50 },
    data: {
      title: 'Gestión del Diseño de Servicios de TI',
      content: [],
      theme: 'root',
      type: 'root',
      hasChildren: true
    },
  },
  {
    id: 'sec',
    type: 'custom',
    position: { x: 150, y: 250 },
    data: {
      title: 'Seguridad de la Información',
      content: [
        'Confidencialidad, Integridad, Disponibilidad, controles como firewall y copias de seguridad; y cumplimiento con ISO 27001.',
        'Define políticas para proteger la CONFIDENCIALIDAD (acceso autorizado), INTEGRIDAD (exactitud de datos), y DISPONIBILIDAD (acceso oportuno).',
        'Implementa controles técnicos como firewalls y copias de seguridad.',
        'Se alinea con marcos internacionales como ISO 27001.'
      ],
      theme: 'security',
      hasChildren: false
    },
  },
  {
    id: 'disp',
    type: 'custom',
    position: { x: 850, y: 250 },
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
      hasChildren: false
    },
  },
  {
    id: 'cont',
    type: 'custom',
    position: { x: 150, y: 700 },
    data: {
      title: 'Continuidad del Servicio',
      content: [
        'BCP (Plan de Continuidad del Negocio), DLP (Plan de Recuperación ante Desastres), y sitios alternos.',
        'Desarrolla planes para la resiliencia operativa y la recuperación ante crisis. Incluye el BCP y el DLP.',
        'Utiliza pruebas de contingencia y sitios alternos para la recuperación.'
      ],
      theme: 'continuity',
      hasChildren: false
    },
  },
  {
    id: 'risk',
    type: 'custom',
    position: { x: 500, y: 700 },
    data: {
      title: 'Gestión de Riesgos',
      content: [
        'El proceso de riesgos, Riesgo = Probabilidad x Impacto, matriz de severidad, y métricas de riesgo.',
        'Identifica, evalúa, trata, y monitorea los riesgos de TI.',
        'Utiliza la fórmula: Riesgo = Probabilidad x Impacto.',
        'Emplea una Matriz de Riesgos para clasificar la severidad (de Bajo a Extremo) y monitorear métricas clave.'
      ],
      theme: 'risk',
      hasChildren: false
    },
  },
  {
    id: 'sla',
    type: 'custom',
    position: { x: 850, y: 700 },
    data: {
      title: 'SLA y Tolerancia a Fallos',
      content: [
        'Acuerdos con clientes, balanceadores de carga, y prevención de caídas de servicio.',
        'Establece y gestiona acuerdos de nivel de servicio con los clientes. Equilibra las necesidades de rendimiento y costo.',
        'Implementa soluciones de hardware y red, como balanceadores de carga y redundancia para prevenir interrupciones graves.'
      ],
      theme: 'sla',
      hasChildren: false
    },
  }
];

const initialEdges = [
  { id: 'e-root-sec', source: 'root', target: 'sec', type: 'smoothstep', animated: true, style: { stroke: '#fff', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#fff' } },
  { id: 'e-root-disp', source: 'root', target: 'disp', type: 'smoothstep', animated: true, style: { stroke: '#fff', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#fff' } },
  { id: 'e-root-cont', source: 'root', target: 'cont', type: 'smoothstep', animated: true, style: { stroke: '#fff', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#fff' } },
  { id: 'e-root-risk', source: 'root', target: 'risk', type: 'smoothstep', animated: true, style: { stroke: '#fff', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#fff' } },
  { id: 'e-root-sla', source: 'root', target: 'sla', type: 'smoothstep', animated: true, style: { stroke: '#fff', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#fff' } },
];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="w-screen h-screen bg-[#0f172a]">
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
        <Background color="#334155" gap={24} size={2} />
        <Controls />
        <MiniMap 
          nodeColor={(node) => {
            switch (node.data.theme) {
              case 'root': return '#F59E0B';
              case 'security': return '#3B82F6';
              case 'availability': return '#EC4899';
              case 'continuity': return '#10B981';
              case 'risk': return '#F97316';
              case 'sla': return '#8B5CF6';
              default: return '#eee';
            }
          }}
          maskColor="rgba(15, 23, 42, 0.7)"
          style={{ backgroundColor: '#1e293b' }}
        />
      </ReactFlow>
    </div>
  );
}
