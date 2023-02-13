import { Outlet } from 'react-router-dom';

import { Layout } from '@o-clock-dev/mooncake';
import PropTypes from 'prop-types';

const { Content } = Layout;

function ErrorLayout({ children }) {
  return (
    <Content className="content--error">
      {children || <Outlet /> }
    </Content>
  );
}

ErrorLayout.propTypes = {
  children: PropTypes.node,
};

export default ErrorLayout;
