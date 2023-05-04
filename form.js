// form 처리 js

const form = document.querySelector("form");

function remove_children(parent) {
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
}

function getTime(date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const h = date.getHours();
  const minute = date.getMinutes();
  const s = date.getSeconds();
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(
    2,
    "0"
  )}T${String(h).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(
    s
  ).padStart(2, "0")}Z`;
}

class IDGenerator {
  #count = 0;
  getID() {
    const timestamp = new Date().getTime().toString(16);
    const randomNumber = Math.floor(Math.random() * 2 ** 20).toString(16);

    const count = this.#count.toString(16);
    this.#count = (this.#count + 1) % 2 ** 12;

    return timestamp + randomNumber.padStart(5, "0") + count.padStart(3, "0");
  }
}

function handleFormEvent(event) {
  // 입력받은 값을 오브젝트에 저장
  // 저장할 것들 (id, 시간, 제목, url, 작성자, 답변 유무, 내용, 작성자 사진, )

  const target = event.target;

  // id
  const id = new IDGenerator().getID();

  // 시간
  const date = new Date();
  const createdAt = getTime(date);

  // 제목
  let title = target.querySelector(".form__input--title > input");

  // url
  const url = "null";

  // 작성자
  const author = target.querySelector(".form__input--name > input");

  // 답변
  const answer = null;

  // 내용
  const bodyHTML = target.querySelector("#story");

  // 작성자 사진
  const avatarUrl = null;

  // 객체화
  const item = {
    id,
    createdAt,
    title: title.value,
    url,
    author: author.value,
    answer,
    bodyHTML: bodyHTML.value,
    avatarUrl,
  };
  agoraStatesDiscussions.unshift(item);
  title.value = "";
  author.value = "";
  bodyHTML.value = "";
  remove_children(ul);
  render(ul);

  event.preventDefault();
}

form.addEventListener("submit", handleFormEvent);
