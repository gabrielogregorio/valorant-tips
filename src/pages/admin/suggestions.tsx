import { ReactNode } from 'react';
import { Navbar } from '@/layout/navbar';
import { Footer } from '@/layout/footer';
import { Breadcrumb } from '@/widgets/breadcrumb';
import { navbarEnum } from '@/enums/navbar';
import { Loader } from '@/base/loader';
import { Layout } from '@/layout/layout';
import { SubContainer } from '@/base/subContainer';
import { modelNavbarAdmin } from '@/schemas/navbar';
import { ErrorMsg } from '@/base/errorMsg';
import { useSuggestions } from '@/hooks/useSuggestions';
import { suggestionType } from '@/types/suggestions';

const breadcrumbs = [
  { url: navbarEnum.Dashboard, text: 'admin' },
  { url: navbarEnum.Dashboard, text: 'sugestões' },
];

const Th = ({ children }: { children: ReactNode }) => (
  <th className="text-base text-skin-white text-left">{children}</th>
);

const Td = ({ children }: { children: ReactNode }) => (
  <td className="px-5 pl-0 break-all text-base dark:text-skin-white text-skin-gray-500 text-left">{children}</td>
);

const Suggestions = () => {
  const { suggestions, loading, error } = useSuggestions();

  return (
    <Layout>
      <Navbar selected={navbarEnum.Suggestions} modelNavbar={modelNavbarAdmin} />
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <Loader active={loading} />
      <ErrorMsg msg={error} />

      <SubContainer>
        <table className="w-full max-w-maxWidthDefault">
          <thead className="border-b">
            <tr className="border-b">
              <Th>Post</Th>
              <Th>Email</Th>
              <Th>Descrição</Th>
              <Th>Status</Th>
            </tr>
          </thead>

          <tbody>
            {suggestions.map((report: suggestionType) => (
              <tr key={report.id} className="border-b">
                <Td>{report.postId}</Td>
                <Td>{report.email}</Td>
                <Td>{report.description}</Td>
                <Td>{report.status ?? 'Não atendido'}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </SubContainer>
      <Footer />
    </Layout>
  );
};
export default Suggestions;
