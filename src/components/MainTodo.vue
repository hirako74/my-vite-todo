<script setup>
import { ref } from 'vue';
const todoRef = ref('');
const todoListRef = ref([]);
const ls = localStorage.todoList;
todoListRef.value = ls ? JSON.parse(ls) : [];

//const todoListRef = ref([
//  { id: 1, task: 'example1' },
//  { id: 2, task: 'example2' },
//  { id: 3, task: 'example3' },
//]);
const addTodo = () => {
  //  console.log(todoRef.value);
  const id = new Date().getTime();
  todoListRef.value.push({ id: id, task: todoRef.value });
  localStorage.todoList = JSON.stringify(todoListRef.value);
  todoRef.value = '';
};
</script>

<template>
  <div class="box_input">
    <input
      type="text"
      class="todo_input"
      v-model="todoRef"
      placeholder="+ TODOを入力"
    />
    <button class="btn" @click="addTodo">追加</button>
  </div>
  <div class="box_List">
    <div class="todo_List" v-for="todo in todoListRef" :key="todo.id">
      <div class="todo">
        <input type="checkbox" class="check" />
        <label>{{ todo.task }}</label>
      </div>
      <div class="btns">
        <button class="btn green">編</button>
        <button class="btn pink">削</button>
      </div>
    </div>
  </div>
  <!--
  <div v-for="(example, index) in todoExample" :key="index">
    <p>{{ index }}.{{ example }}</p>
  </div>
  -->
</template>

<style scoped>
.box_input {
  margin-top: 20px;
}
.todo_input {
  width: 300px;
  margin-right: 8px;
  padding: 8px;
  font-size: 18px;
  border: 1px solid #aaa;
  border-radius: 6px;
}

.btn {
  padding: 8px;
  background-color: #03a9f4;
  border-radius: 6px;
  color: #fff;
  text-align: center;
  font-size: 14px;
}

.box_List {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.todo_List {
  display: flex;
  align-items: center;
  gap: 8px;
}

.todo {
  display: flex; /*勝手に追加*/
  align-items: center; /*勝手に追加*/
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 12px;
  width: 300px;
}

.check {
  border: 1px solid red;
  transform: scale(1.6);
  margin: 0 16px 2px 6px;
  width: 15px; /* 勝手に追加:ボックスの横幅を指定する */
  height: 15px; /* 勝手に追加:ボックスの高さを指定する */
  border-radius: 2px; /* 勝手に追加:ボックスの角丸を指定する */
  /*
*/
}

.btns {
  display: flex;
  gap: 4px;
}

.green {
  background-color: #00c853;
}

.pink {
  background-color: #ff4081;
}
</style>
