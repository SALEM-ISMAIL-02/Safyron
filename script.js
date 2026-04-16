const revealItems = document.querySelectorAll(".reveal");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.18 });

        revealItems.forEach((item) => {
            if (!item.classList.contains("visible")) {
                observer.observe(item);
            }
        });

        const flowPath = document.getElementById("pipeFlow");
        const pipelineNodes = document.querySelectorAll(".pipeline-node");
        const fireScene = document.getElementById("fireScene");
        const sprinklerHead = document.getElementById("sprinklerHead");

        function updateScrollFlow() {
            const scrollTop = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;

            // Controls how much of the vertical pipe is visibly filled as the user scrolls.
            const length = flowPath.getTotalLength();
            flowPath.style.strokeDasharray = `${Math.max(8, length * progress)} ${length}`;

            // Each node lights up when scroll progress passes its threshold.
            // To tweak timing, change how "trigger" is calculated or replace it with fixed values.
            pipelineNodes.forEach((node, index) => {
                const trigger = (index + 1) / (pipelineNodes.length + 1);
                node.classList.toggle("live", progress >= trigger);
            });

            // Scroll progress at which the sprinkler starts spraying.
            sprinklerHead.classList.toggle("active", progress >= 0.99);

            // Scroll progress at which the fire is considered extinguished.
            fireScene.classList.toggle("extinguished", progress >= 0.99);
        }

        updateScrollFlow();
        window.addEventListener("scroll", updateScrollFlow, { passive: true });
        window.addEventListener("resize", updateScrollFlow);

        const siteHeader = document.querySelector(".site-header");
        const navToggle = document.querySelector(".nav-toggle");
        const navLinks = document.querySelectorAll(".nav a");

        function setMobileNavState(isOpen) {
            siteHeader.classList.toggle("nav-open", isOpen);
            navToggle.setAttribute("aria-expanded", String(isOpen));
            navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
        }

        navToggle.addEventListener("click", () => {
            const isOpen = navToggle.getAttribute("aria-expanded") === "true";
            setMobileNavState(!isOpen);
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                if (window.innerWidth <= 860) {
                    setMobileNavState(false);
                }
            });
        });

        document.addEventListener("click", (event) => {
            if (
                window.innerWidth <= 860 &&
                siteHeader.classList.contains("nav-open") &&
                !siteHeader.contains(event.target)
            ) {
                setMobileNavState(false);
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                setMobileNavState(false);
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 860) {
                setMobileNavState(false);
            }
        });

        const newsletterForm = document.getElementById("newsletterForm");
        const newsletterNote = document.getElementById("newsletterNote");

        newsletterForm.addEventListener("submit", (event) => {
            event.preventDefault();
            newsletterNote.textContent = "Demo captured. A backend or email tool can be connected later.";
        });
