import styles from './styles.module.css';

type Props = {
  className?: string;
  isControlled?: boolean;
  value?: string | number | readonly string[];
} & React.ComponentPropsWithoutRef<'input'>;

const Input: React.FC<Props> = ({ className, isControlled = false, value, ...rest }) => {
  return (
    <input
      className={`${styles.input} ${className}`}
      {...(isControlled ? { value } : {})}
      {...rest}
    />
  );
}

export default Input;
