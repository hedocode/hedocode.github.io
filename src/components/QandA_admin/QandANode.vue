<template>
  <div class="qanda-node" :style="{ marginLeft: level * 20 + 'px' }">
    <div class="qanda-item">
      <div class="qanda-content">
        <strong>{{ qanda.id }}</strong>
        <div class="qanda-question">
          Q: {{ typeof qanda.question === 'function' ? qanda.question() : qanda.question }}
        </div>
        <div class="qanda-answer">
          A: {{ typeof qanda.answer === 'function' ? qanda.answer() : qanda.answer }}
        </div>
      </div>
      
      <div class="qanda-actions">
        <button @click="$emit('edit', qanda)" class="edit-btn">✏️</button>
        <button @click="$emit('delete', qanda.id)" class="delete-btn">🗑️</button>
      </div>
    </div>
    
    <!-- Affichage récursif des Q&A suivantes -->
    <div v-if="qanda.next" class="qanda-children">
      <template v-if="Array.isArray(qanda.next)">
        <QandANode 
          v-for="child in qanda.next" 
          :key="child.id"
          :qanda="child"
          :level="level + 1"
          @edit="$emit('edit', $event)"
          @delete="$emit('delete', $event)"
        />
      </template>
      <template v-else>
        <QandANode 
          :qanda="qanda.next"
          :level="level + 1"
          @edit="$emit('edit', $event)"
          @delete="$emit('delete', $event)"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  qanda: any
  level: number
}

defineProps<Props>()
defineEmits<{
  edit: [qanda: any]
  delete: [id: string]
}>()
</script>

<style lang="scss" scoped>
.qanda-node {
  margin-bottom: 12px;
}

.qanda-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 3px solid #007bff;
}

.qanda-content {
  flex: 1;
  
  strong {
    color: #007bff;
    font-size: 14px;
  }
  
  .qanda-question, .qanda-answer {
    margin: 4px 0;
    font-size: 13px;
    line-height: 1.4;
  }
  
  .qanda-question {
    color: #495057;
  }
  
  .qanda-answer {
    color: #6c757d;
    max-height: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.qanda-actions {
  display: flex;
  gap: 4px;
  
  button {
    padding: 4px 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    
    &.edit-btn {
      background: #ffc107;
      
      &:hover {
        background: #e0a800;
      }
    }
    
    &.delete-btn {
      background: #dc3545;
      
      &:hover {
        background: #c82333;
      }
    }
  }
}

.qanda-children {
  margin-top: 8px;
  border-left: 2px solid #dee2e6;
  padding-left: 8px;
}
</style>
