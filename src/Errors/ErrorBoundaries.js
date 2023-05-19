import React from 'react';

export class ErrorBoundaries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
    };
  }
  static getDerivedStateFromError = (error) => {
    console.log('Error Boundaries', error);
    return { hasError: true };
  };

  componentDidCatch(error, errorInfo) {
    console.log('error From ErroBoundary', errorInfo);

    //Do something with err and errorInfo
  }
  render() {
    if (this.state?.hasError) {
      return (
        <div>
          <text>Some thing went wrong</text>
        </div>
      );
    }
    return this.props.children;
  }
}
