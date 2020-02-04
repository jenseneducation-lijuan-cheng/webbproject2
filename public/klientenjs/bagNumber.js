function updateBagNumber() {
  fetch("/api/bag?username=user")
    .then(response => {
      return response.json();
    })
    .then(baglist => {
      document.getElementById("number").innerHTML = baglist.length;
    });
}
export default updateBagNumber;
