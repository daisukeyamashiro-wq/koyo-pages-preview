// 問い合わせメールの宛先・件名・本文を管理
// 問い合わせ先変更時はCONTACT_CONFIGのみ修正
const CONTACT_CONFIG = {
  email: "info@koyo-jpn.biz",
  subject: "中国発日本向け輸送のご相談",
  formUrl: "https://forms.gle/NN2nh1cTJW4Bq4Ee6",
  body: [
    "株式会社幸洋 ご担当者様",
    "",
    "中国発日本向け輸送について相談いたします。",
    "",
    "会社名：",
    "ご担当者名：",
    "商品名・用途：",
    "中国側出荷地：",
    "日本側納品先：",
    "数量・梱包数：",
    "総重量・容積（CBM）：",
    "希望出荷時期：",
    "希望輸送形態（LCL・FCL・未定）：",
    "電池・液体・粉末・磁石等の有無：",
    "相談内容：",
    "",
    "現在準備できる資料：",
    "・Invoice",
    "・Packing List",
    "・商品写真",
    "・SDS、MSDS",
    "・UN38.3",
    "・その他",
    "※該当するものを残してください。",
    "",
    "よろしくお願いいたします。",
  ].join("\n"),
};

const buildContactMailto = (additionalBodyLines = []) => {
  const additionalBody = additionalBodyLines.filter(Boolean).join("\n");
  const body = additionalBody
    ? `${CONTACT_CONFIG.body}\n\n${additionalBody}`
    : CONTACT_CONFIG.body;

  return `mailto:${CONTACT_CONFIG.email}?subject=${encodeURIComponent(CONTACT_CONFIG.subject)}&body=${encodeURIComponent(body)}`;
};

window.CONTACT_CONFIG = CONTACT_CONFIG;
window.buildContactMailto = buildContactMailto;

const contactHref = buildContactMailto();

const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const contactLinks = document.querySelectorAll("[data-contact-link]");
const formLinks = document.querySelectorAll("[data-form-link]");
const faqButtons = document.querySelectorAll(".faq-item button");
const contactToast = document.querySelector("[data-contact-toast]");
const contactToastMessage = document.querySelector("[data-contact-toast-message]");
const copyEmailButtons = document.querySelectorAll("[data-copy-email]");
const contactEmailLabels = document.querySelectorAll("[data-contact-email]");

const showContactToast = (message) => {
  if (!contactToast) return;
  if (message && contactToastMessage) {
    contactToastMessage.textContent = message;
  }
  contactToast.setAttribute("aria-hidden", "false");
  contactToast.classList.add("is-visible");
};

const copyText = async (text) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.inset = "0 auto auto -9999px";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    return document.execCommand("copy");
  } finally {
    textarea.remove();
  }
};

contactLinks.forEach((link) => {
  link.href = contactHref;
  link.addEventListener("click", () => {
    showContactToast(`メールアプリが開かない場合は ${CONTACT_CONFIG.email} 宛てに直接ご連絡ください。`);
  });
});

contactEmailLabels.forEach((label) => {
  label.textContent = CONTACT_CONFIG.email;
});

formLinks.forEach((link) => {
  if (CONTACT_CONFIG.formUrl) {
    link.href = CONTACT_CONFIG.formUrl;
    link.target = "_blank";
    link.rel = "noopener";
    link.removeAttribute("aria-disabled");
    return;
  }

  link.setAttribute("aria-disabled", "true");
  link.setAttribute("title", "Googleフォームの公開URL設定後に有効になります");
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showContactToast("GoogleフォームURLの設定が必要です。メールまたはコピー導線をご利用ください。");
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
      const copied = await copyText(CONTACT_CONFIG.email);
      button.textContent = copied ? "コピーしました" : CONTACT_CONFIG.email;
    } catch {
      button.textContent = CONTACT_CONFIG.email;
    }
  });
});

// 中国工場から日本納品までのスクロールストーリー
const oceanStory = document.querySelector("[data-ocean-story]");

