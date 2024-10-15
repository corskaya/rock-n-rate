import React, { LegacyRef, ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFinish: (formValues: Record<string, any>) => void;
  formRef?: LegacyRef<HTMLFormElement>;
};

const Form: React.FC<Props> = ({ children, className, onFinish, formRef, ...rest }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            value: formValues[child.props.name] || "",
            onChange: handleChange,
          });
        }
      }

      return child;
    });
  };

  return (
    <form ref={formRef} className={`${className}`} onSubmit={handleSubmit} {...rest}>
      {traverseChildren(children)}
    </form>
  );
}

export default Form;
