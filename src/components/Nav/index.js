/*
 * Package Import
 */
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as DS from '@o-clock-dev/mooncake';

/*
* Local Import
*/
import { items } from 'src/components/Nav/navItems';
import './styles.scss';

/*
 * Component
 */
function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const onClick = (event) => {
    navigate(`/${event.key}`);
  };

  return (
    <DS.Menu
      className="mainSideMenu"
      selectedKeys={[pathname.split('/')?.[1]]}
      mode="inline"
      items={items}
      onClick={onClick}
    />
  );
}

export default Nav;
