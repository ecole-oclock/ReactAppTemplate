/*
 * Package Import
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, PageHeader, Skeleton } from '@o-clock-dev/mooncake';

/*
 * Local Import
 */
import logo from 'src/assets/images/oclock-logo.svg';

/*
 * Component
 */
function SkeletonHeader({ fromError }) {
  return (
    <PageHeader
      title={(
        <div className="header-title">
          <span className="header-title-top">React App Template</span>
          {!fromError && <span className="header-title-sub"><Skeleton.Button size="small" /></span>}
        </div>
      )}
      className="site-page-header"
      extra={
        !fromError && <Button disabled type="text"><Avatar src="" /><Skeleton.Button size="small" /></Button>
      }
      avatar={{
        src: logo,
      }}
    />
  );
}

/**
 * PropTypes
 */
SkeletonHeader.propTypes = {
  fromError: PropTypes.bool,
};

SkeletonHeader.defaultProps = {
  fromError: false,
};

/*
 * Export
 */
export default SkeletonHeader;
