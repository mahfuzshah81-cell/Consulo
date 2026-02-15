// Scroll up button
class ScrollTop extends HTMLElement {
  constructor() {
    super();
    this.button = this.querySelector(".scroll-to-top");
  }

  connectedCallback() {
    this.onScroll();
    this.button.addEventListener("click", this.onClick.bind(this));
  }

  onScroll() {
    window.addEventListener("scroll", function () {
      const scrollToTopButton = document.querySelector(".scroll-to-top");
      const footer = document.querySelector("footer");

      const scrollThreshold = 200;
      const footerHeight = footer ? footer.offsetHeight : 0;
      const distanceFromFooter = 50;

      const scrollY = window.scrollY || window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;

      // Show/Hide logic
      if (scrollY > scrollThreshold) {
        scrollToTopButton.classList.add("show");
      } else {
        scrollToTopButton.classList.remove("show");
      }

      // Stop before footer logic
      if (footer) {
        const footerTop = footer.offsetTop;
        const buttonBottomRelativeToViewport =
          viewportHeight - scrollToTopButton.getBoundingClientRect().bottom;
        const distanceToFooterTop =
          documentHeight - scrollY - viewportHeight - footerHeight;

        if (distanceToFooterTop < distanceFromFooter) {
          scrollToTopButton.style.transform = "scale(0)";
          scrollToTopButton.style.bottom = `${
            footerHeight +
            distanceFromFooter -
            (viewportHeight - buttonBottomRelativeToViewport)
          }px`;
        } else {
          scrollToTopButton.style.transform = "scale(1)";
          scrollToTopButton.style.bottom = "20px";
        }
      }
    });
  }

  onClick() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}

customElements.define("scroll-top", ScrollTop);