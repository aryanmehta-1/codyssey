import { useNavigation } from '../../hooks/useNavigation';

export default function Link({ to, children, className = '', style = {}, onClick, ...rest }) {
  const { navigate } = useNavigation();

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(to);
  };

  const cleanTo = String(to).startsWith('/') ? to.slice(1) : String(to);

  return (
    <a
      href={`#${cleanTo}`}
      onClick={handleClick}
      className={className}
      style={{ textDecoration: 'none', cursor: 'pointer', ...style }}
      {...rest}
    >
      {children}
    </a>
  );
}
