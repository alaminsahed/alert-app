import { useEffect, useState } from 'react';

const useCollapsed = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      const shouldCollapse = window.matchMedia('(max-width: 768px)').matches;
      setCollapsed(shouldCollapse);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { collapsed, setCollapsed };
};

export default useCollapsed;
