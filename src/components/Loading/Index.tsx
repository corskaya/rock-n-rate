import { LoadingOutlined } from '@ant-design/icons';
import styles from './styles.module.css';

type Props = {
  className?: string;
  size?: 'small' | 'medium' | 'large';
};

const Loading: React.FC<Props> = ({ className, size = 'medium', ...rest }) => {

  return (
    <LoadingOutlined
      className={`${styles.loadingIcon} ${className} ${styles[size]}`}
      {...rest}
    />
  );
}

export default Loading;
