"use client";
import styles from "./layout.module.css";

interface ChildrenProps {
  children: React.ReactNode;
}

const LoginLayout = ({ children }: ChildrenProps) => {
  return (
    <div className={styles.pageContainer}>
      <div className={`${styles.side} ${styles.leftSide}`}>
        <div className={styles.leftSideContent}>
          <div className={`${styles.topRing} ${styles.ring}`} />
          <div className={`${styles.bottomRing} ${styles.ring}`} />
          <div className={styles.description}>
            <h1 className={styles.title}>Orkut</h1>
            <p>
              <strong>Conencta-se</strong> aos seus amigos e familiares usando
              recados e mensagens instantâneas
            </p>
            <p>
              <strong>Conheça</strong> novas pessoas através de amigos de seus
              amigos e comunidades
            </p>
            <p>
              <strong>Compartilhe</strong> seus vídeos, fotos, e paixões em um
              só lugar
            </p>
          </div>
        </div>
      </div>
      <div className={styles.side}>{children}</div>
    </div>
  );
};
export default LoginLayout;
