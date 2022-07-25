


import React, { ErrorInfo } from "react";

type Props = {
  children: React.ReactNode
}

type State = {
  hasError: boolean,
  error: Error,
  errorInfo: ErrorInfo
}

class ErrorBoundry extends React.Component<Props, State> {

  state = {
    hasError: false,
    error: {} as Error,
    errorInfo: {} as ErrorInfo
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    return this.setState({hasError: true, error: error, errorInfo: errorInfo});
  }

  render() {
    if (!this.state.hasError) return this.props.children
    return (
      <div className="w-100 text-center mt-5">
      <div>Oops, Something's Wrong.</div>
      <div>{this.state.error && this.state.error.toString()}</div>
      <button className="btn btn-outline-danger my-3" onClick={() => this.setState({hasError: false})}>Refresh</button>
      </div>
    )
  }
}

export default React.memo(ErrorBoundry);