//共通化処理
import { computed, ref } from 'vue';

export const useTodoList = () => {
  const ls = localStorage.todoList; // ローカルストレージから値取得
  const todoListRef = ref([]);
  //ローカルストレージにtodoListRefが存在していればparseし、無ければundifindeになるため空配列をセットする
  todoListRef.value = ls ? JSON.parse(ls) : [];
  const editID = ref(-1);

  //TODOリストからIDを元にTODO情報を取得
  const findById = (id) => {
    return todoListRef.value.find((todo) => todo.id === id);
  };

  //TODOリストから編集対象のインデックスを取得
  const findIndexById = (id) => {
    return todoListRef.value.findIndex((todo) => todo.id === id);
  };

  //追加処理
  const add = (task) => {
    const id = new Date().getTime();
    todoListRef.value.push({ id: id, task: task, checked: false });
    localStorage.todoList = JSON.stringify(todoListRef.value);
  };

  //変更処理
  const show = (id) => {
    //配列から引数のidと同じ要素を検索する。
    //findの「todo」には配列の要素が引数として順番に入る。
    //「todo.id===id」がtrueならその時点の要素:todoが返る
    const todo = findById(id);
    editID.value = id;
    return todo.task;
  };

  //編集処理
  const edit = (task) => {
    //編集対象となるTODOを取得
    const todo = findById(editID.value);
    //TODOリストから編集対象のインデックスを取得
    const idx = findIndexById(editID.value);
    //taskを編集事TODOで置き換え
    todo.task = task;
    //splice関数でインデックスを元に対象オブジェクトを置き換え
    todoListRef.value.splice(idx, 1, todo);
    //ローカルストレージに保存
    localStorage.todoList = JSON.stringify(todoListRef.value);
    //IDを初期値に戻す
    editID.value = -1;
  };

  //削除処理
  const del = (id) => {
    ////編集対象となるTODOを取得
    const todo = findById(id);
    //削除確認のメッセージ表示
    const delMsg = '「' + todo.task + '」を削除しますか？';
    if (!confirm(delMsg)) return;
    ////TODOリストから編集対象のインデックスを取得
    const idx = findIndexById(id);
    //splice関数でインデックスを元に対象オブジェクトを削除
    todoListRef.value.splice(idx, 1);
    //ローカルストレージに保存
    localStorage.todoList = JSON.stringify(todoListRef.value);
  };

  //チェックボックスがおされた時の処理
  const check = (id) => {
    //編集対象となるTODOを取得
    const todo = findById(id);
    //TODOリストから編集対象のインデックスを取得
    const idx = findIndexById(id);
    //true/falseを反転させる
    todo.checked = !todo.checked;
    //splice関数でインデックスを元に対象オブジェクトを置き換え
    todoListRef.value.splice(idx, 1, todo);
    //ローカルストレージに保存
    localStorage.todoList = JSON.stringify(todoListRef.value);
  };

  const countFin = computed(() => {
    //todo.checkedはture/faleがはいっているため、trueのtodoが返る
    const finArr = todoListRef.value.filter((todo) => todo.checked);
    return finArr.length;
  });

  //returnする事でtodoListRef ... を外部から使う事ができる
  return { todoListRef, add, show, edit, del, check, countFin };
};
