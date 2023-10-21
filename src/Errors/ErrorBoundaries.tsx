import * as React from "react";

type ErrorBoundariesProps = {
  children: React.ReactNode;
};

type ErrorBoundariesState = {
  hasError: boolean;
  errorMessage: string;
};

export class ErrorBoundaries extends React.Component<
  ErrorBoundariesProps,
  ErrorBoundariesState
> {
  constructor(props: ErrorBoundariesProps) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: "",
    };
  }

  static getDerivedStateFromError = (error: Error) => {
    console.log("Error Boundaries", error);
    return { hasError: true };
  };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log("error From ErroBoundary", errorInfo);

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
