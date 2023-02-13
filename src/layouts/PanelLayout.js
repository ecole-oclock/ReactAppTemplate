import { Outlet } from 'react-router-dom';

import { Layout } from '@o-clock-dev/mooncake';

const { Content } = Layout;

function PanelLayout() {
  return (
    <Content className="content content--panel">
      <Outlet />
    </Content>
  );
}

export default PanelLayout;
