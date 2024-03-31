document.addEventListener("DOMContentLoaded", () => {
  let selectedBubble = null;
  let offsetX = 0;
  let offsetY = 0;

  const bubbles = document.querySelectorAll(".bubble");
  bubbles.forEach((bubble) => {
    bubble.addEventListener("mousedown", (e) => {
      selectedBubble = bubble;
      offsetX = e.clientX - bubble.getBoundingClientRect().left;
      offsetY = e.clientY - bubble.getBoundingClientRect().top;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  });

  function onMouseMove(e) {
    if (!selectedBubble) return;
    selectedBubble.style.left = e.clientX - offsetX + "px";
    selectedBubble.style.top = e.clientY - offsetY + "px";
    checkCollision(selectedBubble);
  }

  function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    selectedBubble = null;
  }

  function checkCollision(selected) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    bubbles.forEach((bubble) => {
      if (selected !== bubble) {
        const selectedRect = selected.getBoundingClientRect();
        const bubbleRect = bubble.getBoundingClientRect();
        if (
          !(
            selectedRect.right < bubbleRect.left ||
            selectedRect.left > bubbleRect.right ||
            selectedRect.bottom < bubbleRect.top ||
            selectedRect.top > bubbleRect.bottom
          )
        ) {
          let selectedWidth =
            parseInt(window.getComputedStyle(selected).width) + 1;
          let selectedHeight =
            parseInt(window.getComputedStyle(selected).height) + 1;

          // selected.style.width = selectedWidth;
          // selected.style.height = selectedHeight;

          let bubbleWidth = parseInt(window.getComputedStyle(bubble).width) + 1;
          let bubbleHeight =
            parseInt(window.getComputedStyle(bubble).height) + 1;

          // bubble.style.width = bubbleWidth;
          // bubble.style.height = bubbleHeight;

          // Check if the new size exceeds screen dimensions
          if (selectedWidth > screenWidth || selectedHeight > screenHeight) {
            // Reset to original size if it exceeds
            selected.style.width = `90px`;
            selected.style.height = `80px`;
          } else {
            // Apply the new size if it doesn't exceed
            selected.style.width = `${selectedWidth}px`;
            selected.style.height = `${selectedHeight}px`;
          }

          // Check if the new size exceeds screen dimensions
          if (bubbleWidth > screenWidth || bubbleHeight > screenHeight) {
            // Reset to original size if it exceeds
            bubble.style.width = `90px`;
            bubble.style.height = `80px`;
          } else {
            // Apply the new size if it doesn't exceed
            bubble.style.width = `${bubbleWidth}px`;
            bubble.style.height = `${bubbleHeight}px`;
          }
        }
      }
    });
  }
});
