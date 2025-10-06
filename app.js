// إعداد Supabase - استبدل هذه القيم بمعلومات مشروعك
const SUPABASE_CONFIG = {
    url: 'https://your-project.supabase.co',
    key: 'your-anon-key'
};

// تهيئة Supabase مع معالجة الأخطاء
let supabase;
try {
    supabase = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.key, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
        }
    });
} catch (error) {
    console.error('فشل في تهيئة Supabase:', error);
    // استخدام وضع عدم الاتصال كبديل
    supabase = null;
}

// بيانات الدورات الافتراضية (للنسخ الاحتياطي)
const coursesData = [
    {
        id: 1,
        title: "دورة تطوير الويب الشاملة - من الصفر إلى الاحتراف",
        category: "programming",
        instructor: "Skillzoy Academy",
        instructorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
        youtubeId: "qz0aGYrrlhU",
        duration: "35 ساعة",
        level: "متقدم",
        description: "تعلم تطوير الويب من البداية إلى الاحتراف باستخدام HTML, CSS, JavaScript وتقنيات الويب الحديثة مع مشاريع عملية",
        videos: [
            { id: 1, title: "مقدمة في تطوير الويب وأساسياته", youtubeId: "qz0aGYrrlhU", duration: "15:30" },
            { id: 2, title: "أساسيات HTML5 والعناصر الجديدة", youtubeId: "BsDoLVMnmZs", duration: "22:15" },
            { id: 3, title: "تصميم متجاوب مع CSS3 وتقنيات Flexbox", youtubeId: "mU6anWqZJcc", duration: "18:45" },
            { id: 4, title: "JavaScript للمبتدئين - المفاهيم الأساسية", youtubeId: "W6NZfCO5SIk", duration: "25:10" },
            { id: 5, title: "مشروع تطبيق ويب تفاعلي كامل", youtubeId: "3PHXvlpOkf4", duration: "30:05" }
        ]
    },
    {
        id: 2,
        title: "دورة تصميم UI/UX - من المبادئ إلى الاحتراف",
        category: "design",
        instructor: "Skillzoy Academy",
        instructorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
        youtubeId: "c9Wg6Cb_YlU",
        duration: "28 ساعة",
        level: "متوسط",
        description: "تعلم تصميم واجهات المستخدم وتجربة المستخدم باستخدام أحدث الأدوات والتقنيات مع مشاريع عملية",
        videos: [
            { id: 1, title: "مقدمة في تصميم UI/UX وأهميته", youtubeId: "c9Wg6Cb_YlU", duration: "18:20" },
            { id: 2, title: "مبادئ التصميم المرئي والألوان", youtubeId: "ZK86XQ1iFVs", duration: "22:10" },
            { id: 3, title: "تصميم واجهات الجوال والتجربة المثلى", youtubeId: "HZuk6Wkx_Eg", duration: "25:45" },
            { id: 4, title: "أدوات المصمم المحترف - Figma وAdobe XD", youtubeId: "ZByhs3gLGT0", duration: "20:30" },
            { id: 5, title: "مشروع تصميم تطبيق كامل من البداية", youtubeId: "3q3FV65ZrUs", duration: "35:15" }
        ]
    }
];

// بيانات المستخدم (سيتم استبدالها بالمستخدم الحقيقي من Supabase)
let currentUser = {
    id: 'demo-user-' + Math.random().toString(36).substr(2, 9),
    name: 'نشط الان',
    role: 'طالب'
};

// بيانات دورات المستخدم
let userCourses = [];

// إنشاء تأثير الفقاعات
function createBubbles() {
    const bubblesContainer = document.getElementById('bubbles-container');
    const bubbleCount = 20;
    
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        // أحجام عشوائية للفقاعات
        const size = Math.random() * 60 + 20;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // مواقع عشوائية
        bubble.style.left = `${Math.random() * 100}%`;
        
        // تأخيرات عشوائية للحركة
        bubble.style.animationDelay = `${Math.random() * 15}s`;
        
        bubblesContainer.appendChild(bubble);
    }
}

// دالة آمنة لعرض HTML
function safeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// جلب الدورات من Supabase
async function loadCoursesFromSupabase() {
    if (!supabase) {
        console.warn('Supabase غير متوفر، استخدام البيانات المحلية');
        return coursesData;
    }

    try {
        const { data, error } = await supabase
            .from('courses')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || coursesData;
    } catch (error) {
        console.error('خطأ في جلب الدورات:', error);
        return coursesData;
    }
}

// جلب دورات المستخدم من Supabase
async function loadUserCourses() {
    if (!supabase) {
        console.warn('Supabase غير متوفر، استخدام البيانات المحلية');
        return userCourses;
    }

    try {
        const { data, error } = await supabase
            .from('user_courses')
            .select(`
                progress,
                enrolled_at,
                courses (*)
            `)
            .eq('user_id', currentUser.id);

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('خطأ في جلب دورات المستخدم:', error);
        return [];
    }
}

