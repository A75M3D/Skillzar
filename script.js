// نظام الإشعارات
function showNotification(title, message, type = 'success') {
    const notificationContainer = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = type === 'success' ? 'fas fa-check-circle' : 
                 type === 'error' ? 'fas fa-exclamation-circle' : 
                 'fas fa-info-circle';
    
    // استخدام innerHTML مع تدابير أمنية أساسية
    const safeTitle = title.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const safeMessage = message.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="${icon}"></i>
        </div>
        <div class="notification-content">
            <div class="notification-title">${safeTitle}</div>
            <div class="notification-message">${safeMessage}</div>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    notificationContainer.appendChild(notification);
    
    // إظهار الإشعار
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // إغلاق الإشعار عند النقر على الزر
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 400);
    });
    
    // إزالة الإشعار تلقائياً بعد 5 ثوانٍ
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 400);
        }
    }, 5000);
}

// الحصول على اسم التصنيف
function getCategoryName(category) {
    const categories = {
        'programming': 'برمجة',
        'design': 'تصميم',
        'business': 'أعمال',
        'language': 'لغات'
    };
    return categories[category] || category;
}

// عرض الدورات في الصفحة الرئيسية
async function renderCourses(category = 'all') {
    const container = document.getElementById('courses-container');
    if (!container) return;
    
    const filteredCourses = category === 'all' 
        ? coursesData 
        : coursesData.filter(course => course.category === category);
    
    const currentUser = getCurrentUser();
    const userEnrolledCourses = await getUserEnrolledCourses(currentUser.id);
    
    // استخدام innerHTML مع تدابير أمنية
    let coursesHTML = '';
    filteredCourses.forEach(course => {
        const isEnrolled = userEnrolledCourses.includes(course.id);
        
        // تنظيف البيانات قبل العرض
        const safeTitle = course.title.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const safeInstructor = course.instructor.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        
        coursesHTML += `
        <div class="course-card" data-course-id="${course.id}">
            <div class="course-video-container">
                <div class="video-wrapper">
                    <iframe src="https://www.youtube.com/embed/${course.youtubeId}?rel=0&modestbranding=1" 
                            title="${safeTitle}"
                            allowfullscreen>
                    </iframe>
                </div>
            </div>
            <div class="course-content">
                <span class="course-category">${getCategoryName(course.category)}</span>
                <h3 class="course-title">${safeTitle}</h3>
                <div class="course-instructor">
                    <img src="${course.instructorAvatar}" alt="${safeInstructor}" class="instructor-avatar">
                    <span class="instructor-name">${safeInstructor}</span>
                </div>
                <div class="course-meta">
                    <span><i class="far fa-clock"></i> ${course.duration}</span>
                    <span><i class="fas fa-signal"></i> ${course.level}</span>
                </div>
                <div class="course-actions">
                    ${isEnrolled ? 
                        `<button class="btn btn-success view-course-details" data-course-id="${course.id}">
                            <i class="fas fa-play"></i> عرض الدورة
                        </button>` :
                        `<button class="btn btn-primary enroll-course" data-course-id="${course.id}">
                            <i class="fas fa-user-plus"></i> التسجيل في الدورة
                        </button>`
                    }
                    <button class="btn btn-outline watch-trailer" data-youtube-id="${course.youtubeId}">
                        <i class="fas fa-eye"></i> مشاهدة المقدمة
                    </button>
                </div>
            </div>
        </div>
        `;
    });
    
    container.innerHTML = coursesHTML;
    setupCourseEventListeners();
}

