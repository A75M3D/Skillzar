// ===== إعداد Supabase الحقيقي =====
const SUPABASE_URL = 'https://your-project.supabase.co'; // استبدل بـ URL مشروعك
const SUPABASE_ANON_KEY = 'your-anon-key'; // استبدل بـ Anon Key مشروعك

// إنشاء عميل Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ===== بيانات الدورات (يمكن تخزينها في Supabase أيضاً) =====
const coursesData = [
    // ... (نفس بيانات الدورات السابقة)
];

// ===== إدارة المستخدم =====
let currentUser = {
    id: null,
    name: "نشط الان",
    avatar: "https://ui-avatars.com/api/?name=نشط+الان&background=3b82f6&color=fff"
};

// ===== وظائف Supabase =====

// تسجيل الدخول بالمستخدم
async function loginUser(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
        
        if (error) throw error;
        
        currentUser.id = data.user.id;
        currentUser.email = data.user.email;
        
        showNotification('تم تسجيل الدخول', 'مرحباً بعودتك!', 'success');
        return { success: true, user: data.user };
    } catch (error) {
        console.error('Login error:', error);
        showNotification('خطأ في تسجيل الدخول', error.message, 'error');
        return { success: false, error: error.message };
    }
}

// تسجيل مستخدم جديد
async function signUpUser(email, password, name) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: name
                }
            }
        });
        
        if (error) throw error;
        
        showNotification('تم إنشاء الحساب', 'يرجى تفعيل حسابك عبر البريد الإلكتروني', 'success');
        return { success: true, user: data.user };
    } catch (error) {
        console.error('Signup error:', error);
        showNotification('خطأ في إنشاء الحساب', error.message, 'error');
        return { success: false, error: error.message };
    }
}

// التحقق من حالة المستخدم
async function checkAuthStatus() {
    try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (data.session) {
            currentUser.id = data.session.user.id;
            currentUser.email = data.session.user.email;
            currentUser.name = data.session.user.user_metadata?.name || 'نشط الان';
            return true;
        }
        return false;
    } catch (error) {
        console.error('Auth check error:', error);
        return false;
    }
}

// تسجيل الخروج
async function logoutUser() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        
        currentUser.id = null;
        showNotification('تم تسجيل الخروج', 'نراك قريباً!', 'success');
        return true;
    } catch (error) {
        console.error('Logout error:', error);
        showNotification('خطأ في تسجيل الخروج', error.message, 'error');
        return false;
    }
}

// ===== وظائف الدورات في Supabase =====

// الحصول على الدورات المسجلة للمستخدم
async function getUserEnrolledCourses(userId) {
    try {
        const { data, error } = await supabase
            .from('user_courses')
            .select('course_id')
            .eq('user_id', userId);
        
        if (error) throw error;
        
        return data.map(item => item.course_id);
    } catch (error) {
        console.error('Error fetching user courses:', error);
        showNotification('خطأ في تحميل الدورات', 'تعذر تحميل الدورات المسجلة', 'error');
        return [];
    }
}

// تسجيل المستخدم في دورة
async function enrollUserInCourse(userId, courseId) {
    try {
        // التحقق أولاً من عدم التسجيل المسبق
        const { data: existing, error: checkError } = await supabase
            .from('user_courses')
            .select('id')
            .eq('user_id', userId)
            .eq('course_id', courseId)
            .single();
        
        if (checkError && checkError.code !== 'PGRST116') {
            throw checkError;
        }
        
        if (existing) {
            showNotification('معلومات', 'أنت مسجل مسبقاً في هذه الدورة.', 'warning');
            return false;
        }
        
        // إضافة التسجيل الجديد
        const { data, error } = await supabase
            .from('user_courses')
            .insert([
                { 
                    user_id: userId, 
                    course_id: courseId, 
                    enrolled_at: new Date().toISOString(),
                    progress: 0
                }
            ])
            .select();
        
        if (error) throw error;
        
        showNotification('تم التسجيل بنجاح', 'تم تسجيلك في الدورة بنجاح! يمكنك الآن الوصول إلى محتوى الدورة من صفحة "دوراتي".', 'success');
        return true;
    } catch (error) {
        console.error('Error enrolling user in course:', error);
        showNotification('خطأ في التسجيل', 'تعذر التسجيل في الدورة، يرجى المحاولة مرة أخرى', 'error');
        return false;
    }
}

// تحديث تقدم المستخدم في الدورة
async function updateUserProgress(userId, courseId, progress) {
    try {
        const { data, error } = await supabase
            .from('user_courses')
            .update({ 
                progress: progress,
                last_accessed: new Date().toISOString()
            })
            .eq('user_id', userId)
            .eq('course_id', courseId);
        
        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Error updating progress:', error);
        return false;
    }
}

