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

const projectsData = [
    {
        title: "SmartBudget –<br><strong>Expense Management App</strong>",
        desc: "A smart expense management application designed to help users track spending, manage budgets, and gain better financial control through a clean and intuitive user experience.",
        img: "./assets/mockups/project1.png",
        tags: ["Mobile App", "UI/UX Design"],
        link: "#work",
        role: "UI/UX Designer",
        tools: "Figma / React"
    },
    {
        title: "Golden Ocean –<br><strong>Investment & Trade Platform</strong>",
        desc: "Designed a professional investment and trading platform with a focus on clarity, trust, and usability, enabling users to explore services and manage financial activities with ease.",
        img: "./assets/mockups/project2.png",
        tags: ["Web Platform", "Investment & Trade"],
        link: "#work",
        role: "UI/UX Designer",
        tools: "Figma / React"
    },
    {
        title: "FoodChoice –<br><strong>Food Ordering App</strong>",
        desc: "A modern food ordering application crafted to provide a fast, seamless, and enjoyable user experience, making it easy for users to browse, select, and order their favorite meals.",
        img: "./assets/mockups/project3.png",
        tags: ["Mobile App", "Food Ordering"],
        link: "#work",
        role: "UI/UX Designer",
        tools: "Figma / React"
    }
];

function renderProjects() {
    const desktopImagesContainer = document.getElementById('desktopImageWrap');
    const desktopDetailsContainer = document.getElementById('desktopTextsWrap');
    const mobileSnapContainer = document.getElementById('mobileWorkSnap');
    const mobileProgressContainer = document.getElementById('mobileWorkProgress');

    if (desktopImagesContainer && desktopDetailsContainer && mobileSnapContainer && mobileProgressContainer) {
        let imagesHtml = '';
        let detailsHtml = '';
        let mCardsHtml = '';
        let mDotsHtml = '';

        projectsData.forEach((project, index) => {
            const imgClass = index === 0 ? 'project-img active' : 'project-img';
            imagesHtml += `<img src="${project.img}" alt="Project ${index+1}" class="${imgClass}" data-index="${index}">`;

            const num = (index + 1).toString().padStart(2, '0');
            const tagsHtml = project.tags.map(tag => `<span class="work-tag">${tag}</span>`).join('');
            
            let optionalInfoHtml = '';
            if (project.role && project.tools) {
                optionalInfoHtml = `
                <div class="work-info" style="margin-top: 20px; font-size: 0.95rem; color: #4b5563;">
                    <div style="margin-bottom: 4px;"><strong>Role:</strong> ${project.role}</div>
                    <div><strong>Tools:</strong> ${project.tools}</div>
                </div>`;
            }

            detailsHtml += `
                <div class="project-details" data-index="${index}">
                    <div class="work-card-header">
                        <span class="work-number">${num}</span>
                        <div class="work-tags">
                            ${tagsHtml}
                        </div>
                    </div>
                    <div class="work-card-body">
                        <h3 class="work-title-new">${project.title}</h3>
                        <p class="work-desc">${project.desc}</p>
                        ${optionalInfoHtml}
                    </div>
                    <div class="work-card-footer">
                        <a href="${project.link}" class="view-project-btn" target="_blank" rel="noopener noreferrer" aria-label="View Project">View Project <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>
                    </div>
                </div>
            `;

            const mTagsHtml = project.tags.map(tag => `<span class="m-tag">${tag}</span>`).join('');
            
            let mOptionalInfoHtml = '';
            if (project.role && project.tools) {
                mOptionalInfoHtml = `
                <div class="m-work-info" style="margin-bottom: 24px; font-size: 0.9rem; color: #6b7280; font-family: var(--font-body);">
                    <div style="margin-bottom: 4px;"><strong>Role:</strong> ${project.role}</div>
                    <div><strong>Tools:</strong> ${project.tools}</div>
                </div>`;
            }

            mCardsHtml += `
                <div class="m-work-card">
                    <div class="m-project-img">
                        <img src="${project.img}" loading="lazy" alt="Project ${index+1}">
                        <div class="m-img-overlay"></div>
                    </div>
                    <div class="m-project-content">
                        <div class="m-tags">
                            ${mTagsHtml}
                        </div>
                        <h3 class="m-title">${project.title}</h3>
                        <p class="m-desc" style="${mOptionalInfoHtml ? 'margin-bottom: 12px;' : ''}">${project.desc}</p>
                        ${mOptionalInfoHtml}
                        <a href="${project.link}" class="m-view-btn" target="_blank" rel="noopener noreferrer" aria-label="View Project">View Project <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>
                    </div>
                </div>
            `;

            const dotClass = index === 0 ? 'm-dot active' : 'm-dot';
            mDotsHtml += `<div class="${dotClass}"></div>`;
        });

        imagesHtml += '<div class="img-overlay"></div>';
        
        desktopImagesContainer.innerHTML = imagesHtml;
        desktopDetailsContainer.innerHTML = detailsHtml;
        mobileSnapContainer.innerHTML = mCardsHtml;
        mobileProgressContainer.innerHTML = mDotsHtml;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 0. Mobile Hamburger Menu
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.m-link');

    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburgerBtn.classList.toggle('active');
            mobileMenu.classList.toggle('open');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                mobileMenu.classList.remove('open');
            });
        });

        // Close on clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('open') && !mobileMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                hamburgerBtn.classList.remove('active');
                mobileMenu.classList.remove('open');
            }
        });
    }

    renderProjects();

    // 1. GSAP ScrollTrigger for Projects Section
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        const projectDetails = gsap.utils.toArray('.project-details');
        const projectImages = gsap.utils.toArray('.project-img');

        if (projectDetails.length > 0 && projectImages.length > 0) {
            projectDetails.forEach((detail, i) => {
                ScrollTrigger.create({
                    trigger: detail,
                    start: "top 60%", // triggers when the top of detail hits 60% of viewport
                    end: "bottom 60%",
                    onEnter: () => setActiveProject(i),
                    onEnterBack: () => setActiveProject(i)
                });
            });

            function setActiveProject(index) {
                // Update content focus
                projectDetails.forEach((el, i) => {
                    if (i === index) el.classList.add('active');
                    else el.classList.remove('active');
                });

                // Update sticky images crossfade
                projectImages.forEach((img, i) => {
                    if (i === index) img.classList.add('active');
                    else img.classList.remove('active');
                });
            }
            
            // Initialization
            setActiveProject(0);
        }
    }

    // 1b. Mobile Work Carousel Dots Sync
    const mobileSnapContainer = document.getElementById('mobileWorkSnap');
    const mobileDots = document.querySelectorAll('.m-dot');
    
    if (mobileSnapContainer && mobileDots.length > 0) {
        mobileSnapContainer.addEventListener('scroll', () => {
            const scrollLeft = mobileSnapContainer.scrollLeft;
            const cardWidth = mobileSnapContainer.offsetWidth; // Approximately the width of one card + gap
            const activeIndex = Math.round(scrollLeft / cardWidth);
            
            mobileDots.forEach((dot, index) => {
                if (index === activeIndex) dot.classList.add('active');
                else dot.classList.remove('active');
            });
        });
    }

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
    const fadeElements = document.querySelectorAll('.hero-left, .code-card, .about-text-content, .services-split-container, .m-svc-card, .work-header, .pinned-card, .m-work-card, .faq-left-card, .faq-accordion, .footer-card');
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
    const navLinks = document.querySelectorAll('.nav-center-pill a, .m-link');

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

    // 9. Contact Modal Flow
    const openContactModalBtn = document.getElementById('openContactModal');
    const contactModal = document.getElementById('contactModal');
    const closeContactModalBtn = document.getElementById('closeContactModal');
    const userNameInput = document.getElementById('userName');
    const userMessageInput = document.getElementById('userMessage');
    const sendWhatsappBtn = document.getElementById('sendWhatsappBtn');

    if (openContactModalBtn && contactModal && closeContactModalBtn) {
        // Open Modal
        openContactModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            contactModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent bg scrolling
        });

        // Close Modal
        const closeModal = () => {
            contactModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        closeContactModalBtn.addEventListener('click', closeModal);

        // Close on clicking outside the card
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                closeModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && contactModal.classList.contains('active')) {
                closeModal();
            }
        });

        // Enable/Disable send button based on message input
        const validateInput = () => {
            if (userMessageInput.value.trim().length > 0) {
                sendWhatsappBtn.removeAttribute('disabled');
            } else {
                sendWhatsappBtn.setAttribute('disabled', 'true');
            }
        };

        userMessageInput.addEventListener('input', validateInput);

        // Send via WhatsApp
        sendWhatsappBtn.addEventListener('click', () => {
            const name = userNameInput.value.trim() || 'a visitor';
            const message = userMessageInput.value.trim();
            if (!message) return;

            const text = `Hi, I'm ${name}. ${message}`;
            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://wa.me/9744342857?text=${encodedText}`;

            window.open(whatsappUrl, '_blank');
            closeModal();
            
            // Clear form
            userNameInput.value = '';
            userMessageInput.value = '';
            validateInput();
        });
    }
});
