import { Button } from '@/base/button';
import { ReactElement } from 'react';

type tagsType = {
  tags: string[];
  filteredActives: string[];
  setFilteredActive: Function;
};

export const Tags = ({ tags, filteredActives, setFilteredActive }: tagsType): ReactElement => {
  const toggleTag = (tag): void => {
    if (filteredActives.includes(tag)) {
      setFilteredActive(filteredActives.filter((filter) => filter !== tag));
    } else {
      setFilteredActive([...filteredActives, tag]);
    }
  };

  const renderTags = (): ReactElement[] =>
    tags.map((tag) => (
      <div className="m-1 text-skin-primary-light" key={tag} onClick={(): void => toggleTag(tag)} role="presentation">
        <Button
          onClick={(): void => null}
          className={`p-3 pb-1 pt-1 border border-skin-primary-light rounded-md transition duration-100 font-bold ${
            filteredActives.includes(tag) ? 'text-skin-white bg-skin-primary-light' : ''
          }`}>
          {tag}
        </Button>
      </div>
    ));
  return <div className="flex justify-center flex-wrap m-10 mt-1 mb-1"> {renderTags()} </div>;
};
