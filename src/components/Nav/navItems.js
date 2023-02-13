/**
 * Package Import
 */
import React from 'react';
import { HomeFilled, FileFilled, ApiFilled } from '@ant-design/icons';

/**
 * Local Import
 */
import { Tooltip } from '@o-clock-dev/mooncake';

/**
 * List of items
 */
function getItem(label, key, icon, children, disabled = false) {
  return {
    key,
    icon,
    children,
    label,
    disabled,
    'data-testid': `navItem${key}`,
  };
}

export const items = [
  getItem('Accueil', '', <HomeFilled />),
  getItem('Section d\'exemple', 'submenu', <ApiFilled />, [
    getItem(<Tooltip title="Cette page est en cours de développement">Page d&apos;exemple</Tooltip>, 'example', <FileFilled />),
  ]),
];
