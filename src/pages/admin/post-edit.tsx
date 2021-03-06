import { Layout } from '@/layout/layout';
import { CreatePostManagement } from '@/widgets/managmentPost';
import { navbarEnum } from '@/enums/navbar';

const breadcrumbs = [
  { url: navbarEnum.Dashboard, text: 'admin' },
  { url: navbarEnum.Dashboard, text: 'editar' },
];

const EditPost = () => (
  <Layout>
    <CreatePostManagement breadcrumbs={breadcrumbs} mode="edit" />
  </Layout>
);
export default EditPost;
