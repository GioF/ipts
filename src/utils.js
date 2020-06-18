//temporarily changes color of input for better responsiveness
export function blinkWithMessage(formRef, message) {
  formRef.current.placeholder = message;
  formRef.current.style.backgroundColor = "rgb(130, 48, 48)";
  setTimeout(() => {
    formRef.current.style.backgroundColor = "#4e5761";
    formRef.current.value = "";
  }, 500);
}
