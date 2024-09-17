import React from 'react';
import styles from './Login.css';

const Login = () => {
  return (
    <div className={styles.adminLogin}>
      <div className={styles.adminLoginChild} />
      <div className={styles.username}>
        <div className={styles.rectangle} />
        <div className={styles.username1}>Username</div>
        <img className={styles.userIcon} alt="" src="user.svg" />
      </div>
      <div className={styles.password}>
        <div className={styles.rectangle} />
        <div className={styles.password1}>Password</div>
        <img className={styles.lockIcon} alt="" src="lock.svg" />
      </div>
      <div className={styles.loginBtn}>
        <div className={styles.rectangle2} />
        <b className={styles.login}>Login</b>
      </div>
      <div className={styles.welcome}>WELCOME</div>
      <div className={styles.pleaseLoginToContainer}>
        <span>P</span>
        <span className={styles.leaseLoginTo}>LEASE LOGIN TO </span>
        <span>A</span>
        <span className={styles.leaseLoginTo}>ADMIN </span>
        <span>D</span>
        <span className={styles.leaseLoginTo}>ASHBOARD</span>
      </div>
      <div className={styles.techFusion11} />
      <img className={styles.removebgPreview1Icon} alt="" src="3-removebg-preview 1.png" />
    </div>
  );
};

export default Login;
