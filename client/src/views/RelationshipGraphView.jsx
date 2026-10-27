import React, { useState } from 'react';
import { 
  Network, Sparkles, Code2, Award, BookOpen, 
  Layers, ArrowRight, Info, CheckCircle2
} from 'lucide-react';

export default function RelationshipGraphView({ achievements, isDark }) {
  const [selectedNode, setSelectedNode] = useState(null);

  // Extract skills and nodes
  const nodes = [
    { id: 'n_core_cs', label: 'B.Tech Core CS Foundation', type: 'academic', desc: 'Algorithms, OS, Relational DBs (CGPA 9.24)' },
    { id: 'n_pytorch', label: 'PyTorch Deep Learning', type: 'certification', desc: 'DeepLearning.AI Multi-Layer Perceptrons & CNNs' },
    { id: 'n_smartpulse', label: 'SmartPulse Telehealth AI', type: 'project', desc: 'IoT Vitals streaming to fine-tuned LLM triage engine' },
    { id: 'n_apex', label: 'Apex AI Hackathon Winner', type: 'competition', desc: 'Decentralized verifiable certificate ledger in 36h' },
    { id: 'n_cloud', label: 'HyperScale Cloud Go/Redis', type: 'internship', desc: '150k metrics/sec stream processing pipeline' },
    { id: 'n_aws', label: 'AWS Solutions Architect', type: 'certification', desc: 'VPC, IAM, High-availability Serverless' },
    { id: 'n_paper', label: 'IEEE ZK-Proofs Research', type: 'research', desc: 'Selective Zero-Knowledge disclosure algorithms' }
  ];

  const edges = [
    { from: 'n_core_cs', to: 'n_pytorch', label: 'Mathematical Base' },
    { from: 'n_pytorch', to: 'n_smartpulse', label: 'Model Architecture' },
    { from: 'n_core_cs', to: 'n_cloud', label: 'Distributed Systems' },
    { from: 'n_cloud', to: 'n_aws', label: 'Cloud Infrastructure' },
    { from: 'n_smartpulse', to: 'n_apex', label: 'Hackathon Prototype' },
    { from: 'n_core_cs', to: 'n_paper', label: 'Cryptographic Foundations' }
  ];

  const getNodeColor = (type) => {
    switch (type) {
      case 'academic': return '#38BDF8';
      case 'certification': return '#10B981';
      case 'project': return '#2DD4BF';
      case 'competition': return '#F59E0B';
      case 'internship': return '#818CF8';
      case 'research': return '#EC4899';
      default: return '#38BDF8';
    }
  };

  return (
    <div style={{ padding: '10px 0 60px 0' }}>
      {/* HEADER */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38BDF8', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
          <Sparkles size={16} /> INNOVATION 2: ACHIEVEMENT RELATIONSHIP GRAPH
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '6px' }}>Achievement Knowledge Graph</h1>
        <p style={{ color: isDark ? '#94A3B8' : '#64748B', fontSize: '14px' }}>
          Visualizing how your academic fundamentals, specialized credentials, hackathon projects, and internships connect into a cohesive career narrative.
        </p>
      </div>

      {/* GRAPH CANVAS CONTAINER */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* INTERACTIVE VISUAL GRAPH */}
        <div className="glass-panel" style={{ 
          padding: '30px', 
          minHeight: '480px', 
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}>
          <div style={{ 
            position: 'absolute', top: '16px', left: '16px', 
            fontSize: '12px', fontWeight: 700, color: '#38BDF8', 
            display: 'flex', alignItems: 'center', gap: '6px' 
          }}>
            <Network size={16} /> INTERACTIVE TOPOLOGY MAP (Click Node to Inspect)
          </div>

          {/* NODES DISPLAY */}
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '16px', 
            justifyContent: 'center', 
            maxWidth: '650px', 
            margin: '40px 0' 
          }}>
            {nodes.map(n => {
              const isSelected = selectedNode?.id === n.id;
              const color = getNodeColor(n.type);

              return (
                <div 
                  key={n.id}
                  onClick={() => setSelectedNode(n)}
                  className="hover-lift"
                  style={{ 
                    padding: '14px 20px', 
                    borderRadius: '14px', 
                    background: isSelected 
                      ? `linear-gradient(135deg, ${color}25, ${color}40)` 
                      : (isDark ? 'rgba(11, 31, 58, 0.7)' : 'rgba(255, 255, 255, 0.9)'),
                    border: isSelected ? `2px solid ${color}` : `1px solid ${color}40`,
                    boxShadow: isSelected ? `0 0 20px ${color}35` : 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: color }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: isDark ? '#FFFFFF' : '#0B1F3A' }}>
                      {n.label}
                    </div>
                    <div style={{ fontSize: '11px', color: color, textTransform: 'capitalize' }}>
                      {n.type}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RELATIONSHIP CONNECTIONS SUMMARY */}
          <div style={{ 
            width: '100%', 
            padding: '14px', 
            borderRadius: '12px', 
            background: isDark ? 'rgba(15, 23, 42, 0.7)' : 'rgba(241, 245, 249, 0.8)',
            border: isDark ? '1px solid rgba(125, 185, 235, 0.15)' : '1px solid #CBD5E1',
            fontSize: '12px',
            color: isDark ? '#94A3B8' : '#64748B',
            textAlign: 'center'
          }}>
            Showing <strong>{nodes.length} connected milestone nodes</strong> and <strong>{edges.length} progression pathways</strong>.
          </div>
        </div>

        {/* NODE DETAIL INSPECTOR */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Info size={18} className="text-teal-400" /> Milestone Pathway Inspector
          </h3>

          {selectedNode ? (
            <div>
              <div style={{ 
                display: 'inline-block', 
                padding: '4px 10px', 
                borderRadius: '8px', 
                fontSize: '11px', 
                fontWeight: 700, 
                color: getNodeColor(selectedNode.type),
                background: `${getNodeColor(selectedNode.type)}15`,
                border: `1px solid ${getNodeColor(selectedNode.type)}30`,
                marginBottom: '10px',
                textTransform: 'uppercase'
              }}>
                {selectedNode.type}
              </div>

              <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>
                {selectedNode.label}
              </h2>

              <p style={{ fontSize: '14px', color: isDark ? '#CBD5E1' : '#475569', lineHeight: 1.5, marginBottom: '20px' }}>
                {selectedNode.desc}
              </p>

              <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '10px' }}>Connected Learning Pathways:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {edges.filter(e => e.from === selectedNode.id || e.to === selectedNode.id).map((e, idx) => (
                  <div key={idx} style={{ 
                    padding: '10px 14px', 
                    borderRadius: '8px', 
                    background: isDark ? 'rgba(11, 31, 58, 0.6)' : '#F1F5F9',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span>{e.from === selectedNode.id ? `Feeds into: ${e.to}` : `Builds upon: ${e.from}`}</span>
                    <span style={{ color: '#38BDF8', fontWeight: 600 }}>{e.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '50px 20px', color: isDark ? '#94A3B8' : '#64748B' }}>
              <Network size={36} style={{ color: '#38BDF8', margin: '0 auto 12px auto' }} />
              <p style={{ fontSize: '14px' }}>Click any node on the graph to inspect prerequisite links, applied projects, and verifiable credentials.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
