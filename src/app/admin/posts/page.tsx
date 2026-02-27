'use client'
import  {useQuery } from '@tanstack/react-query'

import { TitleAndSubtitle } from '../../../Molecules/TitleAndSubTitle';

const useAdminPosts = () => {
return useQuery({
  queryKey: ['admin-posts'],
})
}

const PostScreen = () => (
  <>
    <TitleAndSubtitle title="Posts" subtitle="..." />

    <div>Tela inicial</div>
  </>
);

export default PostScreen;