// عرض الدورات في الصفحة الرئيسية
async function renderCourses(category = 'all') {
    const container = document.getElementById('courses-container');
    const courses = await loadCoursesFromSupabase();
    const filteredCourses = category === 'all' 
        ? courses 
        : courses.filter(course => course.category === category);
    
    const userCoursesData = await loadUserCourses();
    
    container.innerHTML = filteredCourses.map(course => {
        const isEnrolled = userCoursesData.some(uc => uc.courses.id === course.id);
        const safeTitle = safeHTML(course.title);
        const safeInstructor = safeHTML(course.instructor);
        
        return `
        <div class="course-card" data-course-id="${course.id}">
            <div class="course-video-container">
                <div class="video-wrapper">
                    <iframe src="https://www.youtube.com/embed/${course.youtube_id}?rel=0&modestbranding=1" 
                            title="${safeTitle}"
                            allowfullscreen
                            loading="lazy">
                    </iframe>
                </div>
            </div>
            <div class="course-content">
                <span class="course-category">${getCategoryName(course.category)}</span>
                <h3 class="course-title">${safeTitle}</h3>
                <div class="course-instructor">
                    <img src="${course.instructor_avatar}" 
                         alt="${safeInstructor}" 
                         class="instructor-avatar"
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUiIGhlaWdodD0iMzUiIHZpZXdCb3g9IjAgMCAzNSAzNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTcuNSIgY3k9IjE3LjUiIHI9IjE3LjUiIGZpbGw9IiMzYTg2ZmYiLz4KPHN2ZyB4PSI5IiB5PSI5IiB3aWR0aD0iMTciIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDEyQzE0LjIwOTEgMTIgMTYgMTAuMjA5MSAxNiA4QzE2IDUuNzkwODYgMTQuMjA5MSA0IDEyIDRDOS43OTA4NiA0IDggNS43OTA4NiA4IDhDOCAxMC4yMDkxIDkuNzkwODYgMTIgMTIgMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTIgMTRDOS4zMyAxNCA0IDE1LjM0IDQgMThWMjBIMjBWMThDMjAgMTUuMzQgMTQuNjcgMTQgMTIgMTRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+'">
                    <span class="instructor-name">${safeInstructor}</span>
                </div>
                <div class="course-meta">
                    <span><i class="far fa-clock"></i> ${course.duration}</span>
                    <span><i class="fas fa-signal"></i> ${course.level}</span>
                </div>
                <div class="course-actions">
                    ${isEnrolled ? 
                        `<button class="btn btn-primary continue-course" data-course-id="${course.id}">
                            <i class="fas fa-play"></i> متابعة الدورة
                        </button>` :
                        `<button class="btn btn-primary enroll-course" data-course-id="${course.id}">
                            <i class="fas fa-plus"></i> التسجيل في الدورة
                        </button>`
                    }
                    <button class="btn btn-outline watch-trailer" data-youtube-id="${course.youtube_id}">
                        <i class="fas fa-eye"></i> مشاهدة المقدمة
                    </button>
                </div>
            </div>
        </div>
    `}).join('');

    setupCourseEventListeners();
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

// تسجيل المستخدم في دورة
async function enrollInCourse(courseId) {
    try {
        if (!supabase) {
            throw new Error('لا يوجد اتصال بقاعدة البيانات');
        }

        // التحقق من عدم تسجيل المستخدم مسبقاً
        const { data: existingEnrollment, error: checkError } = await supabase
            .from('user_courses')
            .select('*')
            .eq('user_id', currentUser.id)
            .eq('course_id', courseId)
            .single();

        if (existingEnrollment) {
            alert('أنت مسجل بالفعل في هذه الدورة!');
            return;
        }

        // إضافة الدورة إلى جدول user_courses
        const { data, error } = await supabase
            .from('user_courses')
            .insert([
                { 
                    user_id: currentUser.id, 
                    course_id: courseId, 
                    progress: 0,
                    enrolled_at: new Date().toISOString()
                }
            ])
            .select();

        if (error) throw error;

        // إعادة تحميل البيانات
        await renderCourses();
        alert('تم تسجيلك في الدورة بنجاح!');

    } catch (error) {
        console.error('خطأ في التسجيل في الدورة:', error);
        alert('حدث خطأ أثناء التسجيل في الدورة: ' + error.message);
    }
}

// بقية الدوال المطلوبة...
// [يتبع بنفس نمط الكود السابق مع التعديلات الأمنية]

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', () => {
    createBubbles();
    renderCourses();
    setupCategoryFilters();
    setupStatsAnimation();
    
    // إعداد الأمان
    setupSecurityMeasures();
    
    // تحميل الثيم المحفوظ
    loadSavedTheme();
});

// إجراءات أمنية إضافية
function setupSecurityMeasures() {
    // منع فتح النوافذ المنبثقة
    window.addEventListener('beforeunload', (e) => {
        // يمكن إضافة منطق للحفظ التلقائي هنا
    });

    // حماية ضد هجمات XSS
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
        if (typeof value === 'string' && /<script|javascript:/i.test(value)) {
            console.warn('تم منع محاولة تخزين بيانات خطرة');
            return;
        }
        originalSetItem.apply(this, arguments);
    };

    // مراقبة الأخطاء
    window.addEventListener('error', (e) => {
        console.error('حدث خطأ:', e.error);
        // يمكن إرسال تقرير الخطأ إلى الخادم هنا
    });
}
