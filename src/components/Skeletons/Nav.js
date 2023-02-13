/*
 * Package Import
 */
import React from 'react';
import * as DS from '@o-clock-dev/mooncake';

/*
 * Local Import
 */
import { items } from 'src/components/Nav/navItems';

/*
 * Component
 */
function SkeletonNav() {
  const getSkeletons = () => {
    const skeletonsArray = [];
    for (let navItemIndex = 0; navItemIndex < items.length; navItemIndex++) {
      skeletonsArray.push({
        key: navItemIndex,
        disabled: true,
        label: '',
        icon: (
          <DS.Skeleton.Button active paragraph={false} size="large" block />
        ),
      });
    }
    return skeletonsArray;
  };

  return (
    <DS.Menu
      defaultSelectedKeys={['directory']}
      mode="inline"
      items={getSkeletons()}
    />
  );
}

export default SkeletonNav;
