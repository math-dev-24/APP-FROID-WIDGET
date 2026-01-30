import { Component, type ReactNode } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div
          className="flex flex-col items-center justify-center min-h-[200px] p-6 text-center"
          role="alert"
          aria-live="assertive"
        >
          <AlertTriangle
            className="h-12 w-12 text-destructive mb-4"
            aria-hidden
          />
          <h2 className="text-lg font-semibold mb-2">Une erreur s'est produite</h2>
          <p className="text-sm text-muted-foreground mb-4 max-w-md">
            {this.state.error.message}
          </p>
          <Button onClick={this.handleRetry} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" aria-hidden />
            Réessayer
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
