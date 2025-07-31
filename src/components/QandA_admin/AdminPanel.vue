<template>
  <div class="admin-panel" v-if="isDev">
    <button @click="togglePanel" class="admin-toggle">
      🛠️ Admin
    </button>
    
    <div v-if="showPanel" class="admin-content">
      <h2>Administration des Q&A</h2>
      
      <div class="admin-tabs">
        <button 
          @click="activeTab = 'view'" 
          :class="{ active: activeTab === 'view' }"
        >
          Visualiser
        </button>
        <button 
          @click="activeTab = 'add'" 
          :class="{ active: activeTab === 'add' }"
        >
          Ajouter
        </button>
        <button 
          @click="activeTab = 'export'" 
          :class="{ active: activeTab === 'export' }"
        >
          Import/Export
        </button>
      </div>

      <!-- Tab Visualiser -->
      <div v-if="activeTab === 'view'" class="tab-content">
        <div class="qanda-tree">
          <QandANode 
            v-for="qanda in qandas" 
            :key="qanda.id"
            :qanda="qanda"
            :level="0"
            @edit="editQandA"
            @delete="deleteQandA"
          />
        </div>
      </div>

      <!-- Tab Ajouter -->
      <div v-if="activeTab === 'add'" class="tab-content">
        <form @submit.prevent="saveQandA" class="qanda-form">
          <div class="form-group">
            <label>ID:</label>
            <input v-model="newQandA.id" required />
          </div>
          
          <div class="form-group">
            <label>Question (clé de traduction):</label>
            <input v-model="newQandA.question" required />
          </div>
          
          <div class="form-group">
            <label>Réponse:</label>
            <textarea v-model="newQandA.answer" rows="4" required></textarea>
          </div>
          
          <div class="form-actions">
            <button type="submit">{{ editingId ? 'Modifier' : 'Ajouter' }}</button>
            <button type="button" @click="resetForm" v-if="editingId">Annuler</button>
          </div>
        </form>
      </div>

      <!-- Tab Import/Export -->
      <div v-if="activeTab === 'export'" class="tab-content">
        <div class="export-section">
          <h3>Exporter</h3>
          <button @click="exportData">Exporter JSON</button>
          <textarea v-model="exportedData" readonly rows="10" placeholder="Les données exportées apparaîtront ici..."></textarea>
        </div>
        
        <div class="import-section">
          <h3>Importer</h3>
          <textarea v-model="importData" rows="10" placeholder="Collez votre JSON ici..."></textarea>
          <button @click="importDataFunc">Importer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQandAs, type QAData } from '@/composables/useQandAs'
import QandANode from './QandANode.vue'

const { qandas, addQandA, removeQandA, updateQandA, exportQandAs, importQandAs } = useQandAs()

const isDev = computed(() => process.env.NODE_ENV === 'development')
const showPanel = ref(false)
const activeTab = ref('view')

const newQandA = ref<QAData>({
  id: '',
  question: '',
  answer: ''
})

const editingId = ref<string | null>(null)
const exportedData = ref('')
const importData = ref('')

const togglePanel = () => {
  showPanel.value = !showPanel.value
}

const saveQandA = () => {
  if (editingId.value) {
    updateQandA(editingId.value, { ...newQandA.value })
    editingId.value = null
  } else {
    addQandA({ ...newQandA.value })
  }
  resetForm()
}

const resetForm = () => {
  newQandA.value = {
    id: '',
    question: '',
    answer: ''
  }
  editingId.value = null
}

const editQandA = (qanda: any) => {
  newQandA.value = {
    id: qanda.id,
    question: typeof qanda.question === 'function' ? qanda.question() : qanda.question,
    answer: typeof qanda.answer === 'function' ? qanda.answer() : qanda.answer
  }
  editingId.value = qanda.id
  activeTab.value = 'add'
}

const deleteQandA = (id: string) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette Q&A ?')) {
    removeQandA(id)
  }
}

const exportData = () => {
  exportedData.value = exportQandAs()
}

const importDataFunc = () => {
  if (importQandAs(importData.value)) {
    alert('Import réussi!')
    importData.value = ''
  } else {
    alert('Erreur lors de l\'import. Vérifiez le format JSON.')
  }
}
</script>

<style lang="scss" scoped>
.admin-panel {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}

.admin-toggle {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background: #0056b3;
  }
}

.admin-content {
  position: absolute;
  top: 40px;
  right: 0;
  width: 600px;
  max-height: 80vh;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  
  h2 {
    background: #007bff;
    color: white;
    margin: 0;
    padding: 16px;
    font-size: 18px;
  }
}

.admin-tabs {
  display: flex;
  background: #f8f9fa;
  
  button {
    flex: 1;
    padding: 12px;
    border: none;
    background: transparent;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    
    &.active {
      background: white;
      border-bottom-color: #007bff;
    }
    
    &:hover {
      background: #e9ecef;
    }
  }
}

.tab-content {
  padding: 20px;
  max-height: 60vh;
  overflow-y: auto;
}

.qanda-form {
  .form-group {
    margin-bottom: 16px;
    
    label {
      display: block;
      margin-bottom: 4px;
      font-weight: bold;
    }
    
    input, textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-family: inherit;
    }
  }
  
  .form-actions {
    display: flex;
    gap: 8px;
    
    button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      
      &[type="submit"] {
        background: #28a745;
        color: white;
      }
      
      &[type="button"] {
        background: #6c757d;
        color: white;
      }
    }
  }
}

.export-section, .import-section {
  margin-bottom: 24px;
  
  h3 {
    margin: 0 0 12px 0;
  }
  
  button {
    margin-bottom: 8px;
    padding: 8px 16px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: monospace;
    font-size: 12px;
  }
}
</style>
