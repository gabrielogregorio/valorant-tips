import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';

interface SuggestionCardProps {
  id: string;
  description: string;
  postTitle?: string;
  postId?: string;
  email: string;
  createdAt: Date | string;
}

export const SuggestionCard = ({ id, description, postTitle, postId, email, createdAt }: SuggestionCardProps) => {
  const dateFormatted = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    locale: ptBR,
  });

  return (
    <div className="p-4 border rounded-lg bg-white hover:shadow-lg transition-shadow">
      <p className="text-gray-700 mb-3">{description}</p>

      {postTitle && postId && (
        <p className="text-sm text-gray-600 mb-2">
          Post:{' '}
          <Link href={`/posts/${postId}`} className="text-blue-500 hover:underline">
            {postTitle}
          </Link>
        </p>
      )}

      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Email: {email}</span>
        <span>Publicado {dateFormatted}</span>
      </div>
    </div>
  );
};
