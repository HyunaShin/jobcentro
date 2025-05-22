import { defineComponent, ref } from 'vue'
import { NGrid, NGi, NNumberAnimation, NIcon } from 'naive-ui'
import { useDatabase } from '@/views/monitor/servers/db/use-database'
import { CheckCircleOutlined, CloseCircleOutlined } from '@vicons/antd'
import Result from '@/components/result'
import styles from './index.module.scss'
import type { Ref } from 'vue'
import type { DatabaseRes } from '@/service/modules/monitor/types'
// TODO: 퍼블 검토 및 아이콘등 필요
const db = defineComponent({
  name: 'db',
  setup() {
    const { getDatabase } = useDatabase()
    const databaseRef: Ref<DatabaseRes[]> = ref(getDatabase())

    return { databaseRef }
  },
  render() {
    const { databaseRef } = this

    return databaseRef.length < 1 ? (
      <Result
        title='데이터베이스 서버 노드가 존재하지 않습니다.'
        description='현재 데이터베이스 서버 노드가 존재하지 않습니다. 데이터베이스 노드를 생성한 후 이 페이지를 새로고침하세요.'
        status={'info'}
        size={'medium'}
      />
    ) : (
      <div class={styles.container}>
        <div class="h-flex">
          <div class={[styles.graphBox, "contentBox"]}>
            <div class="titleWrap">
              <div class="title">동작 상태 </div>
            </div>
            <div class="chartWrap">
              <div class={styles.card}>
                {databaseRef[0] &&
                  (databaseRef[0].state ? (
                    <NIcon class={styles['health-success']}>
                      <CheckCircleOutlined />
                    </NIcon>
                  ) : (
                    <NIcon class={styles['health-error']}>
                      <CloseCircleOutlined />
                    </NIcon>
                  ))}
              </div>
            </div>
          </div>
          <div class={[styles.graphBox, "contentBox"]}>
            <div class="titleWrap">
              <div class="title">최대 연결수 {databaseRef[0] ? ' - ' + databaseRef[0].date : ''} </div>
            </div>
            <div class="chartWrap">
              <div class={styles.connections}>
                {databaseRef[0] && (
                  <NNumberAnimation from={0} to={databaseRef[0].maxConnections} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div class="h-flex">
          <div class={[styles.graphBox, "contentBox"]}>
            <div class="titleWrap">
              <div class="title">스레드 연결 수 </div>
            </div>
            <div class="chartWrap">
              <div class={styles.connections}>
                {databaseRef[0] && (
                  <NNumberAnimation
                    from={0}
                    to={databaseRef[0].threadsConnections}
                  />
                )}
              </div>
            </div>
          </div>
          <div class={[styles.graphBox, "contentBox"]}>
            <div class="titleWrap">
              <div class="title">실행 중인 스레드 연결 수 </div>
            </div>
            <div class="chartWrap">
              <div class={styles.connections}>
                {databaseRef[0] && (
                  <NNumberAnimation
                    from={0}
                    to={databaseRef[0].threadsRunningConnections}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default db
