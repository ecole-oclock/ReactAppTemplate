/*
 * Package Import
 */
import React from 'react';
import * as DS from '@o-clock-dev/mooncake';
import PropTypes from 'prop-types';

/*
 * Local Import
 */
import SkeletonHeader from 'src/components/Skeletons/Header';
import SkeletonNav from 'src/components/Skeletons/Nav';

import './style.scss';
/*
 * Component
 */
function Skeleton({ fromError }) {
  const { Header: LayoutHeader, Sider, Content } = DS.Layout;

  return (
    <DS.Layout className="main-layout">
      <LayoutHeader className="header">
        <SkeletonHeader fromError={fromError} />
      </LayoutHeader>
      <DS.Layout className="content-layout">
        <Sider theme="light" className="sider" width={256}>
          <SkeletonNav />
        </Sider>
        <DS.Layout className="site-layout">
          {fromError ? (
            <h1 className="error-page-title">
              L’application n’est pas accessible, veuillez réessayer plus tard.
            </h1>
          ) : (
            <Content className="content content--panel mainSkeleton">
              <DS.Card>
                <DS.Skeleton active />
                <DS.Skeleton active />
                <DS.Skeleton active />
                <DS.Skeleton active />
                <DS.Skeleton active />
              </DS.Card>
            </Content>
          )}
        </DS.Layout>
      </DS.Layout>
    </DS.Layout>
  );
}

/**
 * PropTypes
 */
Skeleton.propTypes = {
  fromError: PropTypes.bool,
};

Skeleton.defaultProps = {
  fromError: false,
};

/*
 * Export
 */
export default Skeleton;
