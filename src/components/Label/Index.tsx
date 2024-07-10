import { ReactNode } from 'react';
import styles from './styles.module.css';

type Props = {
  children: ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<'label'>;

const Label: React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <label className={`${styles.label} ${className}`} {...rest}>
      {children}
    </label>
  );
}

export default Label;
