<script setup>
import { ref } from 'vue';
import { useTodoList } from '/src/composables/useTodoList.js';

const todoRef = ref('');
const isEditRef = ref(false); // 編集ボタンを推したときにtrueにする
const { todoListRef, add, show, edit, del, check, countFin } = useTodoList();
/*
const todoListRef = ref([]);
const ls = localStorage.todoList; // ローカルストレージから値取得
let editId = -1;

//ローカルストレージにtodoListRefが存在していればparseし、無ければundifindeになるため空配列をセットする
todoListRef.value = ls ? JSON.parse(ls) : [];
*/

//const todoListRef = ref([
//  { id: 1, task: 'example1' },
//  { id: 2, task: 'example2' },
//  { id: 3, task: 'example3' },
//]);

//追加ボタンが押された時
const addTodo = () => {
  add(todoRef.value);
  todoRef.value = '';
  /*
  //  console.log(todoRef.value);
  const id = new Date().getTime();
  todoListRef.value.push({ id: id, task: todoRef.value });
  localStorage.todoList = JSON.stringify(todoListRef.value);
  todoRef.value = '';
  */
};

//編集ボタンが押された時
const showTodo = (id) => {
  todoRef.value = show(id);
  isEditRef.value = true; //編集中
  /*
  //配列から引数のidと同じ要素を検索する。
  //findの「todo」には配列の要素が引数として順番に入る。
  //「todo.id===id」がtrueならその時点の要素:todoが返る
  const todo = todoListRef.value.find((todo) => todo.id === id);
  todoRef.value = todo.task; //取得した要素からtaskを取り出す
  isEditRef.value = true; //編集中
  editId = id;
  */
};

//変更ボタンが押された時
const editTodo = () => {
  edit(todoRef.value);
  isEditRef.value = false;
  todoRef.value = '';
  /*
  //編集対象となるTODOを取得
  const todo = todoListRef.value.find((todo) => todo.id === editId);
  //TODOリストから編集対象のインデックスを取得
  const idx = todoListRef.value.findIndex((todo) => todo.id === editId);
  //taskを編集事TODOで置き換え
  todo.task = todoRef.value;
  //splice関数でインデックスを元に対象オブジェクトを置き換え
  todoListRef.value.splice(idx, 1, todo);
  //ローカルストレージに保存
  localStorage.todoList = JSON.stringify(todoListRef.value);
  //編集モード解除
  isEditRef.value = false;
  //IDを初期値に戻す
  editId = -1;
  todoRef.value = '';
  */
};

//削除ボタンが押された時
const deleteTodo = (id) => {
  del(id);
  /*
  ////編集対象となるTODOを取得
  //const todo = todoListRef.value.find((todo) => todo.id === id);
  ////TODOリストから編集対象のインデックスを取得
  //const idx = todoListRef.value.findIndex((todo) => todo.id === id);

  //共通関数の呼び出し
  const { todo, idx } = useTodoList(id);

  //削除確認のメッセージ表示
  const delMsg = '「' + todo.task + '」を削除しますか？';
  if (!confirm(delMsg)) return;

  //splice関数でインデックスを元に対象オブジェクトを削除
  todoListRef.value.splice(idx, 1);
  //ローカルストレージに保存
  localStorage.todoList = JSON.stringify(todoListRef.value);
  */
};

const changeCheck = (id) => {
  check(id);
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
    <!--
      v-if isEditRefがtrueなら表示され、falseなら表示されなくなります。
      v-elseは、その反対の動きになります。
    <button class="btn green" @click="editTodo" v-if="isEditRef">変更</button>
    <button class="btn" @click="addTodo" v-else>追加</button>
    -->
    <!--
      v-show true/falseに関係なく描画され、falseの時はCSSのdisplay:noneになり画面で見えなくなる
      v-if：切り替え時に高いコストがかかる（条件が実行時に変更する事がほとんどない場合に使用）
      v-show：初期表示に高いコストがかかる(頻繁に切り替え場合に使用)
    -->
    <button class="btn green" @click="editTodo" v-show="isEditRef">変更</button>
    <button class="btn" @click="addTodo" v-show="!isEditRef">追加</button>
  </div>
  <div class="box_List">
    <div class="todo_List" v-for="todo in todoListRef" :key="todo.id">
      <div class="todo" :class="{ fin: todo.checked }">
        <!-- 
        :v-bindディレクティブ　:checked=""と v-bind:checked=""は同じ
        :class classをバインドしオブジェクトに渡すことでクラスを動的に切り替え可能
        -->
        <input
          type="checkbox"
          class="check"
          @change="changeCheck(todo.id)"
          :checked="todo.checked"
        />
        <label>{{ todo.task }}</label>
      </div>
      <div class="btns">
        <button class="btn green" @click="showTodo(todo.id)">編</button>
        <button class="btn pink" @click="deleteTodo(todo.id)">削</button>
      </div>
    </div>
  </div>
  <div class="finCount">
    <span>完了：{{ countFin }}、</span>
    <span>未完了：{{ todoListRef.length - countFin }}</span>
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

.fin {
  text-decoration: line-through;
  background-color: #ddd;
  color: #777;
}

.finCount {
  margin-top: 8px;
  font-size: 0.8em;
}
</style>
