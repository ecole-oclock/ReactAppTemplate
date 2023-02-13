/**
 * Package Import
 */
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from '@o-clock-dev/mooncake';

/**
 * Local Import
 */
import Nav from 'src/components/Nav';
import Header from 'src/components/Header';
import './style.scss';

/**
 * Component
 */
const { Header: LayoutHeader, Sider } = Layout;

function MainLayout() {
  const [menuCollapsed, setMenuCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMenuCollapsed(true);
      }
      else {
        setMenuCollapsed(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout className="main-layout">
      <LayoutHeader className="header">
        <Header />
      </LayoutHeader>
      <Layout className="content-layout">
        <Sider theme="light" className="sider" width={256} collapsible collapsed={menuCollapsed}>
          <Nav />
        </Sider>
        <Layout className="site-layout">
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
