import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import * as qandasData from '@/data/qandas.json'

export interface QAData {
  id: string
  question: string
  answer: string
  next?: QAData | QAData[]
  status?: string
}

export class QA {
  id: string
  question: string | Function
  answer: string | Function
  next?: QA | QA[]
  status?: string

  constructor(data: QAData, t: Function) {
    this.id = data.id
    this.question = () => t(data.question)
    this.answer = () => this.processAnswer(data.answer, t)
    this.status = data.status || ""
    
    if (data.next) {
      if (Array.isArray(data.next)) {
        this.next = data.next.map(item => new QA(item, t))
      } else {
        this.next = new QA(data.next, t)
      }
    }
  }

  processAnswer(answer: string, t: Function): string {
    // Si la réponse contient des clés de traduction, les traduire
    if (answer.includes('what_is_your') || answer.includes('my.') || answer.includes('why.') || answer.includes('how_can_we')) {
      try {
        return t(answer)
      } catch {
        return answer
      }
    }
    return answer
  }
}

export class MessageObject {
  message: string | Function
  cls: string

  constructor(message: string | Function, cls?: string) {
    this.message = message
    this.cls = cls || ""
  }
}

const qandasStore = ref<QAData[]>(qandasData.qandas)

export function useQandAs() {
  const { t } = useI18n()

  const getQandAs = computed(() => {
    return qandasStore.value.map(data => new QA(data, t))
  })

  const updateQandAs = (newQandAs: QAData[]) => {
    qandasStore.value = newQandAs
  }

  const addQandA = (qanda: QAData) => {
    qandasStore.value.push(qanda)
  }

  const removeQandA = (id: string) => {
    const removeRecursive = (items: QAData[]): QAData[] => {
      return items.filter(item => {
        if (item.id === id) return false
        if (item.next) {
          if (Array.isArray(item.next)) {
            item.next = removeRecursive(item.next)
          } else if (item.next.id === id) {
            delete item.next
          }
        }
        return true
      })
    }
    qandasStore.value = removeRecursive(qandasStore.value)
  }

  const updateQandA = (id: string, updatedData: Partial<QAData>) => {
    const updateRecursive = (items: QAData[]): void => {
      items.forEach(item => {
        if (item.id === id) {
          Object.assign(item, updatedData)
        }
        if (item.next) {
          if (Array.isArray(item.next)) {
            updateRecursive(item.next)
          } else {
            updateRecursive([item.next])
          }
        }
      })
    }
    updateRecursive(qandasStore.value)
  }

  const exportQandAs = () => {
    return JSON.stringify({ qandas: qandasStore.value }, null, 2)
  }

  const importQandAs = (jsonData: string) => {
    try {
      const data = JSON.parse(jsonData)
      if (data.qandas && Array.isArray(data.qandas)) {
        qandasStore.value = data.qandas
        return true
      }
      return false
    } catch {
      return false
    }
  }

  return {
    qandas: getQandAs,
    updateQandAs,
    addQandA,
    removeQandA,
    updateQandA,
    exportQandAs,
    importQandAs
  }
}
