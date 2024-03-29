import { Layout } from '@/layout/layout';
import { CreatePostManagement } from '@/widgets/managmentPost';
import { navbarEnum } from '@/enums/navbar';
import { ReactElement } from 'react';

const breadcrumbs = [
  { text: 'admin', url: navbarEnum.Dashboard },
  { text: 'criar', url: navbarEnum.PostCreate },
];

const CreatePost = (): ReactElement => (
  <Layout>
    <CreatePostManagement breadcrumbs={breadcrumbs} mode="create" />
  </Layout>
);
export default CreatePost;
