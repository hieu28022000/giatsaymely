document.addEventListener("DOMContentLoaded", function () {
    let header = document.getElementById("main-header"); // Lấy phần header
    let slides = document.querySelectorAll(".slide"); // Lấy tất cả các slide
    let dotsContainer = document.querySelector(".dots"); // Vùng chứa chấm điều hướng slider
    let testimonials = document.querySelectorAll(".testimonial"); // Lấy tất cả testimonial
    let dotsTestimonial = document.querySelector(".dots-container"); // Dots cho testimonial
    let currentIndex = 0; // Chỉ số slide hiện tại
    let currentTestimonialIndex = 0; // Chỉ số testimonial hiện tại

    /* ======================== Thay đổi màu nền Header khi cuộn xuống ======================== */
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            header.classList.add("header-solid");
            header.classList.add("solid");
        } else {
            header.classList.remove("header-solid");
            header.classList.remove("solid");
        }
    });

    /* ======================== Khởi tạo Dots điều hướng slider ======================== */
    slides.forEach((_, index) => {
        let dot = document.createElement("div");
        dot.addEventListener("click", () => showSlide(index));
        dotsContainer.appendChild(dot);
    });

    let dots = document.querySelectorAll(".dots div");
    dots[currentIndex].classList.add("active");

    /* ======================== Hiển thị Slide theo chỉ số ======================== */
    function showSlide(index) {
        slides[currentIndex].classList.remove("active");
        dots[currentIndex].classList.remove("active");

        slides[index].classList.add("active");
        dots[index].classList.add("active");

        currentIndex = index;
    }

    /* ======================== Chuyển Slide tự động ======================== */
    function nextSlide() {
        let nextIndex = (currentIndex + 1) % slides.length;
        showSlide(nextIndex);
    }

    setInterval(nextSlide, 3000); // Chuyển ảnh mỗi 3 giây

    /* ======================== Cuộn xuống Footer khi bấm "Liên hệ" ======================== */
    window.scrollToFooter = function () {
        document.getElementById("main-footer").scrollIntoView({ behavior: "smooth" });
    };

    /* ======================== Khởi tạo Dots cho Testimonials ======================== */
    testimonials.forEach((_, index) => {
        let dot = document.createElement("div");
        dot.addEventListener("click", () => showTestimonial(index));
        dotsTestimonial.appendChild(dot);
    });

    let testimonialDots = document.querySelectorAll(".dots-container div");

    testimonials[currentTestimonialIndex].classList.add("active");
    testimonialDots[currentTestimonialIndex].classList.add("active");


    /* ======================== Hiển thị Testimonial theo chỉ số ======================== */
    function showTestimonial(index) {
        testimonials[currentTestimonialIndex].classList.remove("active");
        testimonialDots[currentTestimonialIndex].classList.remove("active");

        testimonials[index].classList.add("active");
        testimonialDots[index].classList.add("active");

        currentTestimonialIndex = index;
    }

    /* ======================== Điều hướng Testimonials ======================== */
    document.querySelector(".prev-btn").addEventListener("click", function () {
        let newIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(newIndex);
    });

    document.querySelector(".next-btn").addEventListener("click", function () {
        let newIndex = (currentTestimonialIndex + 1) % testimonials.length;
        showTestimonial(newIndex);
    });

    setInterval(() => {
        let nextIndex = (currentTestimonialIndex + 1) % testimonials.length;
        showTestimonial(nextIndex);
    }, 5000); // Chuyển testimonial mỗi 5 giây

    let fadeElements = document.querySelectorAll(".fade-in");

    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show"); // Hiện phần tử khi cuộn đến
                observer.unobserve(entry.target); // Dừng quan sát sau khi đã hiển thị
            }
        });
    }, { threshold: 0.2 }); // Kích hoạt khi 20% phần tử xuất hiện trên màn hình

    fadeElements.forEach(el => observer.observe(el));
});
