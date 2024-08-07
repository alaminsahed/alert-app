import { Button } from 'antd';

import styles from './404.module.css';

const Error404 = () => {
  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src="/images/NotFound.png"
        alt="Unauthorized"
      />
      <h3>Page not found!</h3>
      <p className={styles.description}>
        Looks like you've followed a broken link or entered a URL that doesn't
        exist on this site.
      </p>
      <Button type="primary" href="/">
        Back to home
      </Button>
    </div>
  );
};

export { Error404 };
