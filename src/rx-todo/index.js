import './index.scss'
import {Observable} from 'rxjs'

function createTodoItem(val) {
  const item = document.createElement('LI');
  item.classList.add('todo__item');
  item.innerHTML = `
    ${val}
    <button class="todo__btn todo__btn--remove">删除</button>
  `;
  return item;
}

const inputEl = document.querySelector('.todo__input');
const listEl = document.querySelector('.todo__list');
const btnAddEl = document.querySelector('.todo__btn--add');

const inputEnter$ = Observable.fromEvent(inputEl, 'keydown')
  .filter(e => e.keyCode === 13);

const btnAddClick$ = Observable.fromEvent(btnAddEl, 'click');

const inputDone$ = inputEnter$.merge(btnAddClick$);

const itemCreated$ = inputDone$
  .map(() => inputEl.value)
  .filter(val => val !== '')
  .map(createTodoItem)
  .do(itemEl => {
    listEl.appendChild(itemEl);
    inputEl.value = '';
  })
  .publishReplay(1)
  .refCount();

const toggleItem$ = itemCreated$.mergeMap(itemEl => {
  return Observable.fromEvent(itemEl, 'click')
    .filter(e => e.target === itemEl)
    .mapTo(itemEl)
}).do(itemEl => {
  let doneClassName = 'todo__item--done';
  if (itemEl.classList.contains(doneClassName)) {
    itemEl.classList.remove(doneClassName)
  } else {
    itemEl.classList.add(doneClassName);
  }
});

const removeItem$ = itemCreated$.mergeMap(itemEl => {
  const removeBtnEl = itemEl.querySelector('.todo__btn--remove');
  return Observable.fromEvent(removeBtnEl, 'click')
    .mapTo(itemEl)
}).do(itemEl => {
  itemEl.parentNode.removeChild(itemEl);
});

const app$ = toggleItem$.merge(removeItem$)

app$.subscribe();