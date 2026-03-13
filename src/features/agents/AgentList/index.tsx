import { Image } from '@/libs/image';
import { Text, TextVariantEnum } from '@/atoms/Text';
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
              className="cursor-pointer hover:scale-105 transition-transform duration-150 rounded-3xl block"
              key={agent.name}>
              <Image
                src={agent.imageUrl}
                width={587}
                height={900}
                alt=""
                className="rounded-md object-cover aspect-587/900 block"
              />
              <Text className="text-center block text-content-fg">{agent.name}</Text>
            </button>
          );
        })}
      </div>
    </div>
  );
};
