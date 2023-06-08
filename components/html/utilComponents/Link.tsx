import useHover from '../../utils/useHover';

type props = {
  href: string;
  children: string;
};

export default function Link({ href, children }: props) {
  const { handleOnMouseEnter, handleOnMouseLeave } = useHover('external');
  return (
    <a
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      href={href}
      className="link"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
