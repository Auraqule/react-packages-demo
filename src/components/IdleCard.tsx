import { useIdleDetect } from "react-idle-detect";
import { useState, useCallback, useRef, useEffect } from "react";
import styles from "./IdleCard.module.css";

export function IdleCard() {
  const [idleCount, setIdleCount] = useState(0);
  const [, forceUpdate] = useState(0);
  const animationRef = useRef<number>();
  const [log, setLog] = useState<{ time: string; msg: string; type: string }[]>(
    [{ time: now(), msg: "hook mounted — user active", type: "active" }]
  );

  const addLog = useCallback((msg: string, type: string) => {
    setLog((prev) => [{ time: now(), msg, type }, ...prev].slice(0, 12));
  }, []);

  const { isIdle, lastActiveAt, reset } = useIdleDetect({
    timeout: 10_000,
    onIdle: () => {
      setIdleCount((c) => c + 1);
      addLog("onIdle() fired — user inactive for 10s", "idle");
    },
    onActive: () => {
      addLog("onActive() fired — user interaction detected", "active");
    },
  });

  // Animation loop for timer bar only - doesn't trigger idle detection
  useEffect(() => {
    const animate = () => {
      forceUpdate((c) => c + 1);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const secAgo = Math.floor((Date.now() - lastActiveAt) / 1000);

  return (
    <div
      className={`${styles.card} ${
        isIdle ? styles.cardIdle : styles.cardActive
      }`}
    >
      <div className={styles.pkg}>
        <span
          className={`${styles.dot} ${
            isIdle ? styles.dotIdle : styles.dotActive
          }`}
        />
        react-idle-detect
      </div>

      <div className={styles.statusLabel}>user state</div>
      <div
        className={`${styles.statusValue} ${
          isIdle ? styles.valueIdle : styles.valueActive
        }`}
      >
        {isIdle ? "Idle 💤" : "Active ✅"}
      </div>

      <div className={styles.timerWrap}>
        <div
          className={`${styles.timerBar} ${isIdle ? styles.timerBarIdle : ""}`}
          style={{
            width: isIdle ? "0%" : `${Math.max(0, 100 - (secAgo / 10) * 100)}%`,
          }}
        />
      </div>

      <div className={styles.meta}>
        <div className={styles.metaRow}>
          <span className={styles.metaKey}>last active</span>
          <span className={styles.metaVal}>
            {secAgo === 0 ? "just now" : `${secAgo}s ago`}
          </span>
        </div>
        <div className={styles.metaRow}>
          <span className={styles.metaKey}>idle count</span>
          <span className={styles.metaVal}>{idleCount}</span>
        </div>
        <div className={styles.metaRow}>
          <span className={styles.metaKey}>timeout</span>
          <span className={styles.metaVal}>10s</span>
        </div>
      </div>

      <button
        className={styles.btn}
        onClick={() => {
          reset();
          addLog("timer manually reset by user", "active");
        }}
      >
        reset timer
      </button>

      <div className={styles.log}>
        <div className={styles.logHeader}>event log</div>
        {log.map((e, i) => (
          <div
            key={i}
            className={`${styles.logEntry} ${styles["log_" + e.type]}`}
          >
            <span className={styles.logTime}>{e.time}</span>
            <span>{e.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function now() {
  return new Date().toTimeString().slice(0, 8);
}
