/*
 * Package Import
 */
import React from 'react';
import PropTypes from 'prop-types';
import * as Sentry from '@sentry/react';

/*
 * Local Import
 */
import ErrorLayout from 'src/layouts/ErrorLayout';
import { ServerError } from 'src/pages/errors';
import './style.scss';
/**
 * Component
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error({ error, errorInfo });
    Sentry.captureException(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorLayout>
          <ServerError />
        </ErrorLayout>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

/*
 * Export
 */
export default ErrorBoundary;
