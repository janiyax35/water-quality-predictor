document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS Animation Library
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
    });
    
    // Initialize Particles.js for background animation
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active menu item highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Water Quality Prediction Form Submission
    const waterForm = document.getElementById('water-form');
    const resultContainer = document.getElementById('result-container');
    
    if (waterForm) {
        waterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            resultContainer.style.display = 'block';
            document.getElementById('result-status').textContent = 'Analyzing water parameters...';
            document.getElementById('result-message').textContent = 'Please wait while we process your results.';
            document.getElementById('recommendations-list').innerHTML = '';
            document.getElementById('gauge-fill').style.height = '0%';
            document.getElementById('result-probability').textContent = '0%';
            
            // Collect form data
            const formData = new FormData(waterForm);
            
            // Send AJAX request
            $.ajax({
                type: 'POST',
                url: '/predict',
                data: formData,
                contentType: false,
                processData: false,
                success: function(response) {
                    // Simulate processing delay for better UX
                    setTimeout(() => {
                        displayResults(response);
                    }, 1500);
                },
                error: function(error) {
                    console.log(error);
                    resultContainer.style.display = 'block';
                    document.getElementById('result-status').textContent = 'Error';
                    document.getElementById('result-status').className = 'text-danger';
                    document.getElementById('result-message').textContent = 'An error occurred during prediction. Please check your input values and try again.';
                }
            });
        });
    }

    // Display prediction results with animation
    function displayResults(response) {
        const gaugeFill = document.getElementById('gauge-fill');
        const probability = document.getElementById('result-probability');
        const resultStatus = document.getElementById('result-status');
        const resultMessage = document.getElementById('result-message');
        const recommendationsList = document.getElementById('recommendations-list');
        
        // Update gauge fill with animation
        const fillHeight = response.probability + '%';
        gaugeFill.style.height = fillHeight;
        probability.textContent = response.probability + '%';
        
        // Update result message
        resultMessage.textContent = response.message;
        
        // Update status based on potability
        if (response.potability === 1) {
            resultStatus.textContent = 'Water is Safe for Consumption';
            resultStatus.className = 'safe';
            
            // Add recommendations for safe water
            recommendationsList.innerHTML = `
                <li><i class="fas fa-check-circle text-success me-2"></i> Safe to drink based on analyzed parameters.</li>
                <li><i class="fas fa-info-circle text-primary me-2"></i> Consider regular testing to maintain water quality.</li>
                <li><i class="fas fa-flask text-primary me-2"></i> Store properly in clean containers.</li>
            `;
        } else {
            resultStatus.textContent = 'Water is NOT Safe for Consumption';
            resultStatus.className = 'unsafe';
            
            // Add recommendations for unsafe water based on parameters
            recommendationsList.innerHTML = `
                <li><i class="fas fa-times-circle text-danger me-2"></i> Do not consume without treatment.</li>
                <li><i class="fas fa-filter text-warning me-2"></i> Consider water filtration or purification methods.</li>
                <li><i class="fas fa-vial text-warning me-2"></i> Further detailed testing recommended.</li>
            `;
            
            // Add specific recommendations based on parameters
            // We'll check the values submitted in the form
            const ph = parseFloat(document.getElementById('ph').value);
            const turbidity = parseFloat(document.getElementById('Turbidity').value);
            const solids = parseFloat(document.getElementById('Solids').value);
            
            if (ph < 6.5 || ph > 8.5) {
                recommendationsList.innerHTML += `
                    <li><i class="fas fa-exclamation-triangle text-warning me-2"></i> pH level (${ph}) is outside the ideal range of 6.5-8.5.</li>
                `;
            }
            
            if (turbidity > 5) {
                recommendationsList.innerHTML += `
                    <li><i class="fas fa-exclamation-triangle text-warning me-2"></i> High turbidity detected (${turbidity} NTU).</li>
                `;
            }
            
            if (solids > 500) {
                recommendationsList.innerHTML += `
                    <li><i class="fas fa-exclamation-triangle text-warning me-2"></i> High dissolved solids level (${solids} ppm).</li>
                `;
            }
        }
        
        // Scroll to result
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});