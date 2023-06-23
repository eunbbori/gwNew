import { Component, ReactNode, cloneElement } from 'react';

interface IErrorBoundaryProps {
  fallback: JSX.Element;
  children?: ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
  error: Error;
}

/**
 * ErrorBoundary 인터페이스의 구현체
 * @param fallback: 예외를 catch 했을 때, 대신 표시할 컴퍼넌트
 */
export class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  /**
   * 이 메소드를 구현하면 ErrorBoundary 구현체가 됩니다.
   * @param error
   * @returns {{hasError: boolean, error}}
   */
  static getDerivedStateFromError(error: any): IErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      error: { stack: '', message: '', name: '' },
    };
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return cloneElement(this.props.fallback, {
          error: this.state.error,
        });
      }

      return <p>An error has occurred in the child component.</p>;
    }

    return this.props.children;
  }
}
