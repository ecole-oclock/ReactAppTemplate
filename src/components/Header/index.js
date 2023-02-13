/*
 * Package Import
 */
import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { SettingOutlined, PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, PageHeader } from '@o-clock-dev/mooncake';
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { identitySelector } from '@recoil/auth';

/*
 * Local Import
 */
import logo from 'src/assets/images/oclock-logo.svg';
import './style.scss';

/*
 * Component
 */
function Header() {
  const [identity, setIdentity] = useRecoilState(identitySelector);

  const navigate = useNavigate();

  const handleMenuClick = (event) => {
    switch (event.key) {
      case 'profile':
        navigate('/profile');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'logout':
        setIdentity(null);
        break;
      default:
        break;
    }
  };

  const menu = useMemo(() => ({
    onClick: handleMenuClick,
    items: [
      {
        label: 'Mon profil',
        key: 'profile',
        icon: <UserOutlined />,
      },
      {
        label: 'Paramètres',
        key: 'settings',
        icon: <SettingOutlined />,
      },
      {
        label: 'Déconnexion',
        key: 'logout',
        icon: <PoweroffOutlined />,
      },
    ],
    theme: 'light',
  }), [handleMenuClick]);

  const handleHeaderTitleClick = useCallback(() => navigate('/'), []);

  return (
    <PageHeader
      title={(
        <div className="header-title" onClick={handleHeaderTitleClick} onKeyDown={handleHeaderTitleClick}>
          <span className="header-title-top">React App Template</span>
          <span className="header-title-sub">Le template de la mort qui tue !</span>
        </div>
      )}
      className="site-page-header"
      extra={[
        <Dropdown
          menu={menu}
          placement="bottomRight"
          key="dropdownHeader"
        >
          <Button type="text"><Avatar size={24} src={identity.avatar} /> {identity.given_name} {identity.family_name}</Button>
        </Dropdown>,
      ]}
      avatar={{
        src: logo,
      }}
    />
  );
}

/*
 * Export
 */
export default Header;
