// إعداد Supabase
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// بيانات الدورات
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
    },
    {
        id: 3,
        title: "دورة إدارة المشاريع الاحترافية - PMP و Agile",
        category: "business",
        instructor: "Skillzoy Academy",
        instructorAvatar: "https://randomuser.me/api/portraits/men/67.jpg",
        youtubeId: "dIFN_8bbu4o",
        duration: "32 ساعة",
        level: "متقدم",
        description: "تعلم كيفية إدارة المشاريع باحترافية باستخدام منهجيات PMP و Agile مع دراسات حالة عملية",
        videos: [
            { id: 1, title: "مقدمة في إدارة المشاريع والمفاهيم الأساسية", youtubeId: "dIFN_8bbu4o", duration: "20:15" },
            { id: 2, title: "التخطيط الاستراتيجي للمشاريع", youtubeId: "EZTQUXW1Q6I", duration: "25:30" },
            { id: 3, title: "إدارة المخاطر والميزانية والموارد", youtubeId: "p4QqMgg3XrQ", duration: "22:45" },
            { id: 4, title: "منهجية Agile لإدارة المشاريع", youtubeId: "Z9QbYZh1YXY", duration: "28:20" },
            { id: 5, title: "دراسة حالة مشروع ناجح وتحليل النتائج", youtubeId: "xT1nZ2a8pJ4", duration: "30:10" }
        ]
    },
    {
        id: 4,
        title: "دورة تعلم اللغة الإنجليزية - المحادثة والكتابة",
        category: "language",
        instructor: "Skillzoy Academy",
        instructorAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
        youtubeId: "2Y3F6YhPeYU",
        duration: "40 ساعة",
        level: "مبتدئ",
        description: "تعلم اللغة الإنجليزية من الصفر حتى الاحتراف مع تمارين تفاعلية ونطق صحيح ومحادثة يومية",
        videos: [
            { id: 1, title: "مقدمة وأساسيات اللغة الإنجليزية", youtubeId: "2Y3F6YhPeYU", duration: "18:20" },
            { id: 2, title: "القواعد الأساسية للنطق والأصوات", youtubeId: "qX9_N2nLq3I", duration: "22:10" },
            { id: 3, title: "المحادثة اليومية والمواقف الحياتية", youtubeId: "7ES6HazQ2cQ", duration: "25:45" },
            { id: 4, title: "المفردات المتقدمة والتعبيرات الشائعة", youtubeId: "8Q8l5pR4W5k", duration: "20:30" },
            { id: 5, title: "الكتابة والتعبير بطلاقة", youtubeId: "5JmOM0ZQy4Q", duration: "28:15" }
        ]
    }
];

// الحصول على المستخدم الحالي (محاكاة)
function getCurrentUser() {
    return {
        id: 1,
        name: "نشط الان",
        avatar: "https://ui-avatars.com/api/?name=نشط+الان&background=3b82f6&color=fff"
    };
}

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
        return [];
    }
}

// تسجيل المستخدم في دورة
async function enrollUserInCourse(userId, courseId) {
    try {
        const { data, error } = await supabase
            .from('user_courses')
            .insert([
                { user_id: userId, course_id: courseId, enrolled_at: new Date() }
            ]);
        
        if (error) throw error;
        
        return true;
    } catch (error) {
        console.error('Error enrolling user in course:', error);
        return false;
    }
}

// التحقق مما إذا كان المستخدم مسجل في الدورة
async function isUserEnrolled(userId, courseId) {
    const enrolledCourses = await getUserEnrolledCourses(userId);
    return enrolledCourses.includes(courseId);
}
