import { TitleAndSubtitle } from '../../../Molecules/TitleAndSubTitle';
import { Suggestions } from '../../../Organisms/Suggestions';

const SuggestionScreen = () => (
  <>
    <TitleAndSubtitle title="Sugestões" subtitle="Aqui estão as sugestões enviadas pelos players" />

    <Suggestions />
  </>
);

export default SuggestionScreen;
