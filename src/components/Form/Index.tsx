import React, { ReactNode, useState } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  onFinish: (formValues: Record<string, any>) => void;
};

const Form: React.FC<Props> = ({ children, className, onFinish, ...rest }) => {
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFinish(formValues);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const traverseChildren = (children: ReactNode): ReactNode => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        if (child?.props?.children) {
          return React.cloneElement(child, {
            ...child.props,
            children: traverseChildren(child.props.children),
          });
        }
  
        if (child?.props?.name) {
          return React.cloneElement(child, {
            ...child.props,
            value: formValues[child.props.name] || '',
            onChange: handleChange,
          });
        }
      }

      return child;
    });
  };

  return (
    <form className={`${className}`} onSubmit={handleSubmit} {...rest}>
      {traverseChildren(children)}
    </form>
  );
}

export default Form;