// الحصول على تقدم المستخدم في الدورة
async function getUserProgress(userId, courseId) {
    try {
        const { data, error } = await supabase
            .from('user_courses')
            .select('progress')
            .eq('user_id', userId)
            .eq('course_id', courseId)
            .single();
        
        if (error) throw error;
        return data?.progress || 0;
    } catch (error) {
        console.error('Error fetching progress:', error);
        return 0;
    }
}

// الحصول على إحصائيات المستخدم
async function getUserStats(userId) {
    try {
        const { data, error } = await supabase
            .from('user_courses')
            .select('course_id, progress, enrolled_at')
            .eq('user_id', userId);
        
        if (error) throw error;
        
        const totalCourses = data.length;
        const completedCourses = data.filter(course => course.progress === 100).length;
        const inProgressCourses = data.filter(course => course.progress > 0 && course.progress < 100).length;
        
        return {
            totalCourses,
            completedCourses,
            inProgressCourses,
            enrollmentDate: data.length > 0 ? new Date(data[0].enrolled_at) : new Date()
        };
    } catch (error) {
        console.error('Error fetching user stats:', error);
        return {
            totalCourses: 0,
            completedCourses: 0,
            inProgressCourses: 0,
            enrollmentDate: new Date()
        };
    }
}

// ===== تهيئة التطبيق مع Supabase =====
async function initializeApp() {
    // التحقق من حالة المصادقة
    const isAuthenticated = await checkAuthStatus();
    
    if (isAuthenticated) {
        console.log('✅ User is authenticated:', currentUser);
        showNotification('مرحباً بعودتك!', `أهلاً ${currentUser.name}`, 'success');
    } else {
        console.log('⚠️ User not authenticated, showing login');
        showLoginModal();
    }
    
    // تحميل البيانات
    renderCourses();
    setupCategoryFilters();
    setupStatsAnimation();
}

// ===== نافذة تسجيل الدخول =====
function showLoginModal() {
    const loginHTML = `
        <div class="modal-overlay" id="login-modal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 3000;
        ">
            <div class="modal-content" style="
                background: var(--card-bg);
                padding: 40px;
                border-radius: var(--border-radius);
                width: 90%;
                max-width: 400px;
                text-align: center;
            ">
                <h2 style="margin-bottom: 20px; color: var(--accent);">تسجيل الدخول</h2>
                <input type="email" id="login-email" placeholder="البريد الإلكتروني" style="
                    width: 100%;
                    padding: 12px;
                    margin: 10px 0;
                    border: 1px solid var(--glass-border);
                    border-radius: 8px;
                    background: var(--primary-light);
                    color: var(--text);
                ">
                <input type="password" id="login-password" placeholder="كلمة المرور" style="
                    width: 100%;
                    padding: 12px;
                    margin: 10px 0;
                    border: 1px solid var(--glass-border);
                    border-radius: 8px;
                    background: var(--primary-light);
                    color: var(--text);
                ">
                <button id="login-btn" class="btn btn-primary" style="width: 100%; margin: 10px 0;">
                    <i class="fas fa-sign-in-alt"></i> تسجيل الدخول
                </button>
                <button id="signup-btn" class="btn btn-outline" style="width: 100%; margin: 5px 0;">
                    <i class="fas fa-user-plus"></i> إنشاء حساب جديد
                </button>
                <p style="margin-top: 20px; color: var(--text-light); font-size: 0.9rem;">
                    لتجربة التطبيق، يمكنك استخدام حساب تجريبي
                </p>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', loginHTML);
    
    // إعداد مستمعي الأحداث للنافذة
    document.getElementById('login-btn').addEventListener('click', async () => {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        if (!email || !password) {
            showNotification('خطأ', 'يرجى ملء جميع الحقول', 'error');
            return;
        }
        
        const result = await loginUser(email, password);
        if (result.success) {
            document.getElementById('login-modal').remove();
            location.reload(); // إعادة تحميل الصفحة لتحديث البيانات
        }
    });
    
    document.getElementById('signup-btn').addEventListener('click', async () => {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        if (!email || !password) {
            showNotification('خطأ', 'يرجى ملء جميع الحقول', 'error');
            return;
        }
        
        const result = await signUpUser(email, password, 'مستخدم جديد');
        if (result.success) {
            document.getElementById('login-modal').remove();
            showNotification('تم الإنشاء', 'تم إنشاء الحساب بنجاح، يرجى تفعيله عبر البريد الإلكتروني', 'success');
        }
    });
}

// ===== تعديل الدوال الحالية للعمل مع Supabase =====

// التحقق مما إذا كان المستخدم مسجل في الدورة
async function isUserEnrolled(courseId) {
    if (!currentUser.id) return false;
    
    const enrolledCourses = await getUserEnrolledCourses(currentUser.id);
    return enrolledCourses.includes(courseId);
}

// عرض الدورات في الصفحة الرئيسية
async function renderCourses(category = 'all') {
    const container = document.getElementById('courses-container');
    const filteredCourses = category === 'all' 
        ? coursesData 
        : coursesData.filter(course => course.category === category);
    
    let coursesHTML = '';
    
    for (const course of filteredCourses) {
        const isEnrolled = await isUserEnrolled(course.id);
        const safeTitle = escapeHtml(course.title);
        const safeInstructor = escapeHtml(course.instructor);
        
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
    }
    
    container.innerHTML = coursesHTML;
    setupCourseEventListeners();
}

// عرض الدورات المسجلة في صفحة "دوراتي"
async function renderMyCourses() {
    const container = document.getElementById('my-courses-container');
    const emptyState = document.getElementById('empty-my-courses');
    
    if (!currentUser.id) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    const enrolledCourseIds = await getUserEnrolledCourses(currentUser.id);
    const enrolledCourses = coursesData.filter(course => 
        enrolledCourseIds.includes(course.id)
    );
    
    if (enrolledCourses.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    let coursesHTML = '';
    for (const course of enrolledCourses) {
        const safeTitle = escapeHtml(course.title);
        const safeInstructor = escapeHtml(course.instructor);
        const progress = await getUserProgress(currentUser.id, course.id);
        
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
                <div class="progress-bar" style="
                    width: 100%;
                    height: 6px;
                    background: var(--glass-border);
                    border-radius: 3px;
                    margin: 10px 0;
                    overflow: hidden;
                ">
                    <div style="
                        width: ${progress}%;
                        height: 100%;
                        background: var(--success);
                        transition: width 0.3s ease;
                    "></div>
                </div>
                <div style="font-size: 0.8rem; color: var(--text-light); text-align: left;">
                    ${progress}% مكتمل
                </div>
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
                        <i class="fas fa-play"></i> ${progress > 0 ? 'متابعة' : 'بدء'} الدورة
                    </button>
                    <button class="btn btn-outline watch-trailer" data-youtube-id="${course.youtubeId}">
                        <i class="fas fa-eye"></i> مشاهدة المقدمة
                    </button>
                </div>
            </div>
        </div>
        `;
    }
    
    container.innerHTML = coursesHTML;
    setupCourseEventListeners();
}

