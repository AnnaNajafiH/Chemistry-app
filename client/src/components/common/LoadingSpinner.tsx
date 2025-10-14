interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  message?: string;
}

export const LoadingSpinner = ({
  size = 'md',
  color = 'primary',
  message = 'Loading...'
}: LoadingSpinnerProps) => {
  const spinnerSize = {
    sm: '',
    md: 'spinner-border-sm',
    lg: ''
  };

  return (
    <div className="d-flex flex-column align-items-center my-4">
      <div className={`spinner-border text-${color} ${spinnerSize[size]}`} role="status">
        <span className="visually-hidden">{message}</span>
      </div>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};