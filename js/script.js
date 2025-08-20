
document.addEventListener('DOMContentLoaded', function () {

    const header = document.querySelector('header');
    const backToTopBtn = document.getElementById('backToTop');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    const testimonialSlides = document.querySelectorAll('.testimonial');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const contactForm = document.getElementById('contactForm');
    let testimonialIndex = 0;
    let testimonialInterval;


    function handleScroll() {

        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }

        animateOnScroll();
    }

    function animateOnScroll() {
        const elements = document.querySelectorAll('.product-card, .service-card, .about-image');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    }


    function toggleMobileMenu() {
        mainNav.classList.toggle('active');


        const icon = mobileMenuBtn.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }

    function showTestimonial(index) {

        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });

        testimonialDots.forEach(dot => {
            dot.classList.remove('active');
        });

        testimonialSlides[index].classList.add('active');
        testimonialDots[index].classList.add('active');

        testimonialIndex = index;
    }


    function startTestimonialSlider() {
        testimonialInterval = setInterval(() => {
            testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length;
            showTestimonial(testimonialIndex);
        }, 5000);
    }


    function handleFormSubmit(e) {
        e.preventDefault();

        alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
        contactForm.reset();
    }

    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }

    function initAnimations() {
        const elements = document.querySelectorAll('.product-card, .service-card, .about-image');

        elements.forEach(element => {
            element.style.opacity = 0;
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });

        // Ejecutar una primera vez
        animateOnScroll();
    }

    // Configurar event listeners
    function setupEventListeners() {
        // Scroll event
        window.addEventListener('scroll', handleScroll);

        // Botón menú móvil
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);

        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                if (mainNav.classList.contains('active')) {
                    toggleMobileMenu();
                }

                // Navegación suave
                const target = this.getAttribute('href');
                if (target.startsWith('#')) {
                    smoothScroll(target);
                }
            });
        });

        // Botón volver arriba
        backToTopBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Testimonios dots
        testimonialDots.forEach(dot => {
            dot.addEventListener('click', function () {
                clearInterval(testimonialInterval);
                const index = parseInt(this.getAttribute('data-index'));
                showTestimonial(index);
                startTestimonialSlider();
            });
        });

        // Formulario de contacto
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Funciones para el filtrado de productos
    function setupProductFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const productCards = document.querySelectorAll('.product-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remover clase active de todos los botones
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Añadir clase active al botón clickeado
                button.classList.add('active');

                // Obtener el valor del filtro
                const filterValue = button.getAttribute('data-filter');

                // Filtrar productos
                productCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    if (filterValue === 'all' || filterValue === cardCategory) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Funciones para los botones de productos
    function setupProductButtons() {
        // Botón de vista rápida
        const quickViewButtons = document.querySelectorAll('.quick-view-btn');
        quickViewButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = button.getAttribute('data-product');
                openQuickView(productId);
            });
        });

        // Botón añadir al carrito
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = button.getAttribute('data-product');
                addToCart(productId);
            });
        });
    }

    // Función para vista rápida de producto
    function openQuickView(productId) {
        // En una implementación real, aquí cargarías los datos del producto
        console.log('Abriendo vista rápida del producto:', productId);

        // Crear modal de vista rápida
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal"><i class="fas fa-times"></i></button>
            <div class="quick-view-content">
                <h2>Vista Rápida - Producto ${productId}</h2>
                <p>Funcionalidad completa en implementación real</p>
            </div>
        </div>
    `;

        document.body.appendChild(modal);


        setTimeout(() => {
            modal.classList.add('active');
        }, 10);

        const closeButton = modal.querySelector('.close-modal');
        closeButton.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        });
    }

    function addToCart(productId) {

        const button = document.querySelector(`.add-to-cart-btn[data-product="${productId}"]`);
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.background = '#2ecc71';


        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-shopping-cart"></i>';
            button.style.background = '';
        }, 1500);


        console.log('Producto añadido al carrito:', productId);
    }


    function init() {
        setupEventListeners();
        initAnimations();
        startTestimonialSlider();
        handleScroll();
        setupProductFilter();
        setupProductButtons();

    }

    init();


});