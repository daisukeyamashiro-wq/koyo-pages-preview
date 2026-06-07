const CONTACT_CONFIG = {
  email: "info@koyo-jpn.biz",
  subject: "中国→日本物流の事前確認依頼",
  body: [
    "会社名：",
    "ご担当者名：",
    "貨物名：",
    "出荷地：",
    "日本側仕向地：",
    "希望輸送形態：LCL / FCL / 未定",
    "希望納期：",
    "サイズ・重量・M3：",
    "電池・液体・粉末・磁石・化学品の有無：",
    "添付資料：Invoice / Packing List / SDS / MSDS / UN38.3 / 商品写真",
    "相談内容：",
  ].join("\n"),
};

const contactHref = `mailto:${CONTACT_CONFIG.email}?subject=${encodeURIComponent(CONTACT_CONFIG.subject)}&body=${encodeURIComponent(CONTACT_CONFIG.body)}`;

const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const contactLinks = document.querySelectorAll("[data-contact-link]");
const faqButtons = document.querySelectorAll(".faq-item button");
const contactToast = document.querySelector("[data-contact-toast]");
const copyEmailButtons = document.querySelectorAll("[data-copy-email]");

contactLinks.forEach((link) => {
  link.href = contactHref;
  link.addEventListener("click", () => {
    if (!contactToast) return;
    contactToast.setAttribute("aria-hidden", "false");
    contactToast.classList.add("is-visible");
  });
});

const closeNavigation = () => {
  document.body.classList.remove("nav-open");
  navToggle?.setAttribute("aria-expanded", "false");
};

navToggle?.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeNavigation);
});

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
});

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isOpen = button.getAttribute("aria-expanded") === "true";

    item?.classList.toggle("is-open", !isOpen);
    button.setAttribute("aria-expanded", String(!isOpen));
  });
});

copyEmailButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_CONFIG.email);
      button.textContent = "コピーしました";
    } catch {
      button.textContent = CONTACT_CONFIG.email;
    }
  });
});
