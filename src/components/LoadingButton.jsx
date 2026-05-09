export default function LoadingButton({ children, loading, disabled, className = '', ...props }) {
  return (
    <button
      disabled={loading || disabled}
      className={className}
      {...props}
    >
      {loading ? 'Please wait...' : children}
    </button>
  )
}
