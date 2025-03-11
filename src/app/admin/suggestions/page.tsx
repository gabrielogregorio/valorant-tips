import { TitleAndSubtitle } from '../../../Molecules/TitleAndSubTitle';
import { Suggestions } from '../../../Organisms/Suggestions';

export default function SuggestionScreen() {
  return (
    <>
      <TitleAndSubtitle title="Sugestões" subtitle="Aqui estão as sugestões enviadas pelos players" />

      <Suggestions />
    </>
  );
}
