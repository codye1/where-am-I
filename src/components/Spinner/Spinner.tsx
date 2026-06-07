type SpinnerSize = 'sm' | 'md' | 'lg';
type SpinnerVariant = 'accent' | 'accent2' | 'muted';

interface SpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
}

const Spinner = ({ size = 'md', variant = 'accent' }: SpinnerProps) => {
  const sizes = { sm: '1.2em', md: '2em', lg: '3em' };
  const borderWidths = { sm: '0.14em', md: '0.18em', lg: '0.22em' };
  const colors = {
    accent: 'var(--color-accent)', // #1ea65b
    accent2: 'var(--color-accent-2)', // #f5b642
    muted: 'var(--color-muted)',
  };

  return (
    <div
      style={{
        width: sizes[size],
        height: sizes[size],
        borderRadius: '50%',
        border: `${borderWidths[size]} solid var(--color-border)`,
        borderTopColor: colors[variant],
        animation: 'spin 0.75s linear infinite',
        flexShrink: 0,
      }}
    />
  );
};

export default Spinner;
