interface IError {
  name?: string
  message?: string
  stack?: string
}

export interface IErrorFallbackProps {
  error?: IError
}

export const ErrorFallback = (props: IErrorFallbackProps) => {
  return (
    <div style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
      <h4>{props?.error?.name}</h4>
      <h5>{props?.error?.message}</h5>
      <h6>{props?.error?.stack}</h6>
    </div>
  )
}
