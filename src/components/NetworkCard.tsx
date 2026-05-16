import { useNetworkStatus } from '@auraqule/react-network-status'
import { useState } from 'react'
import styles from './NetworkCard.module.css'

export function NetworkCard() {
  const [changes, setChanges] = useState(0)
  const [log, setLog] = useState<{ time: string; msg: string; type: string }[]>([
    { time: now(), msg: 'hook mounted — checking connection', type: 'info' }
  ])

  const { isOnline, isOffline, connectionType, effectiveType, downlink, rtt, saveData, refresh } =
    useNetworkStatus()

  function addLog(msg: string, type: string) {
    setChanges(c => c + 1)
    setLog(prev => [{ time: now(), msg, type }, ...prev].slice(0, 12))
  }

  const handleRefresh = () => {
    refresh()
    addLog(`refreshed — navigator.onLine: ${navigator.onLine}`, 'info')
  }

  return (
    <div className={`${styles.card} ${isOffline ? styles.cardOffline : styles.cardOnline}`}>
      <div className={styles.pkg}>
        <span className={`${styles.dot} ${isOffline ? styles.dotOffline : styles.dotOnline}`} />
        @auraqule/react-network-status
      </div>

      <div className={styles.statusLabel}>connection</div>
      <div className={`${styles.statusValue} ${isOffline ? styles.valueOffline : styles.valueOnline}`}>
        {isOnline ? 'Online 🟢' : 'Offline 🔴'}
      </div>

      <div className={styles.meta}>
        <div className={styles.metaRow}>
          <span className={styles.metaKey}>navigator.onLine</span>
          <span className={styles.metaVal}>{String(isOnline)}</span>
        </div>
        <div className={styles.metaRow}>
          <span className={styles.metaKey}>connectionType</span>
          <span className={styles.metaVal}>{connectionType}</span>
        </div>
        <div className={styles.metaRow}>
          <span className={styles.metaKey}>effectiveType</span>
          <span className={styles.metaVal}>{effectiveType}</span>
        </div>
        {downlink !== undefined && (
          <div className={styles.metaRow}>
            <span className={styles.metaKey}>downlink</span>
            <span className={styles.metaVal}>{downlink} Mbps</span>
          </div>
        )}
        {rtt !== undefined && (
          <div className={styles.metaRow}>
            <span className={styles.metaKey}>rtt</span>
            <span className={styles.metaVal}>{rtt} ms</span>
          </div>
        )}
        {saveData !== undefined && (
          <div className={styles.metaRow}>
            <span className={styles.metaKey}>saveData</span>
            <span className={styles.metaVal}>{String(saveData)}</span>
          </div>
        )}
        <div className={styles.metaRow}>
          <span className={styles.metaKey}>status changes</span>
          <span className={styles.metaVal}>{changes}</span>
        </div>
      </div>

      <button className={styles.btn} onClick={handleRefresh}>
        refresh status
      </button>

      <div className={styles.log}>
        <div className={styles.logHeader}>event log</div>
        {log.map((e, i) => (
          <div key={i} className={`${styles.logEntry} ${styles['log_' + e.type]}`}>
            <span className={styles.logTime}>{e.time}</span>
            <span>{e.msg}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function now() {
  return new Date().toTimeString().slice(0, 8)
}