// ===== تحديث تهيئة التطبيق =====
document.addEventListener('DOMContentLoaded', async () => {
    await initializeApp();
    
    // باقي الكود كما هو...
    setupCategoryFilters();
    setupStatsAnimation();
    
    // زر القائمة المتنقلة
    document.querySelector('.mobile-menu-btn').addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('active');
    });
    
    // زر إغلاق الفيديو
    document.getElementById('close-video').addEventListener('click', closeVideoPlayer);
    
    // إغلاق الفيديو عند النقر خارج الصندوق
    document.getElementById('video-player').addEventListener('click', (e) => {
        if (e.target.id === 'video-player') {
            closeVideoPlayer();
        }
    });

    // إغلاق الشريط الجانبي عند النقر خارجها في الشاشات الصغيرة
    document.addEventListener('click', (e) => {
        const sidebar = document.querySelector('.sidebar');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (window.innerWidth <= 992 && 
            !sidebar.contains(e.target) && 
            !mobileMenuBtn.contains(e.target) && 
            sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });

    // تفعيل الروابط في الشريط الجانبي
    document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // إزالة النشط من جميع الروابط
            document.querySelectorAll('.sidebar-nav .nav-link').forEach(l => {
                l.classList.remove('active');
            });
            
            // إضافة النشط للرابط المحدد
            e.target.classList.add('active');
            
            // التنقل بين الصفحات
            const page = e.target.getAttribute('data-page');
            if (page === 'home') {
                showHomePage();
            } else if (page === 'my-courses') {
                if (!currentUser.id) {
                    showLoginModal();
                } else {
                    showMyCoursesPage();
                }
            }
            
            // إغلاق الشريط في الشاشات الصغيرة
            if (window.innerWidth <= 992) {
                document.querySelector('.sidebar').classList.remove('active');
            }
        });
    });

    // زر تسجيل الخروج
    document.querySelector('[data-page="logout"]').addEventListener('click', async (e) => {
        e.preventDefault();
        await logoutUser();
        location.reload();
    });

    // زر تصفح الدورات في حالة عدم وجود دورات مسجلة
    document.getElementById('browse-courses-btn').addEventListener('click', () => {
        showHomePage();
        document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector('[data-page="home"]').classList.add('active');
    });
});
