import { useEffect, useState } from "react";
import { IdleCard } from "./components/IdleCard";
import { NetworkCard } from "./components/NetworkCard";
import styles from "./App.module.css";

export default function App() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div>
            <p className={styles.eyebrow}>live demo</p>
            <h1 className={styles.title}>react-utils</h1>
            <p className={styles.subtitle}>
              A monorepo of lightweight React hooks — built by{" "}
              <a
                className={styles.link}
                href="https://github.com/auraqule/react-utils-monorepo"
                target="_blank"
                rel="noreferrer"
              >
                @auraqule
              </a>
            </p>
          </div>
          <div className={styles.headerLinks}>
            <a
              className={styles.npmBadge}
              href="https://www.npmjs.com/package/react-idle-detect"
              target="_blank"
              rel="noreferrer"
            >
              npm ↗
            </a>
            <a
              className={styles.ghBadge}
              href="https://github.com/auraqule/react-utils-monorepo"
              target="_blank"
              rel="noreferrer"
            >
              github ↗
            </a>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.grid}>
          <IdleCard />
          <NetworkCard />
        </div>

        <section className={styles.codeSection}>
          <p className={styles.sectionLabel}>usage</p>
          <div className={styles.codeGrid}>
            <div className={styles.codeBlock}>
              <div className={styles.codeHeader}>react-idle-detect</div>
              <pre
                className={styles.pre}
              >{`import { useIdleDetect } from 'react-idle-detect'

const { isIdle, isActive, lastActiveAt, reset } = useIdleDetect({
  timeout: 30_000,
  onIdle: () => console.log('user idle'),
  onActive: () => console.log('user back'),
})`}</pre>
            </div>
            <div className={styles.codeBlock}>
              <div className={styles.codeHeader}>
                @auraqule/react-network-status
              </div>
              <pre
                className={styles.pre}
              >{`import { useNetworkStatus } from '@auraqule/react-network-status'

const { isOnline, isOffline, connectionType,
        effectiveType, downlink, rtt, refresh }
  = useNetworkStatus()`}</pre>
            </div>
          </div>
        </section>

        <section className={styles.installSection}>
          <p className={styles.sectionLabel}>install</p>
          <div className={styles.installGrid}>
            <div className={styles.installBlock}>
              <pre className={styles.installPre}>
                npm install react-idle-detect
              </pre>
            </div>
            <div className={styles.installBlock}>
              <pre className={styles.installPre}>
                npm install @auraqule/react-network-status
              </pre>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>built with React + Vite · deployed on Vercel</p>
        <a
          href="https://github.com/auraqule/react-utils-monorepo"
          target="_blank"
          rel="noreferrer"
          className={styles.footerLink}
        >
          view source ↗
        </a>
      </footer>
    </div>
  );
}
