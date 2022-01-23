import { useEffect, useState } from 'react';
import api from '@/services/api';
import { useFilters } from '@/contexts/filters';
import resolveQuery from '@/helpers/resolveQuery';
import { getPostsSave, getPostsTested } from '@/services/handlePosts';
import { PropsPostInterface } from '../../interfaces/posts';

interface filterUrlInterface {
  agent: string;
  map: string;
  type: string;
  page: string;
}

function getUrl(location: any): filterUrlInterface {
  const agent: string = new URLSearchParams(location || {}).get('agent') || '';
  const map: string = new URLSearchParams(location || {}).get('map') || '';
  const type: string = new URLSearchParams(location || {}).get('type') || '';
  const page: string = new URLSearchParams(location || {}).get('page') || '1';
  return { agent, map, type, page };
}

export default function usePosts(location: any, typeRequest: any = '') {
  const { filters, setTags, setFilters } = useFilters();
  const [posts, setPosts] = useState<PropsPostInterface[]>([]);
  const [activeLoader, setActiveLoader] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [finishPage, setFinishPage] = useState<number>(1);
  const [queryUrl, setQueryUrl] = useState<filterUrlInterface>(getUrl(location?.query));

  useEffect(
    () => () => {
      setTags([]);
      setFilters([]);
    },
    [setFilters, setTags],
  );

  useEffect(() => {
    setActiveLoader(true);
    setErrorMsg('');

    const { agent, map, type, page } = getUrl(location?.query);
    setQueryUrl({ agent, map, type, page });

    let idPosts = '[]';
    if (typeRequest === 'save') {
      idPosts = getPostsSave();
    } else if (typeRequest === 'tested') {
      idPosts = getPostsTested();
    }

    const data1 =
      typeRequest === ''
        ? {
            map,
            page,
            agent,
            filters: filters.toString(),
          }
        : {
            idPosts,
            agent,
            map,
            page,
            filters: filters.toString(),
          };

    api
      .get(resolveQuery('/posts', data1))
      .then((res) => {
        const postsFiltered = res.data.posts;
        setFinishPage(res.data.count);
        setTags(res.data.tags);
        setPosts(postsFiltered);
        setActiveLoader(false);
      })
      .catch((error) => {
        setErrorMsg(error.message);
        setActiveLoader(false);
      });
  }, [location?.query?.map, location?.query?.page, location?.query?.agent, filters, setTags, setFilters]);

  return { posts, activeLoader, errorMsg, finishPage, queryUrl };
}
