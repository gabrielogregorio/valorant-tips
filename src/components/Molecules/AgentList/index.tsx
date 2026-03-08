import { Image } from '@/libs/image';
import { Text, TextVariantEnum } from '@/Atoms/Text';
import { AgentType } from '@/shared/hooks/useFetchAgents';

export const AgentList = ({ agents, onEdit }: { agents: AgentType[]; onEdit: (map: AgentType) => void }) => {
  return (
    <div>
      <Text className="text-center text-content-fg" variant={TextVariantEnum.h3}>
        Agentes
      </Text>

      <div className="grid grid-cols-3 gap-3 mt-2">
        {agents.map((agent) => {
          return (
            <button
              type="button"
              onClick={() => onEdit(agent)}
              className="cursor-pointer hover:scale-105 transition-transform duration-150 max-w-80 max-h-44 overflow-hidden rounded-3xl"
              key={agent.name}>
              <Image
                src={agent.imageUrl}
                width={320}
                height={180}
                alt=""
                className="rounded-md object-cover w-full h-full"
              />
              <Text className="text-center">{agent.name}</Text>
            </button>
          );
        })}
      </div>
    </div>
  );
};