if (oceanStory) {
  const storySticky = oceanStory.querySelector(".ocean-story-sticky");
  const storyScenes = [...oceanStory.querySelectorAll("[data-story-scene]")];
  const storyCopies = [...oceanStory.querySelectorAll("[data-story-copy]")];
  const storyJumps = [...oceanStory.querySelectorAll("[data-story-jump]")];
  const storyCounter = oceanStory.querySelector("[data-story-counter]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let activeStoryScene = 0;
  let storyFrame = 0;

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const smoothstep = (value) => {
    const progress = clamp(value);
    return progress * progress * (3 - (2 * progress));
  };

  const setActiveStoryScene = (index) => {
    if (index === activeStoryScene) return;
    activeStoryScene = index;

    storyCopies.forEach((copy, copyIndex) => {
      const isActive = copyIndex === index;
      copy.classList.toggle("is-active", isActive);
      copy.setAttribute("aria-hidden", String(!isActive));
    });

    storyJumps.forEach((button, buttonIndex) => {
      const isActive = buttonIndex === index;
      button.classList.toggle("is-active", isActive);
      if (isActive) {
        button.setAttribute("aria-current", "step");
      } else {
        button.removeAttribute("aria-current");
      }
    });

    if (storyCounter) {
      storyCounter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(storyScenes.length).padStart(2, "0")}`;
    }
  };

  const updateOceanStory = () => {
    storyFrame = 0;
    if (reducedMotion.matches || !storySticky || storyScenes.length < 2) return;

    const headerHeight = header?.offsetHeight || 0;
    const rect = oceanStory.getBoundingClientRect();
    const travel = Math.max(1, oceanStory.offsetHeight - storySticky.offsetHeight);
    const progress = clamp((headerHeight - rect.top) / travel);
    const exactScene = progress * (storyScenes.length - 1);
    const baseScene = Math.min(storyScenes.length - 1, Math.floor(exactScene));
    const localProgress = exactScene - baseScene;
    const blend = smoothstep((localProgress - 0.2) / 0.6);

    storyScenes.forEach((scene, index) => {
      let opacity = 0;
      let sceneProgress = 0;

      if (index < baseScene) {
        sceneProgress = 1;
      } else if (index === baseScene) {
        opacity = baseScene === storyScenes.length - 1 ? 1 : 1 - blend;
        sceneProgress = localProgress;
      } else if (index === baseScene + 1) {
        opacity = blend;
        sceneProgress = localProgress;
      }

      const direction = index % 2 === 0 ? 1 : -1;
      scene.style.setProperty("--scene-opacity", opacity.toFixed(3));
      scene.style.setProperty("--scene-scale", (1.075 - (sceneProgress * 0.04)).toFixed(4));
      scene.style.setProperty("--scene-shift", `${(direction * (1 - sceneProgress) * 0.7).toFixed(3)}%`);
    });

    const nextActive = Math.min(storyScenes.length - 1, Math.round(exactScene));
    setActiveStoryScene(nextActive);
    oceanStory.style.setProperty("--story-progress", progress.toFixed(4));
  };

  const requestStoryUpdate = () => {
    if (storyFrame) return;
    storyFrame = window.requestAnimationFrame(updateOceanStory);
  };

  storyJumps.forEach((button, index) => {
    button.addEventListener("click", () => {
      const headerHeight = header?.offsetHeight || 0;
      const travel = Math.max(1, oceanStory.offsetHeight - (storySticky?.offsetHeight || window.innerHeight));
      const ratio = index / Math.max(1, storyScenes.length - 1);
      window.scrollTo({
        top: oceanStory.offsetTop - headerHeight + (travel * ratio),
        behavior: reducedMotion.matches ? "auto" : "smooth",
      });
    });
  });

  storyCopies.forEach((copy, index) => {
    copy.setAttribute("aria-hidden", String(index !== 0));
  });

  window.addEventListener("scroll", requestStoryUpdate, { passive: true });
  window.addEventListener("resize", requestStoryUpdate);
  reducedMotion.addEventListener?.("change", requestStoryUpdate);
  requestStoryUpdate();
}
