// Services Panel Toggle
function toggleService(service) {
    const container = document.querySelector('.services-split-container');

    // Remove both active classes first to reset
    container.classList.remove('active-ui', 'active-dev');

    // Add the appropriate class based on selection
    if (service === 'ui') {
        container.classList.add('active-ui');
    } else if (service === 'dev') {
        container.classList.add('active-dev');
    }
}
// Make it global
window.toggleService = toggleService;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Tab Switching for Projects
    const tabBtns = document.querySelectorAll('.tab-btn');
    const projectGrid = document.getElementById('project-grid');

    const projectsData = {
        mobile: [
            { title: 'Fintech App', category: 'Mobile App', imgGradient: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)' },
            { title: 'Travel Dashboard', category: 'Mobile App', imgGradient: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)' },
            { title: 'Health & Wellness', category: 'Mobile App', imgGradient: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)' },
            { title: 'E-Commerce Mobile', category: 'Mobile App', imgGradient: 'linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)' }
        ],
        web: [
            { title: 'Corporate Website', category: 'Web Design', imgGradient: 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)' },
            { title: 'Agency Portfolio', category: 'Web Design', imgGradient: 'linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)' },
            { title: 'SaaS Landing Page', category: 'Web Design', imgGradient: 'linear-gradient(to right, #fa709a 0%, #fee140 100%)' },
            { title: 'Dashboard UI', category: 'Web Design', imgGradient: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)' }
        ]
    };

    function renderProjects(category) {
        // Simple fade out
        projectGrid.style.opacity = '0';

        setTimeout(() => {
            projectGrid.innerHTML = '';
            const data = projectsData[category];

            data.forEach(project => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.innerHTML = `
                    <div class="project-image" style="background-image: ${project.imgGradient}"></div>
                    <div class="project-info">
                        <div>
                            <span style="font-size: 0.8rem; opacity: 0.6; text-transform: uppercase;">${project.category}</span>
                            <h4>${project.title}</h4>
                        </div>
                        <button class="project-arrow">
                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14m-7-7l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                `;
                projectGrid.appendChild(card);
            });

            // Fade in
            projectGrid.style.opacity = '1';
        }, 300);
    }

    // Initial Render
    renderProjects('mobile'); // Default

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class
            btn.classList.add('active');

            // Render
            const category = btn.getAttribute('data-tab');
            renderProjects(category);
        });
    });

    // 2. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 3. Simple Intersection Observer for Fade In Up Animation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const fadeElements = document.querySelectorAll('.hero-left, .hero-right, .code-card, .about-text-content, .project-card, .service-item');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Add a class for the visible state
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // 4. Services Accordion
    const serviceItems = document.querySelectorAll('.service-item');

    serviceItems.forEach(item => {
        item.addEventListener('click', () => {
            // Check if this item is already active
            const isActive = item.classList.contains('active');

            // Close all items
            serviceItems.forEach(i => i.classList.remove('active'));

            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 5. Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section, footer');
    const navLinks = document.querySelectorAll('.nav-center-pill a');

    const navObserverOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is in the middle of viewport
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get the id of the section
                const id = entry.target.getAttribute('id');

                if (id) {
                    // Remove active class from all links
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        // Add active class if href matches id
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });
    // 6. Number Counter Animation for About Section
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps

                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current) + (counter.parentElement.innerText.includes('%') ? '%' : '+');
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target + (counter.parentElement.innerText.includes('%') ? '%' : '+');
                    }
                };
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    // 7. FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Check if currently active
            const isActive = item.classList.contains('active');

            // Optional: Close others (accordian style) vs Toggle style
            // Let's close others for cleaner look
            faqItems.forEach(i => {
                i.classList.remove('active');
                const answer = i.querySelector('.faq-answer');
                answer.style.maxHeight = null;
                answer.style.marginTop = null;
                i.querySelector('.faq-toggle').innerText = '+';
                i.querySelector('.faq-toggle').style.transform = 'rotate(0deg)';
            });

            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + "px";
                answer.style.marginTop = "10px";
                item.querySelector('.faq-toggle').innerText = '+'; // Keep plus, rotate it or change content
                item.querySelector('.faq-toggle').style.transform = 'rotate(45deg)';
            }
        });
    });

    // 8. Code Card Typewriter Effect
    function startTypewriterEffect() {
        const codeContent = document.querySelector('.code-content');
        if (!codeContent || codeContent.classList.contains('typing-started')) return;

        codeContent.classList.add('typing-started');

        // Lock the height to prevent layout shifting
        codeContent.style.minHeight = codeContent.offsetHeight + 'px';

        // Traverse and collect all text nodes
        const textNodes = [];
        const walk = document.createTreeWalker(codeContent, NodeFilter.SHOW_TEXT, null, false);
        let n;
        while (n = walk.nextNode()) {
            textNodes.push({
                node: n,
                text: n.nodeValue,
                parent: n.parentNode
            });
            n.nodeValue = ''; // Clear text
        }

        let currentNodeIndex = 0;
        let currentCharIndex = 0;

        // Add cursor class to first parent
        if (textNodes.length > 0) {
            textNodes[0].parent.classList.add('typing-cursor');
        }

        function type() {
            if (currentNodeIndex >= textNodes.length) {
                // Remove cursor from last element when done
                if (textNodes.length > 0) {
                    textNodes[textNodes.length - 1].parent.classList.remove('typing-cursor');
                }
                return;
            }

            const current = textNodes[currentNodeIndex];

            // If current node text is fully typed
            if (currentCharIndex >= current.text.length) {
                // Remove cursor from current parent
                current.parent.classList.remove('typing-cursor');

                currentNodeIndex++;
                currentCharIndex = 0;

                // Add cursor to next parent if exists
                if (currentNodeIndex < textNodes.length) {
                    textNodes[currentNodeIndex].parent.classList.add('typing-cursor');
                }

                setTimeout(type, 20); // Small pause between nodes
            } else {
                current.node.nodeValue += current.text[currentCharIndex];
                currentCharIndex++;
                setTimeout(type, Math.random() * 30 + 10); // Random typing speed
            }
        }

        // Start typing after a short delay
        setTimeout(type, 500);
    }

    // Hook into existing observer or create new one for code card
    const codeCard = document.querySelector('.code-card');
    if (codeCard) {
        const typewriterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startTypewriterEffect();
                    typewriterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        typewriterObserver.observe(codeCard);
    }
});
