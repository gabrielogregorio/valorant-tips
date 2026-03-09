'use client';

import { useState, useEffect } from 'react';
import { SuggestionCard } from './SuggestionCard';
import { authCookieName } from '@/shared/constants/cookies';
import { ClientCookies } from '@/libs/clientCookies';
import { TitleAndSubtitle } from '@/molecules/TitleAndSubTitle';

type Suggestion = {
  description: string; // : "example description",
  email: string; //  : "example email",
  postId: string; //  : "61590639cd9902fad4021cc5",
  id: string; //  : "c115e514-e570-43cc-bb36-1bdd185e422d",
  status: string; //  : "waiting",
  createdAt: string; //  : "2026-03-08T01:08:31.512Z",
  updatedAt: string; //  : "2026-03-08T01:08:31.512Z"
};

export const SuggestionsAdmin = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3333/suggestions', {
          headers: {
            authorization: `${ClientCookies.getCookie(authCookieName)}`,
          },
        });

        if (response.ok) {
          setSuggestions(await response.json());
        } else {
          setError('Erro ao carregar sugestões');
        }
      } catch (err) {
        console.error('Erro:', err);
        setError('Erro ao carregar sugestões');
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Carregando sugestões...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <TitleAndSubtitle title="Sugestões" subtitle="Aqui estão as sugestões enviadas pelos players" />

      <div className="grid gap-4">
        {suggestions.map((suggestion: Suggestion) => (
          <SuggestionCard
            key={suggestion.id}
            description={suggestion.description}
            postTitle={'suggestion.post?.title'}
            postId={suggestion.postId}
            email={suggestion.email}
            createdAt={suggestion.createdAt}
          />
        ))}
      </div>

      {suggestions.length === 0 && <p className="text-center text-gray-500">Nenhuma sugestão encontrada</p>}
    </div>
  );
};
