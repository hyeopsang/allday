import { createBrowserRouter } from 'react-router-dom';
import Main from './page/Main';
import MyPostList from './component/MyPostList';
import Layout from './component/Layout';
import Like from './component/Like';
import MyPageLayout from './component/MyPageLayout';
import Follow from './component/Follow';
import Following from './component/Following';
import Preview from './component/Preview';

const RouterInfo = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Main />,
        // Pass the shared state through context
        loader: async () => {
          const { default: Main } = await import('./page/Main');
          return { likedPosts: Main.likedPosts };
        }
      },
    ]
  },
  {
    path: '/profile',
    element: <MyPageLayout />,
    children: [
      { path: 'products', element: <MyPostList /> },
      {
        path: 'like',
        element: <Like />,
        loader: async () => {
          const { default: Main } = await import('./page/Main');
          return { likedPosts: Main.likedPosts };
        }
      },
      { path: 'preview', element: <Preview /> },
      { path: 'follow', element: <Follow /> },
      { path: 'following', element: <Following /> },
    ]
  }
];

export const AppRouter = createBrowserRouter(RouterInfo);
