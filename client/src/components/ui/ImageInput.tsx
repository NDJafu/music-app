import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

interface ImageInputProps extends React.ComponentPropsWithoutRef<'input'> {
  openExplorerOnRender?: boolean;
}

const ImageInput = forwardRef<HTMLInputElement, ImageInputProps>(
  ({ openExplorerOnRender = false, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current!, []);

    useEffect(() => {
      if (openExplorerOnRender) inputRef?.current?.click();
    }, []);

    return <input type="file" ref={inputRef} className="hidden" {...props} />;
  }
);

export default ImageInput;
