'use client';

import { Text, TextVariantEnum } from '@/atoms/Text';
import { Button } from '@/molecules/Button';
import { AgentType } from '@/shared/hooks/useFetchAgents';
import { AgentList } from '@Features/agents/AgentList';
import { ModalCreateOrUpdateAgent } from '@Features/agents/ModalCreateOrUpdateAgent';
import { MapListAdmin } from '@Features/maps/MapListAdmin';
import { MapAdminType } from '@Features/maps/MapListAdmin/types';
import { ModalCreateOrUpdateMap } from '@Features/maps/ModalCreateOrUpdateMap';
import { useState, useEffect } from 'react';
import { api } from '@/libs/api';

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
        const mapsResponse = await api.get<MapAdminType[]>('/maps');
        const agentsResponse = await api.get<AgentType[]>('/agents');

        const getSafeUrl = (url: string) => {
          try {
            new URL(url);
            return url;
          } catch {
            return '/default/profile.webp'; // fallback da aplicação
          }
        };

        setMaps(
          mapsResponse.data.map((map) => {
            return { ...map, imageUrl: getSafeUrl(map.imageUrl) };
          }),
        );
        setAgents(
          agentsResponse.data.map((agent) => {
            return { ...agent, imageUrl: getSafeUrl(agent.imageUrl) };
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
    <div>
      <Text variant={TextVariantEnum.h1} className="text-white">
        Gerenciar dados
      </Text>
      <p className="text-gray-200">Aqui você encontrará diversas dicas para evoluir no jogo Valorant</p>

      <section>
        <Text variant={TextVariantEnum.h2} className="text-white">
          Mapas
        </Text>

        <MapListAdmin maps={maps} onEdit={handleMapEdit} />
        <Button onClick={handleMapCreate} variant="primary">
          + Criar Mapa
        </Button>
      </section>

      <section className="space-y-4">
        <Text variant={TextVariantEnum.h2} className="text-white">
          Agentes
        </Text>

        <AgentList agents={agents} onEdit={handleAgentEdit} />
        <Button onClick={handleAgentCreate} variant="primary">
          + Criar Agente
        </Button>
      </section>

      <ModalCreateOrUpdateMap
        map={selectedMap}
        open={showMapModal}
        onClose={() => setShowMapModal(false)}
        onSuccess={() => setShowMapModal(false)}
      />

      {showAgentModal && (
        <ModalCreateOrUpdateAgent
          agent={selectedAgent}
          open={showAgentModal}
          onClose={() => setShowAgentModal(false)}
          onSuccess={() => setShowAgentModal(false)}
        />
      )}
    </div>
  );
};
