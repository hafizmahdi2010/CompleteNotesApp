import { Navigate } from "react-router-dom";

export default function functions() {
  let errorVar;
  function sum(no1, no2) {
    let sum = no1 + no2;
    return sum;
  }

  // toggle class
  const toggleClass = (slection, nextClass) => {
    let elem = document.querySelector(slection);
    elem.classList.toggle(nextClass);
    // return true
  }

  function addClass(slection, addClass) {
    let elem = document.querySelector(slection);
    elem.classList.add(addClass);
  }

  function removeClass(slection, addClass) {
    let elem = document.querySelector(slection);
    elem.classList.remove(addClass);
  }

  const toggleLayout = (layout) => {
    localStorage.setItem("layout", localStorage.getItem("layout") == "grid" ? "row" : "grid");
  }

  function clickable(elem) {
    let el = document.querySelector(elem);
    el.click();
  }

  function togglePwd(pwdInput, toggleBtn) {
    let toggleButton = document.querySelector(toggleBtn)
    let input = document.querySelector(pwdInput);
    if (input.getAttribute("type") == "password") {
      input.setAttribute("type", "text");
      toggleButton.classList.replace("ri-eye-off-line", "ri-eye-line");
    }
    else {
      input.setAttribute("type", "password");
      toggleButton.classList.replace("ri-eye-line", "ri-eye-off-line");
    }
  }

  function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    localStorage.removeItem("userLogin");
    window.location.reload()
  }

  async function deleteNote(noteId) {
    let check = prompt("You Want To Delete This Note ! Type 'yes' For Delete The Note.");
    if (check === "yes") {

        try {
          const response = await fetch('http://localhost:8000/deleteNote', {
            mode: "cors",
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              noteId: noteId,
              uId: localStorage.getItem("userId"),
              email: localStorage.getItem("email"),
            }),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const responseData = await response.json();
          if (responseData.fale == 1) {
          }
          else {
            window.location.reload()
          }

        } catch (error) {
          errorVar = error
        }
      }
      else{
        console.log("Your Note Is Note Deleted")
      }
      
  }

  function elemFocus(elem){
    let el = document.querySelector(elem);
    el.focus()
  }

  return { sum, toggleClass, toggleLayout, addClass, removeClass, clickable, togglePwd, logout, deleteNote,elemFocus };
}