// عرض الدورات المسجلة في صفحة "دوراتي"
async function renderMyCourses() {
    const container = document.getElementById('my-courses-container');
    const emptyState = document.getElementById('empty-my-courses');
    if (!container || !emptyState) return;
    
    const currentUser = getCurrentUser();
    const userEnrolledCourses = await getUserEnrolledCourses(currentUser.id);
    
    const enrolledCourses = coursesData.filter(course => 
        userEnrolledCourses.includes(course.id)
    );
    
    if (enrolledCourses.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    // استخدام innerHTML مع تدابير أمنية
    let coursesHTML = '';
    enrolledCourses.forEach(course => {
        // تنظيف البيانات قبل العرض
        const safeTitle = course.title.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const safeInstructor = course.instructor.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        
        coursesHTML += `
        <div class="course-card" data-course-id="${course.id}">
            <div class="course-video-container">
                <div class="video-wrapper">
                    <iframe src="https://www.youtube.com/embed/${course.youtubeId}?rel=0&modestbranding=1" 
                            title="${safeTitle}"
                            allowfullscreen>
                    </iframe>
                </div>
            </div>
            <div class="course-content">
                <span class="course-category">${getCategoryName(course.category)}</span>
                <h3 class="course-title">${safeTitle}</h3>
                <div class="course-instructor">
                    <img src="${course.instructorAvatar}" alt="${safeInstructor}" class="instructor-avatar">
                    <span class="instructor-name">${safeInstructor}</span>
                </div>
                <div class="course-meta">
                    <span><i class="far fa-clock"></i> ${course.duration}</span>
                    <span><i class="fas fa-signal"></i> ${course.level}</span>
                </div>
                <div class="course-actions">
                    <button class="btn btn-success view-course-details" data-course-id="${course.id}">
                        <i class="fas fa-play"></i> عرض الدورة
                    </button>
                    <button class="btn btn-outline watch-trailer" data-youtube-id="${course.youtubeId}">
                        <i class="fas fa-eye"></i> مشاهدة المقدمة
                    </button>
                </div>
            </div>
        </div>
        `;
    });
    
    container.innerHTML = coursesHTML;
    setupCourseEventListeners();
}

// فتح مشغل الفيديو المدمج
function openVideoPlayer(youtubeId, videoTitle) {
    const videoPlayer = document.getElementById('video-player');
    const videoFrame = document.getElementById('video-frame');
    
    videoFrame.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`;
    videoPlayer.style.display = 'flex';
    
    // منع التمرير عند فتح الفيديو
    document.body.style.overflow = 'hidden';
}

// إغلاق مشغل الفيديو المدمج
function closeVideoPlayer() {
    const videoPlayer = document.getElementById('video-player');
    const videoFrame = document.getElementById('video-frame');
    
    videoPlayer.style.display = 'none';
    videoFrame.src = '';
    
    // إعادة التمرير
    document.body.style.overflow = 'auto';
}

// إعداد مستمعي الأحداث
function setupCourseEventListeners() {
    // أزرار التسجيل في الدورة
    document.querySelectorAll('.enroll-course').forEach(button => {
        button.addEventListener('click', async (e) => {
            const courseId = parseInt(e.target.getAttribute('data-course-id'));
            const currentUser = getCurrentUser();
            
            const success = await enrollUserInCourse(currentUser.id, courseId);
            if (success) {
                showNotification('تم التسجيل بنجاح', 'تم تسجيلك في الدورة بنجاح! يمكنك الآن الوصول إلى محتوى الدورة من صفحة "دوراتي".', 'success');
                renderCourses(); // إعادة عرض الدورات لتحديث حالة التسجيل
            } else {
                showNotification('خطأ', 'حدث خطأ أثناء التسجيل في الدورة. يرجى المحاولة مرة أخرى.', 'error');
            }
        });
    });

    // أزرار مشاهدة المقدمة
    document.querySelectorAll('.watch-trailer').forEach(button => {
        button.addEventListener('click', (e) => {
            const youtubeId = e.target.getAttribute('data-youtube-id');
            openVideoPlayer(youtubeId, 'مقدمة الدورة');
        });
    });
}

// إعداد فلاتر التصنيفات
function setupCategoryFilters() {
    document.querySelectorAll('.category-filter').forEach(filter => {
        filter.addEventListener('click', (e) => {
            // إزالة النشط من جميع الفلاتر
            document.querySelectorAll('.category-filter').forEach(f => {
                f.classList.remove('active');
            });
            
            // إضافة النشط للفلتر المحدد
            e.target.classList.add('active');
            
            // تصفية الدورات حسب التصنيف
            const category = e.target.getAttribute('data-category');
            renderCourses(category);
        });
    });
}

// إعداد الإحصائيات المتحركة
function setupStatsAnimation() {
    const studentsCount = document.getElementById('students-count');
    const coursesCount = document.getElementById('courses-count');
    const certificatesCount = document.getElementById('certificates-count');
    const instructorsCount = document.getElementById('instructors-count');
    
    if (!studentsCount) return;
    
    const targetStudents = 12500;
    const targetCourses = coursesData.length;
    const targetCertificates = 8500;
    const targetInstructors = 24;
    
    let currentStudents = 0;
    let currentCourses = 0;
    let currentCertificates = 0;
    let currentInstructors = 0;
    
    const duration = 2000; // مدة الحركة بالميلي ثانية
    const interval = 20; // الفترة بين التحديثات
    const steps = duration / interval;
    
    const studentsStep = targetStudents / steps;
    const coursesStep = targetCourses / steps;
    const certificatesStep = targetCertificates / steps;
    const instructorsStep = targetInstructors / steps;
    
    const timer = setInterval(() => {
        currentStudents += studentsStep;
        currentCourses += coursesStep;
        currentCertificates += certificatesStep;
        currentInstructors += instructorsStep;
        
        if (currentStudents >= targetStudents) {
            currentStudents = targetStudents;
            currentCourses = targetCourses;
            currentCertificates = targetCertificates;
            currentInstructors = targetInstructors;
            clearInterval(timer);
        }
        
        studentsCount.textContent = Math.floor(currentStudents).toLocaleString();
        coursesCount.textContent = Math.floor(currentCourses);
        certificatesCount.textContent = Math.floor(currentCertificates).toLocaleString();
        instructorsCount.textContent = Math.floor(currentInstructors);
    }, interval);
}

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', async () => {
    // تحميل البيانات بناءً على الصفحة الحالية
    if (document.getElementById('courses-container')) {
        // الصفحة الرئيسية
        await renderCourses();
        setupCategoryFilters();
        setupStatsAnimation();
    } else if (document.getElementById('my-courses-container')) {
        // صفحة دوراتي
        await renderMyCourses();
    }
    
    // زر القائمة المتنقلة
    document.querySelector('.mobile-menu-btn').addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('active');
    });
    
    // زر إغلاق الفيديو
    const closeVideoBtn = document.getElementById('close-video');
    if (closeVideoBtn) {
        closeVideoBtn.addEventListener('click', closeVideoPlayer);
    }
    
    // إغلاق الفيديو عند النقر خارج الصندوق
    const videoPlayer = document.getElementById('video-player');
    if (videoPlayer) {
        videoPlayer.addEventListener('click', (e) => {
            if (e.target.id === 'video-player') {
                closeVideoPlayer();
            }
        });
    }

    // إغلاق الشريط الجانبي عند النقر خارجها في الشاشات الصغيرة
    document.addEventListener('click', (e) => {
        const sidebar = document.querySelector('.sidebar');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (window.innerWidth <= 992 && 
            sidebar && 
            mobileMenuBtn &&
            !sidebar.contains(e.target) && 
            !mobileMenuBtn.contains(e.target) && 
            sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });
});
