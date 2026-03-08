'use client';

import { Button } from '@/molecules/Button';
import { AgentType } from '@/shared/hooks/useFetchAgents';
import { AgentList } from '@Features/agents/AgentList';
import { ModalCreateOrUpdateAgent } from '@Features/agents/ModalCreateOrUpdateAgent';
import { MapListAdmin } from '@Features/maps/MapListAdmin';
import { MapAdminType } from '@Features/maps/MapListAdmin/types';
import { ModalCreateOrUpdateMap } from '@Features/maps/ModalCreateOrUpdateMap';
import { useState, useEffect } from 'react';

export const ManageData = () => {
  const [maps, setMaps] = useState<MapAdminType[]>([]);
  const [agents, setAgents] = useState<AgentType[]>([]);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [selectedMap, setSelectedMap] = useState<MapAdminType | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<AgentType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const mapsResponse = await fetch('http://localhost:3333/maps');
        const agentsResponse = await fetch('http://localhost:3333/agents');
        setMaps(
          ((await mapsResponse.json()) as MapAdminType[]).map((map) => {
            return { ...map, imageUrl: map.imageUrl };
          }),
        );
        setAgents(
          ((await agentsResponse.json()) as AgentType[]).map((agent) => {
            return { ...agent, imageUrl: agent.imageUrl };
          }),
        );
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMapEdit = (map: MapAdminType) => {
    setSelectedMap(map);
    setShowMapModal(true);
  };

  const handleAgentEdit = (agent: AgentType) => {
    setSelectedAgent(agent);
    setShowAgentModal(true);
  };

  const handleMapCreate = () => {
    setSelectedMap(null);
    setShowMapModal(true);
  };

  const handleAgentCreate = () => {
    setSelectedAgent(null);
    setShowAgentModal(true);
  };

  if (loading) {
    return <div className="text-center py-8">Carregando dados...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Gerenciar dados</h1>
      <p className="text-gray-600">Aqui você encontrará diversas dicas para evoluir no jogo Valorant</p>

      {/* Maps Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Mapas</h2>
        <MapListAdmin maps={maps} onEdit={handleMapEdit} />
        <Button onClick={handleMapCreate} variant="primary">
          + Criar Mapa
        </Button>
      </section>

      {/* Agents Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Agentes</h2>
        <AgentList agents={agents} onEdit={handleAgentEdit} />
        <Button onClick={handleAgentCreate} variant="primary">
          + Criar Agente
        </Button>
      </section>

      {showMapModal && (
        <ModalCreateOrUpdateMap
          map={selectedMap}
          onClose={() => setShowMapModal(false)}
          onSuccess={() => setShowMapModal(false)}
        />
      )}

      {showAgentModal && (
        <ModalCreateOrUpdateAgent
          agent={selectedAgent}
          onClose={() => setShowAgentModal(false)}
          onSuccess={() => setShowAgentModal(false)}
        />
      )}
    </div>
  );
};
