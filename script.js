// ===== تأكد من تحميل DOM قبل تنفيذ الكود =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل الصفحة بنجاح - Skillzoy Academy');
    
    // ===== تأثير التمرير للهيدر =====
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // ===== القائمة المتنقلة للجوال =====
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu');
    const mobileNav = document.querySelector('.mobile-nav');

    // تحقق من وجود العناصر قبل إضافة event listeners
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.add('active');
        });
    }

    if (closeMenuBtn && mobileNav) {
        closeMenuBtn.addEventListener('click', function() {
            mobileNav.classList.remove('active');
        });
    }

    // إغلاق القائمة عند النقر على رابط
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    if (mobileNav && mobileNavLinks.length > 0) {
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
            });
        });
    }

    // ===== التمرير السلس للروابط =====
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    if (anchorLinks.length > 0) {
        anchorLinks.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // إغلاق القائمة المتنقلة إذا كانت مفتوحة
                    if (mobileNav) {
                        mobileNav.classList.remove('active');
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ===== وظيفة واتساب =====
    function openWhatsApp() {
        // يمكن تغيير رقم الهاتف هنا
        const phoneNumber = "966123456789";
        const message = `مرحباً، أنا مهتم بالدورات التدريبية المجانية على منصة Skillzoy Academy. أود الحصول على مزيد من المعلومات.`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        window.open(whatsappURL, '_blank');
    }

    // إضافة وظيفة واتساب لجميع الأزرار
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp');
    if (whatsappButtons.length > 0) {
        whatsappButtons.forEach(button => {
            button.addEventListener('click', openWhatsApp);
        });
    }

    // إضافة وظيفة واتساب لأزرار التواصل
    const contactWhatsappButtons = document.querySelectorAll('.contact-whatsapp');
    if (contactWhatsappButtons.length > 0) {
        contactWhatsappButtons.forEach(button => {
            button.addEventListener('click', openWhatsApp);
        });
    }

    // ===== إرسال النموذج =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('شكراً لتواصلكم معنا! سنرد على رسالتكم في أقرب وقت ممكن.');
            this.reset();
        });
    }

    // ===== تحسين تجربة الفيديوهات =====
    function optimizeVideos() {
        const videoIframes = document.querySelectorAll('iframe[src*="youtube"]');
        
        videoIframes.forEach(iframe => {
            // إضافة معلمات لتحسين أداء YouTube ومنع الأخطاء
            let src = iframe.src;
            
            // تأكد من أن الرابط يحتوي على المعلمات الصحيحة
            if (!src.includes('rel=0')) {
                src += (src.includes('?') ? '&' : '?') + 'rel=0';
            }
            if (!src.includes('modestbranding=1')) {
                src += '&modestbranding=1';
            }
            if (!src.includes('autoplay=0')) {
                src += '&autoplay=0';
            }
            
            iframe.src = src;
        });
        
        console.log('تم تحسين إعدادات الفيديوهات لـ ' + videoIframes.length + ' فيديو');
    }

    // تحسين الفيديوهات بعد تحميل الصفحة
    optimizeVideos();

    // ===== إضافة تأثيرات تفاعلية للبطاقات =====
    const courseCards = document.querySelectorAll('.course-card');
    if (courseCards.length > 0) {
        courseCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // ===== إضافة تأثيرات للصفحة =====
    window.addEventListener('load', function() {
        // إضافة تأثيرات ظهور للعناصر
        const animatedElements = document.querySelectorAll('.hero-text, .course-card, .process-step');
        
        if (animatedElements.length > 0) {
            animatedElements.forEach((element, index) => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }
        
        console.log(' لقد تم تسجيل الدخول بنجاح لا تنسى الذهاب الى اعلى google Crome في اقصى اليمين ثلالث نقاط واعمل add to home Screen اضف الى الشاشة الرئيسية ليسهل لك الوصول السريع الى المنصة');
    });

    // ===== معالجة أخطاء الفيديو =====
    function handleVideoErrors() {
        const videoIframes = document.querySelectorAll('iframe[src*="youtube"]');
        
        videoIframes.forEach(iframe => {
            iframe.addEventListener('error', function() {
                console.log('خطأ في تحميل الفيديو: ' + this.src);
                // استبدل الفيديو المعطوب بفيديو بديل
                this.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1';
            });
        });
    }
    
    handleVideoErrors();
});

// ===== وظائف إضافية للتحكم في الفيديوهات =====
function pauseAllVideos() {
    const videos = document.querySelectorAll('iframe');
    videos.forEach(video => {
        video.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    });
}

// إيقاف جميع الفيديوهات عند التمرير لتحسين الأداء
window.addEventListener('scroll', function() {
    pauseAllVideos();
});
