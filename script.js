document.addEventListener("DOMContentLoaded", () => {
  let selectedBubble = null;
  let offsetX = 0;
  let offsetY = 0;

  const bubbles = document.querySelectorAll(".bubble");
  bubbles.forEach((bubble) => {
    // Handle mouse down events
    bubble.addEventListener("mousedown", (e) => {
      startDrag(e, bubble);
    });

    // Handle touch start events
    bubble.addEventListener(
      "touchstart",
      (e) => {
        startDrag(e, bubble);
      },
      { passive: false }
    ); // to allow e.preventDefault()

    function startDrag(e, bubble) {
      // Distinguish between touch and mouse events
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      // Calculate offset
      offsetX = clientX - bubble.getBoundingClientRect().left;
      offsetY = clientY - bubble.getBoundingClientRect().top;

      selectedBubble = bubble;

      if (e.touches) {
        e.preventDefault(); // Prevent scrolling for touch events
      }
    }

    function onMove(e) {
      if (!selectedBubble) return;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      // Move bubble
      selectedBubble.style.left = `${clientX - offsetX}px`;
      selectedBubble.style.top = `${clientY - offsetY}px`;

      checkCollision(selectedBubble);
    }

    function endDrag() {
      selectedBubble = null;
    }

    // Listen for mouse move and up events on the document
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", endDrag);

    // Listen for touch move and end events on the document
    document.addEventListener("touchmove", onMove, { passive: false });
    document.addEventListener("touchend", endDrag);
    document.addEventListener("touchcancel", endDrag); // Handle interruption
  });

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

          let bubbleWidth = parseInt(window.getComputedStyle(bubble).width) + 1;
          let bubbleHeight =
            parseInt(window.getComputedStyle(bubble).height) + 1;

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
