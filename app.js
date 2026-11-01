(function () {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".site-nav");
    const links = [...document.querySelectorAll(".site-nav a[href^='#']")];
    const sections = links
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    function closeNav() {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.querySelector(".sr-only").textContent = "Open menu";
    }

    toggle.addEventListener("click", () => {
        const open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
        toggle.querySelector(".sr-only").textContent = open ? "Close menu" : "Open menu";
    });

    links.forEach((link) => {
        link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeNav();
    });

    const filters = [...document.querySelectorAll(".filter")];
    const cards = [...document.querySelectorAll(".work-card")];
    const empty = document.querySelector(".filter-empty");

    filters.forEach((button) => {
        button.addEventListener("click", () => {
            filters.forEach((item) => item.classList.remove("is-active"));
            button.classList.add("is-active");
            const value = button.dataset.filter;
            let visible = 0;
            cards.forEach((card) => {
                const show = value === "all" || card.dataset.cat === value;
                card.hidden = !show;
                if (show) visible += 1;
            });
            empty.hidden = visible !== 0;
        });
    });

    const form = document.getElementById("contact-form");
    const note = document.getElementById("form-note");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const name = String(data.get("name")).trim();
        const email = String(data.get("email")).trim();
        const subject = String(data.get("subject")).trim();
        const message = String(data.get("message")).trim();
        const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
        window.location.href =
            "mailto:987omar123osama456@gmail.com" +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(body);
        note.textContent = "Your email app should open with this message ready to send.";
    });

    if ("IntersectionObserver" in window) {
        const spy = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                links.forEach((link) => {
                    link.classList.toggle("is-current", link.getAttribute("href") === "#" + entry.target.id);
                });
            });
        }, { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 });

        sections.forEach((section) => spy.observe(section));
    }
})();
