
    <script>
        // 🔧 ===== تكوين Supabase =====
        const SUPABASE_URL = 'https://sjipwstkvvrautexigmt.supabase.co';
        const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqaXB3c3RrdnZyYXV0ZXhpZ210Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5MTE5MDcsImV4cCI6MjA3NDQ4NzkwN30.FSh2yIdZdvdNvtWxK5JB02PIdWOG3707qO-F0c84PnY';
        
        let supabase;
        try {
            if (SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_URL !== 'https://your-project.supabase.co') {
                supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
                console.log('✅ Supabase initialized successfully');
            } else {
                console.log('⚠️ Using fallback data - Supabase not configured');
            }
        } catch (error) {
            console.error('❌ Error initializing Supabase:', error);
        }

        // ===== بيانات الدورات الاحتياطية =====
        const backupCoursesData = [
            {
                id: 1,
                title: "أمن المعلومات من جوجل",
                category: "cybersecurity",
                provider: "Skillzoy Academy",
                playlist_id: "PL0vfts4VzfNgNVZIPX7VIS4w2dhuwCXbN",
                duration: "35 ساعة",
                level: "متقدم",
                description: "شهادة محترف أمن المعلومات من جوجل - تدريب مكثف",
                rating: 5,
                students: 1250
            },
            {
                id: 2,
                title: "تدريب عملي على اختبار الاختراق CTF",
                category: "cybersecurity",
                provider: "Skillzoy Academy",
                playlist_id: "PLVD3APpfd1tvnDW3VSqUKVvBezqQc2xmG",
                duration: "28 ساعة",
                level: "متوسط",
                description: "تعلم تصميم واجهة المستخدم وتجربة المستخدم باستخدام أحدث الأدوات والتقنيات مع مشاريع عملية",
                rating: 4,
                students: 890
            },
            {
                id: 3,
                title: "إدارة المشاريع الاحترافية - PMP و Agile",
                category: "business",
                provider: "Skillzoy Academy",
                playlist_id: "PLdPyS-4BsX-aNIxjgTAdM-6ZUHT2AYPyg",
                duration: "32 ساعة",
                level: "متقدم",
                description: "تعلم كيفية إدارة المشاريع باحترافية باستخدام منهجيات PMP و Agile مع دراسات حالة عملية",
                rating: 5,
                students: 1100
            },
            {
                id: 4,
                title: "تعلم اللغة الإنجليزية - المحادثة والكتابة",
                category: "language",
                provider: "Skillzoy Academy",
                playlist_id: "PL_Zjf61X10RJETKdhjfVLe4yL94morKRX",
                duration: "40 ساعة",
                level: "مبتدئ",
                description: "تعلم الإنجليزية من الصفر إلى الاحتراف مع تمارين تفاعلية ونطق صحيح ومحادثة يومية",
                rating: 4,
                students: 2100
            },
            {
                id: 5,
                title: "الذكاء الاصطناعي وتعلم الآلة",
                category: "ai",
                provider: "Skillzoy Academy",
                playlist_id: "PL9ooVrP1hQOHUfd-g8GUpKI3hHOwM_9Dn",
                duration: "45 ساعة",
                level: "متقدم",
                description: "تعلم أساسيات الذكاء الاصطناعي وتعلم الآلة باستخدام Python والمكتبات المتخصصة",
                rating: 5,
                students: 750
            },
            {
                id: 6,
                title: "التسويق الرقمي والمحتوى",
                category: "marketing",
                provider: "Skillzoy Academy",
                playlist_id: "PL9ooVrP1hQOHUfd-g8GUpKI3hHOwM_9Dn",
                duration: "30 ساعة",
                level: "متوسط",
                description: "تعلم استراتيجيات التسويق الرقمي وإدارة المحتوى لتحقيق نتائج مذهلة في عالم الأعمال",
                rating: 4,
                students: 1350
            }
        ];

        // ===== نظام اللغة =====
        class LanguageManager {
            constructor() {
                this.currentLanguage = localStorage.getItem('language') || 'ar';
                this.translations = {
                    ar: {
                        // القائمة الرئيسية
                        main_menu: "القائمة الرئيسية",
                        home: "الرئيسية",
                        my_courses: "دوراتي",
                        progress: "التقدم",
                        my_certificates: "شهاداتي",
                        
                        // المحتوى التعليمي
                        educational_content: "المحتوى التعليمي",
                        study_materials: "المواد الدراسية",
                        assignments: "الواجبات",
                        
                        // الحساب والإعدادات
                        account_settings: "الحساب والإعدادات",
                        settings: "الإعدادات",
                        help: "المساعدة",
                        
                        // اللغة والمظهر
                        language: "اللغة",
                        appearance: "المظهر",
                        light_mode: "وضع النهار",
                        
                        // المستخدم
                        active_now: "نشط الان",
                        student: "👨‍🎓طالب",
                        
                        // الشهادات
                        congratulations: "مبروك! لقد أكملت الدورة بنجاح",
                        enter_full_name: "أدخل اسمك الكامل للحصول على شهادتك:",
                        full_name: "الاسم الكامل",
                        cancel: "إلغاء",
                        get_certificate: "احصل على شهادتك",
                        certificate_awarded: "تمنح هذه الشهادة بكل فخر إلى",
                        for_completing: "لإكماله بنجاح دورة",
                        close: "إغلاق",
                        download_as_image: "تحميل كصورة",
                        download_as_pdf: "تحميل كPDF",
                        
                        // الصفحة الرئيسية
                        platform_title: "Skillzoy Academy - منصة التعليم الالكتروني الرائدة",
                        platform_description: "أفضل الدورات التعليمية لتطوير مهاراتك ومعرفتك في مختلف المجالات",
                        registered_students: "طالب مسجل",
                        available_courses: "دورة متاحة",
                        certified_certificates: "شهادة معتمدة",
                        professional_instructors: "مدرب محترف",
                        
                        // صفحة دوراتي
                        my_courses_description: "الدورات التي سجلت فيها ويمكنك متابعتها",
                        no_courses: "لا توجد دورات مسجلة",
                        no_courses_description: "لم تسجل في أي دورة بعد. تصفح الدورات المتاحة وسجل في الدورة التي تهمك.",
                        browse_courses: "تصفح الدورات",
                        
                        // صفحة التقدم
                        my_progress: "تقدمي التعليمي",
                        my_progress_description: "تابع تقدمك في جميع الدورات المسجلة",
                        my_courses_progress: "تقدم دوراتي",
                        
                        // صفحة الشهادات
                        my_certificates_description: "الشهادات التي حصلت عليها من الدورات المكتملة",
                        no_certificates: "لا توجد شهادات بعد",
                        no_certificates_description: "لم تكمل أي دورة بعد. أكمل الدورات المسجلة للحصول على شهادات معتمدة.",
                        browse_my_courses: "تصفح دوراتي",
                        
                        // صفحة الإعدادات
                        settings_description: "تخصيص تجربتك في المنصة وفقاً لتفضيلاتك",
                        dark_mode: "الوضع الداكن",
                        dark_mode_description: "تفعيل أو تعطيل الوضع الداكن",
                        language_description: "اختر اللغة المناسبة لك",
                        danger_zone: "منطقة الخطر",
                        danger_zone_description: "هذه الإجراءات لا يمكن التراجع عنها. يرجى التأكد قبل المتابعة.",
                        logout: "تسجيل الخروج",
                        
                        // صفحة تفاصيل الدورة
                        back_to_courses: "العودة للدورات",
                        videos: "فيديوهات",
                        learning_hours: "ساعة تعليمية",
                        certificate: "شهادة",
                        after_completion: "بعد الإكمال",
                        level: "المستوى",
                        course_videos: "فيديوهات الدورة",
                        important_note: "ملاحظة هامة:",
                        certificate_note: "الشهادة المجانية ستظهر تلقائيًا بعد إكمال جميع فيديوهات الدورة بنجاح.",
                        congratulations_completed: "مبروك! لقد أكملت الدورة بنجاح",
                        get_certificate_now: "يمكنك الآن الحصول على شهادتك المعتمدة من الأكاديمية",
                        free_certificate: "شهادة مجانية",
                        certificate_feature1: "شهادة رقمية باللغة الإنجليزية",
                        certificate_feature2: "ختم الأكاديمية الرسمي",
                        certificate_feature3: "توقيع المدير التنفيذي",
                        certificate_feature4: "رقم شهادة فريد",
                        certificate_feature5: "تحميل كPDF/صورة",
                        get_free_certificate: "احصل على شهادة مجانية",
                        premium_certificate: "شهادة مميزة",
                        premium_feature1: "جميع ميزات الشهادة المجانية",
                        premium_feature2: "تصميم مميز بلمسات ذهبية",
                        premium_feature3: "ختم مطبوع رسمي",
                        premium_feature4: "رمز QR للتحقق",
                        premium_feature5: "نسخة ورقية مطبوعة",
                        premium_feature6: "تحقق مدى الحياة",
                        additional_premium_features: "الميزات الإضافية للشهادة المميزة:",
                        premium_additional1: "تصميم فاخر بلمسات ذهبية",
                        premium_additional2: "طباعة عالية الجودة على ورق مميز",
                        premium_additional3: "اعتراف دولي",
                        premium_additional4: "خيار التأطير متاح",
                        contact_for_premium: "تواصل للحصول على الشهادة المميزة",
                        
                        // الفوتر
                        footer_description: "منصة تعليمية رائدة في تقديم الدورات التعليمية عالية الجودة في مختلف المجالات. نهدف إلى تمكين الأفراد من خلال المعرفة والمهارات التي يحتاجونها لتحقيق أهدافهم.",
                        quick_links: "روابط سريعة",
                        all_courses: "جميع الدورات",
                        instructors: "المدربين",
                        about_academy: "عن الأكاديمية",
                        learner_support: "مركز دعم المتعلم",
                        faq: "الأسئلة الشائعة",
                        technical_support: "الدعم الفني",
                        contact_us: "اتصل بنا",
                        privacy_policy: "سياسة الخصوصية",
                        terms_of_use: "شروط الاستخدام",
                        whatsapp: "واتساب",
                        address: "العنوان: مدينة المعرفة، الرياض",
                        copyright: "جميع الحقوق محفوظة &copy; 2025 Skillzoy Academy"
                    },
                    en: {
                        // Main Menu
                        main_menu: "Main Menu",
                        home: "Home",
                        my_courses: "My Courses",
                        progress: "Progress",
                        my_certificates: "My Certificates",
                        
                        // Educational Content
                        educational_content: "Educational Content",
                        study_materials: "Study Materials",
                        assignments: "Assignments",
                        
                        // Account & Settings
                        account_settings: "Account & Settings",
                        settings: "Settings",
                        help: "Help",
                        
                        // Language & Appearance
                        language: "Language",
                        appearance: "Appearance",
                        light_mode: "Light Mode",
                        
                        // User
                        active_now: "Active Now",
                        student: "👨‍🎓Student",
                        
                        // Certificates
                        congratulations: "Congratulations! You have successfully completed the course",
                        enter_full_name: "Enter your full name to get your certificate:",
                        full_name: "Full Name",
                        cancel: "Cancel",
                        get_certificate: "Get Your Certificate",
                        certificate_awarded: "This certificate is proudly awarded to",
                        for_completing: "for successfully completing the course",
                        close: "Close",
                        download_as_image: "Download as Image",
                        download_as_pdf: "Download as PDF",
                        
                        // Home Page
                        platform_title: "Skillzoy Academy - Leading E-Learning Platform",
                        platform_description: "The best educational courses to develop your skills and knowledge in various fields",
                        registered_students: "Registered Students",
                        available_courses: "Available Courses",
                        certified_certificates: "Certified Certificates",
                        professional_instructors: "Professional Instructors",
                        
                        // My Courses Page
                        my_courses_description: "Courses you have enrolled in and can follow",
                        no_courses: "No courses enrolled",
                        no_courses_description: "You haven't enrolled in any courses yet. Browse available courses and enroll in the course that interests you.",
                        browse_courses: "Browse Courses",
                        
                        // Progress Page
                        my_progress: "My Learning Progress",
                        my_progress_description: "Track your progress in all enrolled courses",
                        my_courses_progress: "My Courses Progress",
                        
                        // Certificates Page
                        my_certificates_description: "Certificates you have obtained from completed courses",
                        no_certificates: "No certificates yet",
                        no_certificates_description: "You haven't completed any courses yet. Complete enrolled courses to get certified certificates.",
                        browse_my_courses: "Browse My Courses",
                        
                        // Settings Page
                        settings_description: "Customize your experience on the platform according to your preferences",
                        dark_mode: "Dark Mode",
                        dark_mode_description: "Enable or disable dark mode",
                        language_description: "Choose your preferred language",
                        danger_zone: "Danger Zone",
                        danger_zone_description: "These actions cannot be undone. Please confirm before proceeding.",
                        logout: "Logout",
                        
                        // Course Details Page
                        back_to_courses: "Back to Courses",
                        videos: "Videos",
                        learning_hours: "Learning Hours",
                        certificate: "Certificate",
                        after_completion: "After Completion",
                        level: "Level",
                        course_videos: "Course Videos",
                        important_note: "Important Note:",
                        certificate_note: "The free certificate will automatically appear after successfully completing all course videos.",
                        congratulations_completed: "Congratulations! You have successfully completed the course",
                        get_certificate_now: "You can now get your certified certificate from the academy",
                        free_certificate: "Free Certificate",
                        certificate_feature1: "Digital certificate in English",
                        certificate_feature2: "Official academy seal",
                        certificate_feature3: "CEO signature",
                        certificate_feature4: "Unique certificate number",
                        certificate_feature5: "Download as PDF/Image",
                        get_free_certificate: "Get Free Certificate",
                        premium_certificate: "Premium Certificate",
                        premium_feature1: "All free certificate features",
                        premium_feature2: "Distinctive design with golden touches",
                        premium_feature3: "Official printed seal",
                        premium_feature4: "QR code for verification",
                        premium_feature5: "Printed paper copy",
                        premium_feature6: "Lifetime verification",
                        additional_premium_features: "Additional Premium Certificate Features:",
                        premium_additional1: "Luxurious design with golden touches",
                        premium_additional2: "High-quality printing on premium paper",
                        premium_additional3: "International recognition",
                        premium_additional4: "Framing option available",
                        contact_for_premium: "Contact for Premium Certificate",
                        
                        // Footer
                        footer_description: "A leading educational platform providing high-quality educational courses in various fields. We aim to empower individuals through the knowledge and skills they need to achieve their goals.",
                        quick_links: "Quick Links",
                        all_courses: "All Courses",
                        instructors: "Instructors",
                        about_academy: "About Academy",
                        learner_support: "Learner Support Center",
                        faq: "FAQ",
                        technical_support: "Technical Support",
                        contact_us: "Contact Us",
                        privacy_policy: "Privacy Policy",
                        terms_of_use: "Terms of Use",
                        whatsapp: "WhatsApp",
                        address: "Address: Knowledge City, Riyadh",
                        copyright: "All rights reserved &copy; 2025 Skillzoy Academy"
                    }
                };
            }

            // تغيير اللغة
            changeLanguage(lang) {
                this.currentLanguage = lang;
                localStorage.setItem('language', lang);
                this.applyTranslations();
                
                // تحديث اتجاه النص
                document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
                document.documentElement.lang = lang;
                
                // تحديث زر تغيير اللغة في الشريط الجانبي
                const languageToggle = document.getElementById('language-toggle');
                const languageText = languageToggle.querySelector('span');
                const languageIcon = document.getElementById('language-icon');
                
                if (lang === 'ar') {
                    languageText.textContent = 'English';
                    languageIcon.classList.remove('fa-toggle-on');
                    languageIcon.classList.add('fa-toggle-off');
                } else {
                    languageText.textContent = 'العربية';
                    languageIcon.classList.remove('fa-toggle-off');
                    languageIcon.classList.add('fa-toggle-on');
                }
                
                showNotification(
                    this.translate('language_changed', lang),
                    this.translate('language_changed_message', lang),
                    'success'
                );
            }

            // تطبيق الترجمة على جميع العناصر
            applyTranslations() {
                const elements = document.querySelectorAll('[data-translate]');
                elements.forEach(element => {
                    const key = element.getAttribute('data-translate');
                    const translation = this.translate(key);
                    if (translation) {
                        if (element.tagName === 'INPUT' && element.type === 'text') {
                            element.placeholder = translation;
                        } else {
                            element.textContent = translation;
                        }
                    }
                });
            }

            // ترجمة مفتاح معين
            translate(key, lang = this.currentLanguage) {
                return this.translations[lang]?.[key] || key;
            }

            // الحصول على اللغة الحالية
            getCurrentLanguage() {
                return this.currentLanguage;
            }

            // تهيئة اللغة
            init() {
                this.applyTranslations();
                
                // تحديث اتجاه النص بناءً على اللغة
                document.documentElement.dir = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
                document.documentElement.lang = this.currentLanguage;
            }
        }

        // ===== جلب الدورات من Supabase =====
        async function fetchCoursesFromSupabase() {
            try {
                if (!supabase) {
                    throw new Error('Supabase not configured');
                }

                const { data, error } = await supabase
                    .from('courses')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) {
                    console.error('❌ Error fetching courses from Supabase:', error);
                    showNotification('تحذير', 'تم تحميل بيانات احتياطية بسبب مشكلة في الاتصال', 'warning');
                    return backupCoursesData;
                }

                if (!data || data.length === 0) {
                    console.log('📝 No courses found in Supabase, using backup data');
                    return backupCoursesData;
                }

                console.log('✅ Courses loaded successfully from Supabase:', data.length);
                return data;
            } catch (error) {
                console.error('❌ Error connecting to Supabase:', error);
                showNotification('تحذير', 'تم تحميل بيانات احتياطية بسبب مشكلة في الاتصال', 'warning');
                return backupCoursesData;
            }
        }

        // ===== نظام تتبع التقدم المحسن =====
        class ProgressSystem {
            constructor() {
                this.progress = this.loadProgress();
                this.videoTimers = {};
            }

            loadProgress() {
                const saved = localStorage.getItem('userProgress');
                return saved ? JSON.parse(saved) : {};
            }

            saveProgress() {
                localStorage.setItem('userProgress', JSON.stringify(this.progress));
            }

            // بدء تتبع مشاهدة الفيديو
            startVideoTracking(courseId, videoId) {
                const key = `${courseId}_${videoId}`;
                this.videoTimers[key] = {
                    startTime: Date.now(),
                    watchedSeconds: 0,
                    interval: setInterval(() => {
                        this.videoTimers[key].watchedSeconds += 1;
                        
                        // إذا تمت مشاهدة 10 ثوانٍ على الأقل
                        if (this.videoTimers[key].watchedSeconds >= 10) {
                            this.markVideoCompleted(courseId, videoId);
                            this.stopVideoTracking(courseId, videoId);
                        }
                    }, 1000)
                };
            }

            // إيقاف تتبع مشاهدة الفيديو
            stopVideoTracking(courseId, videoId) {
                const key = `${courseId}_${videoId}`;
                if (this.videoTimers[key]) {
                    clearInterval(this.videoTimers[key].interval);
                    delete this.videoTimers[key];
                }
            }

            // تسجيل فيديو كمكتمل
            markVideoCompleted(courseId, videoId) {
                if (!this.progress[courseId]) {
                    this.progress[courseId] = {
                        completedVideos: [],
                        totalVideos: 0
                    };
                }

                if (!this.progress[courseId].completedVideos.includes(videoId)) {
                    this.progress[courseId].completedVideos.push(videoId);
                    this.saveProgress();
                    
                    // التحقق مما إذا كانت الدورة مكتملة
                    this.checkCourseCompletion(courseId);
                    
                    return true;
                }
                return false;
            }

            // تعيين عدد الفيديوهات الإجمالي
            setTotalVideos(courseId, totalVideos) {
                if (!this.progress[courseId]) {
                    this.progress[courseId] = {
                        completedVideos: [],
                        totalVideos: 0
                    };
                }
                this.progress[courseId].totalVideos = totalVideos;
                this.saveProgress();
                
                // التحقق مما إذا كانت الدورة مكتملة
                this.checkCourseCompletion(courseId);
            }

            // التحقق من اكتمال الدورة
            checkCourseCompletion(courseId) {
                const courseProgress = this.progress[courseId];
                if (!courseProgress || courseProgress.totalVideos === 0) return false;
                
                const isCompleted = courseProgress.completedVideos.length === courseProgress.totalVideos;
                
                if (isCompleted && !courseProgress.courseCompleted) {
                    courseProgress.courseCompleted = true;
                    courseProgress.completedAt = new Date().toISOString();
                    this.saveProgress();
                    
                    showNotification('مبروك!', 'لقد أكملت الدورة بنجاح! يمكنك الآن الحصول على شهادتك.', 'success');
                    
                    // عرض قسم الشهادة في صفحة تفاصيل الدورة
                    if (document.getElementById('course-details').style.display === 'block') {
                        document.getElementById('certificate-section').style.display = 'block';
                    }
                }
                
                return isCompleted;
            }

            // حساب نسبة التقدم
            getProgressPercentage(courseId) {
                const courseProgress = this.progress[courseId];
                if (!courseProgress || courseProgress.totalVideos === 0) return 0;
                
                return Math.round((courseProgress.completedVideos.length / courseProgress.totalVideos) * 100);
            }

            // التحقق مما إذا كان الفيديو مكتملاً
            isVideoCompleted(courseId, videoId) {
                const courseProgress = this.progress[courseId];
                return courseProgress ? courseProgress.completedVideos.includes(videoId) : false;
            }

            // الحصول على تفاصيل تقدم الدورة
            getCourseProgress(courseId) {
                return this.progress[courseId] || { completedVideos: [], totalVideos: 0 };
            }

            // الحصول على إحصائيات التقدم العامة
            getOverallStats() {
                let totalVideos = 0;
                let completedVideos = 0;
                let totalCourses = 0;
                let completedCourses = 0;

                Object.values(this.progress).forEach(course => {
                    if (course.totalVideos > 0) {
                        totalVideos += course.totalVideos;
                        completedVideos += course.completedVideos.length;
                        totalCourses++;
                        
                        if (course.completedVideos.length === course.totalVideos) {
                            completedCourses++;
                        }
                    }
                });

                const overallProgress = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;

                return {
                    totalVideos,
                    completedVideos,
                    totalCourses,
                    completedCourses,
                    overallProgress
                };
            }

            // التحقق مما إذا كانت الدورة مكتملة
            isCourseCompleted(courseId) {
                const courseProgress = this.progress[courseId];
                return courseProgress ? courseProgress.courseCompleted : false;
            }
        }

        // ===== نظام إدارة الشهادات =====
        class CertificateManager {
            constructor() {
                this.certificates = this.loadCertificates();
            }

            loadCertificates() {
                return JSON.parse(localStorage.getItem('userCertificates')) || [];
            }

            saveCertificates() {
                localStorage.setItem('userCertificates', JSON.stringify(this.certificates));
            }

            // إنشاء شهادة جديدة
            createCertificate(courseId, courseTitle, studentName) {
                // التحقق مما إذا كان المستخدم لديه شهادة لهذه الدورة بالفعل
                const existingCertificate = this.certificates.find(cert => 
                    cert.courseId === courseId
                );
                
                if (existingCertificate) {
                    showNotification('تنبيه', 'لديك بالفعل شهادة لهذه الدورة', 'warning');
                    return existingCertificate;
                }
                
                const certificateId = this.generateCertificateId();
                const issueDate = new Date().toLocaleDateString('ar-EG', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });
                
                const certificate = {
                    id: certificateId,
                    courseId: courseId,
                    courseTitle: courseTitle,
                    studentName: studentName,
                    issueDate: issueDate,
                    createdAt: new Date().toISOString()
                };
                
                this.certificates.push(certificate);
                this.saveCertificates();
                
                return certificate;
            }

            // توليد رقم شهادة فريد
            generateCertificateId() {
                const timestamp = Date.now();
                const random = Math.floor(Math.random() * 1000);
                return `SKZ-${new Date().getFullYear()}-${timestamp.toString().slice(-6)}-${random}`;
            }

            // الحصول على شهادات المستخدم
            getUserCertificates() {
                return this.certificates;
            }

            // الحصول على شهادة محددة
            getCertificate(certificateId) {
                return this.certificates.find(cert => cert.id === certificateId);
            }

            // التحقق مما إذا كان المستخدم لديه شهادة للدورة
            hasCertificateForCourse(courseId) {
                return this.certificates.some(cert => cert.courseId === courseId);
            }

            // عرض الشهادة
            displayCertificate(certificate) {
                document.getElementById('certificate-student-name').textContent = certificate.studentName;
                document.getElementById('certificate-course-name').textContent = certificate.courseTitle;
                
                const issueDate = new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });
                
                document.getElementById('certificate-date').textContent = `في تاريخ ${issueDate}`;
                document.getElementById('certificate-id').textContent = `رقم الشهادة: ${certificate.id}`;
                document.getElementById('certificate-issue-date').textContent = `تاريخ الإصدار: ${issueDate}`;
                
                document.getElementById('certificate-container').style.display = 'flex';
                
                // التمرير إلى الأعلى لضمان ظهور أزرار التحميل على الهواتف
                setTimeout(() => {
                    document.getElementById('certificate-container').scrollTop = 0;
                }, 100);
            }

            // تحميل الشهادة كصورة
            async downloadAsImage() {
                try {
                    const certificateElement = document.getElementById('certificate-template');
                    const canvas = await html2canvas(certificateElement, {
                        scale: 2,
                        useCORS: true,
                        allowTaint: true
                    });
                    
                    const link = document.createElement('a');
                    link.download = `شهادة-${document.getElementById('certificate-student-name').textContent}.png`;
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                    
                    showNotification('تم التحميل', 'تم تحميل الشهادة كصورة بنجاح', 'success');
                } catch (error) {
                    console.error('Error generating certificate image:', error);
                    showNotification('خطأ', 'حدث خطأ أثناء تحميل الشهادة', 'error');
                }
            }

            // تحميل الشهادة كPDF
            async downloadAsPDF() {
                try {
                    const certificateElement = document.getElementById('certificate-template');
                    const canvas = await html2canvas(certificateElement, {
                        scale: 2,
                        useCORS: true,
                        allowTaint: true
                    });
                    
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jspdf.jsPDF('l', 'mm', 'a4');
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = pdf.internal.pageSize.getHeight();
                    const imgWidth = canvas.width;
                    const imgHeight = canvas.height;
                    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
                    const imgX = (pdfWidth - imgWidth * ratio) / 2;
                    const imgY = (pdfHeight - imgHeight * ratio) / 2;
                    
                    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
                    pdf.save(`شهادة-${document.getElementById('certificate-student-name').textContent}.pdf`);
                    
                    showNotification('تم التحميل', 'تم تحميل الشهادة كPDF بنجاح', 'success');
                } catch (error) {
                    console.error('Error generating certificate PDF:', error);
                    showNotification('خطأ', 'حدث خطأ أثناء تحميل الشهادة', 'error');
                }
            }
        }

        // ===== نظام إدارة الثيمات =====
        class ThemeManager {
            constructor() {
                this.currentTheme = localStorage.getItem('theme') || 'blue';
                this.currentMode = localStorage.getItem('mode') || 'dark';
            }

            // تغيير الثيم
            changeTheme(theme) {
                this.currentTheme = theme;
                localStorage.setItem('theme', theme);
                
                // إزالة كل الثيمات السابقة
                document.body.classList.remove('theme-blue', 'theme-green', 'theme-purple', 'theme-orange');
                
                // إضافة الثيم الجديد
                document.body.classList.add(`theme-${theme}`);
                
                // تحديث أزرار الألوان النشطة
                this.updateActiveColorButtons(theme);
                
                showNotification('تم التحديث', `تم تغيير اللون إلى ${this.getThemeName(theme)}`, 'info');
            }

            // تغيير الوضع (فاتح/داكن)
            toggleMode() {
                if (this.currentMode === 'dark') {
                    this.currentMode = 'light';
                    document.body.classList.add('light-theme');
                } else {
                    this.currentMode = 'dark';
                    document.body.classList.remove('light-theme');
                }
                
                localStorage.setItem('mode', this.currentMode);
                
                const themeIcon = document.getElementById('theme-icon');
                if (this.currentMode === 'light') {
                    themeIcon.classList.remove('fa-toggle-off');
                    themeIcon.classList.add('fa-toggle-on');
                } else {
                    themeIcon.classList.remove('fa-toggle-on');
                    themeIcon.classList.add('fa-toggle-off');
                }
                
                showNotification('تم التحديث', `تم تفعيل ${this.currentMode === 'light' ? 'وضع النهار' : 'الوضع الداكن'}`, 'info');
            }

            // الحصول على اسم الثيم
            getThemeName(theme) {
                const themeNames = {
                    'blue': 'أزرق',
                    'green': 'أخضر',
                    'purple': 'بنفسجي',
                    'orange': 'برتقالي'
                };
                return themeNames[theme] || theme;
            }

            // تحديث أزرار الألوان النشطة
            updateActiveColorButtons(activeTheme) {
                document.querySelectorAll('.color-theme-option').forEach(option => {
                    option.classList.remove('active');
                    if (option.getAttribute('data-theme') === activeTheme) {
                        option.classList.add('active');
                    }
                });
            }

            // تهيئة الثيم
            init() {
                // تطبيق الثيم المحفوظ
                this.changeTheme(this.currentTheme);
                
                // تطبيق الوضع المحفوظ
                if (this.currentMode === 'light') {
                    document.body.classList.add('light-theme');
                    document.getElementById('theme-icon').classList.remove('fa-toggle-off');
                    document.getElementById('theme-icon').classList.add('fa-toggle-on');
                    document.getElementById('dark-mode-toggle').checked = true;
                }
            }
        }

// سكربت التصميم الثاني - تمرير يدوي فقط
class ManualScrollCarousel {
  constructor(container) {
    this.container = container;
    this.wrapper = container.querySelector('.category-carousel-wrapper-manual');
    this.filters = container.querySelector('.category-filters-manual');
    this.hintLeft = container.querySelector('.scroll-hint-left');
    this.hintRight = container.querySelector('.scroll-hint-right');
    this.isDragging = false;
    this.startX = 0;
    this.scrollLeft = 0;
    this.velocity = 0;
    this.lastX = 0;
    this.lastTime = 0;
    this.animationId = null;
    
    this.init();
  }
  
  init() {
    // إضافة مستمعي الأحداث للسحب واللمس
    this.container.addEventListener('mousedown', this.startDrag.bind(this));
    this.container.addEventListener('touchstart', this.startDrag.bind(this));
    
    window.addEventListener('mousemove', this.drag.bind(this));
    window.addEventListener('touchmove', this.drag.bind(this));
    
    window.addEventListener('mouseup', this.endDrag.bind(this));
    window.addEventListener('touchend', this.endDrag.bind(this));
    
    // تحديث حالة مؤشرات التمرير
    this.updateScrollHints();
    
    // إضافة مستمع لتحديث المؤشرات عند تغيير الحجم
    window.addEventListener('resize', this.updateScrollHints.bind(this));
  }
  
  startDrag(e) {
    this.isDragging = true;
    this.container.classList.add('grabbing');
    this.container.classList.remove('inertia');
    
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    this.startX = clientX - this.container.getBoundingClientRect().left;
    this.scrollLeft = this.getScrollPosition();
    this.lastX = clientX;
    this.lastTime = Date.now();
    this.velocity = 0;
    
    // إيقاف أي حركة قصور ذاتي سابقة
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
  
  drag(e) {
    if (!this.isDragging) return;
    
    e.preventDefault();
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const currentTime = Date.now();
    const deltaTime = currentTime - this.lastTime;
    
    if (deltaTime > 0) {
      const deltaX = clientX - this.lastX;
      this.velocity = deltaX / deltaTime;
      this.lastX = clientX;
      this.lastTime = currentTime;
    }
    
    const x = clientX - this.container.getBoundingClientRect().left;
    const walk = (x - this.startX) * 1.8; // زيادة الحساسية
    this.setScrollPosition(this.scrollLeft - walk);
    
    this.updateScrollHints();
  }
  
  endDrag() {
    this.isDragging = false;
    this.container.classList.remove('grabbing');
    
    // تطبيق القصور الذاتي
    if (Math.abs(this.velocity) > 0.1) {
      this.applyInertia();
    }
    
    this.updateScrollHints();
  }
  
  applyInertia() {
    this.container.classList.add('inertia');
    
    const friction = 0.92;
    const minVelocity = 0.1;
    
    const animate = () => {
      if (Math.abs(this.velocity) < minVelocity) {
        this.velocity = 0;
        this.container.classList.remove('inertia');
        this.updateScrollHints();
        return;
      }
      
      const currentScroll = this.getScrollPosition();
      const maxScroll = this.filters.scrollWidth - this.wrapper.offsetWidth;
      
      let newScroll = currentScroll + (this.velocity * 15);
      
      // الحد من التمرير داخل النطاق المسموح
      if (newScroll < 0) {
        newScroll = 0;
        this.velocity = 0;
      } else if (newScroll > maxScroll) {
        newScroll = maxScroll;
        this.velocity = 0;
      }
      
      this.setScrollPosition(newScroll);
      this.velocity *= friction;
      
      this.animationId = requestAnimationFrame(animate);
    };
    
    this.animationId = requestAnimationFrame(animate);
  }
  
  updateScrollHints() {
    const currentScroll = this.getScrollPosition();
    const maxScroll = this.filters.scrollWidth - this.wrapper.offsetWidth;
    
    // إظهار/إخفاء مؤشرات التمرير
    this.container.classList.toggle('scrollable-left', currentScroll > 0);
    this.container.classList.toggle('scrollable-right', currentScroll < maxScroll);
  }
  
  getScrollPosition() {
    return parseInt(this.filters.style.transform?.replace('translateX(', '')?.replace('px)', '') || 0);
  }
  
  setScrollPosition(position) {
    this.filters.style.transform = `translateX(${position}px)`;
  }
}

// تهيئة الكاروسيل اليدوي
document.addEventListener('DOMContentLoaded', () => {
  const manualCarousels = document.querySelectorAll('.category-carousel-manual');
  manualCarousels.forEach(container => {
    new ManualScrollCarousel(container);
  });
});
        // ===== تهيئة النظام =====
        const progressSystem = new ProgressSystem();
        const certificateManager = new CertificateManager();
        const languageManager = new LanguageManager();
        const themeManager = new ThemeManager();
        let categoryCarousel;
        let currentUser = {
            id: 1,
            name: "نشط الان",
            avatar: "https://ui-avatars.com/api/?name=نشط+الان&background=3b82f6&color=fff"
        };

        // ===== إدارة المستخدم =====
        const userManager = {
            enrolledCourses: JSON.parse(localStorage.getItem('userCourses')) || [],

            enrollInCourse(courseId) {
                if (!this.isEnrolled(courseId)) {
                    this.enrolledCourses.push(courseId);
                    localStorage.setItem('userCourses', JSON.stringify(this.enrolledCourses));
                    return true;
                }
                return false;
            },

            unenrollFromCourse(courseId) {
                const index = this.enrolledCourses.indexOf(courseId);
                if (index > -1) {
                    this.enrolledCourses.splice(index, 1);
                    localStorage.setItem('userCourses', JSON.stringify(this.enrolledCourses));
                    
                    // حذف تقدم الدورة من localStorage
                    const progress = progressSystem.loadProgress();
                    if (progress[courseId]) {
                        delete progress[courseId];
                        localStorage.setItem('userProgress', JSON.stringify(progress));
                    }
                    
                    return true;
                }
                return false;
            },

            isEnrolled(courseId) {
                return this.enrolledCourses.includes(courseId);
            },

            getEnrolledCourses() {
                return this.enrolledCourses;
            }
        };

        // ===== YouTube API Integration =====
        const YOUTUBE_API_KEY = "AIzaSyBdEIVHCYgh3Z7CVfPPzdn18Ic8EJOBBTE";

        // ذاكرة التخزين المؤقت للفيديوهات
        const playlistCache = new Map();

        // وظيفة محسنة لجلب فيديوهات قائمة التشغيل من YouTube
        async function fetchPlaylistVideos(playlistId) {
            try {
                // التحقق من التخزين المؤقت أولاً
                if (playlistCache.has(playlistId)) {
                    console.log(`📺 Returning cached videos for playlist: ${playlistId}`);
                    return playlistCache.get(playlistId);
                }

                // إذا لم يكن هناك API key، نستخدم بيانات تجريبية
                if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY.includes('YOUR_API_KEY')) {
                    console.log('📺 Using fallback video data (no API key)');
                    const fallbackVideos = [
                        { id: "video1", title: "مقدمة الدورة", youtubeId: "8BlRT7Ktw1c", duration: "10:00" },
                        { id: "video2", title: "الدرس الأول", youtubeId: "0Kr1eh1wwb8", duration: "15:30" },
                        { id: "video3", title: "الدرس الثاني", youtubeId: "Rd6F5wHIysM", duration: "12:45" },
                        { id: "video4", title: "الدرس الثالث", youtubeId: "DV0Ln7HRyJQ", duration: "18:20" },
                        { id: "video5", title: "المشروع النهائي", youtubeId: "X_P8xsiSB90", duration: "22:10" }
                    ];
                    playlistCache.set(playlistId, fallbackVideos);
                    return fallbackVideos;
                }

                console.log(`🎯 Fetching ALL videos for playlist: ${playlistId}`);
                
                let allVideos = [];
                let nextPageToken = null;
                let pageCount = 0;
                let totalVideosFetched = 0;

                do {
                    pageCount++;
                    console.log(`📄 Fetching page ${pageCount} for playlist ${playlistId}`);
                    
                    // بناء رابط الطلب مع pageToken إذا موجود
                    let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}`;
                    
                    if (nextPageToken) {
                        url += `&pageToken=${nextPageToken}`;
                    }
                    
                    const response = await fetch(url);
                    
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    
                    const data = await response.json();
                    
                    if (data.items && data.items.length > 0) {
                        const pageVideos = data.items.map(item => ({
                            id: item.snippet.resourceId.videoId,
                            title: item.snippet.title,
                            youtubeId: item.snippet.resourceId.videoId,
                            duration: "10:00"
                        }));
                        
                        allVideos = [...allVideos, ...pageVideos];
                        totalVideosFetched += pageVideos.length;
                        console.log(`✅ Page ${pageCount}: Loaded ${pageVideos.length} videos (Total: ${totalVideosFetched})`);
                    } else {
                        console.log(`❌ No videos found on page ${pageCount}`);
                    }
                    
                    nextPageToken = data.nextPageToken;
                    
                    // إضافة تأخير لتجنب تجاوز حدود API
                    if (nextPageToken) {
                        await new Promise(resolve => setTimeout(resolve, 100));
                    }
                    
                } while (nextPageToken);
                
                console.log(`🎉 Successfully loaded ${allVideos.length} videos from playlist ${playlistId}`);
                
                // تخزين النتائج في الذاكرة المؤقتة
                playlistCache.set(playlistId, allVideos);
                
                return allVideos;
            } catch (error) {
                console.error("❌ Error fetching playlist videos:", error);
                
                // استخدام بيانات احتياطية في حالة الفشل
                const fallbackVideos = [
                    { id: "video1", title: "مقدمة الدورة", youtubeId: "X_P8xsiSB90", duration: "10:00" },
                    { id: "video2", title: "الدرس الأول", youtubeId: "8BlRT7Ktw1c", duration: "15:30" },
                    { id: "video3", title: "الدرس الثاني", youtubeId: "0Kr1eh1wwb8", duration: "12:45" },
                    { id: "video4", title: "الدرس الثالث", youtubeId: "Rd6F5wHIysM", duration: "18:20" },
                    { id: "video5", title: "المشروع النهائي", youtubeId: "DV0Ln7HRyJQ", duration: "22:10" }
                ];
                
                playlistCache.set(playlistId, fallbackVideos);
                return fallbackVideos;
            }
        }

        // ===== نظام الإشعارات - محسن =====
        function showNotification(title, message, type = 'success') {
            const notificationContainer = document.getElementById('notification-container');
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            
            const icon = type === 'success' ? 'fas fa-check-circle' : 
                         type === 'error' ? 'fas fa-exclamation-circle' : 
                         type === 'warning' ? 'fas fa-exclamation-triangle' :
                         'fas fa-info-circle';
            
            notification.innerHTML = `
                <div class="notification-icon">
                    <i class="${icon}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">${title}</div>
                    <div class="notification-message">${message}</div>
                </div>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            notificationContainer.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('show');
            }, 100);
            
            const closeBtn = notification.querySelector('.notification-close');
            closeBtn.addEventListener('click', () => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 400);
            });
            
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

        // ===== وظائف الأمان =====
        function escapeHtml(text) {
            const map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };
            return text.replace(/[&<>"']/g, function(m) { return map[m]; });
        }

        // ===== دالة تنسيق الأرقام بالفاصلة =====
        function formatNumber(number) {
            return Number(number).toLocaleString();
        }

        // ===== إدارة الدورات =====
        function getCategoryName(category) {
            const categories = {
                'programming': 'برمجة',
                'design': 'تصميم',
                'business': 'أعمال',
                'language': 'لغات',
                'ai': 'ذكاء اصطناعي',
                'marketing': 'تسويق',
                'cybersecurity': 'أمن المعلومات',
                'data_science': 'علوم البيانات'
            };
            return categories[category] || category;
        }

        // ===== وظائف العرض =====
        // ===== وظائف العرض =====
// إنشاء أزرار التصنيفات ديناميكياً - معدل لمنع التكرار
async function createCategoryFilters() {
    const categoriesContainer = document.getElementById('category-filters');
    const courses = await fetchCoursesFromSupabase();
    
    // استخراج التصنيفات الفريدة من بيانات الدورات باستخدام Set
    const uniqueCategories = [...new Set(courses.map(course => course.category))];
    
    // بناء HTML جديد كامل بدلاً من الإضافة التدريجية
    let categoriesHTML = `
        <button class="category-filter active" data-category="all">جميع الدورات</button>
    `;
    
    // إضافة أزرار التصنيفات الأخرى بشكل فريد
    uniqueCategories.forEach(category => {
        if (category) { // التأكد من أن التصنيف ليس فارغاً
            const categoryName = getCategoryName(category);
            categoriesHTML += `
                <button class="category-filter" data-category="${category}">${categoryName}</button>
            `;
        }
    });
    
    // تعيين الـ HTML الجديد كاملاً (هذا يحل مشكلة التكرار)
    categoriesContainer.innerHTML = categoriesHTML;
    
    // إعداد مستمعي الأحداث للتصنيفات الجديدة
    setupCategoryFilters();
    
    // تهيئة الكاروسيل بعد تحميل التصنيفات
    if (!categoryCarousel) {
        categoryCarousel = new CategoryCarousel();
    } else {
        categoryCarousel.reset();
    }
}

        // عرض الدورات في الصفحة الرئيسية
        async function renderCourses(category = 'all') {
            const container = document.getElementById('courses-container');
            
            // عرض حالة التحميل
            container.innerHTML = '<div class="loading"><i class="fas fa-spinner"></i> جاري تحميل الدورات...</div>';
            
            // جلب البيانات من Supabase أو البيانات الاحتياطية
            const coursesData = await fetchCoursesFromSupabase();
            const filteredCourses = category === 'all' 
                ? coursesData 
                : coursesData.filter(course => course.category === category);
            
            let coursesHTML = '';
            
            for (const course of filteredCourses) {
                const videos = await fetchPlaylistVideos(course.playlist_id);
                const firstVideo = videos[0];
                
                if (!firstVideo) continue;
                
                const isEnrolled = userManager.isEnrolled(course.id);
                const progressPercentage = progressSystem.getProgressPercentage(course.id);
                const courseProgress = progressSystem.getCourseProgress(course.id);
                const isCourseCompleted = progressSystem.isCourseCompleted(course.id);
                const hasCertificate = certificateManager.hasCertificateForCourse(course.id);
                
                const safeTitle = escapeHtml(course.title);
                const safeInstructor = escapeHtml(course.provider || "Skillzoy Academy");
                const safeDescription = escapeHtml(course.description);
                const instructorAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(course.provider || "المدرب")}&background=3b82f6&color=fff`;
                
                // تنسيق عدد الطلاب بالفاصلة
                const formattedStudents = formatNumber(course.students);
                
                coursesHTML += `
                <div class="course-card" data-course-id="${course.id}">
                    <div class="course-video-container">
                        <img src="https://img.youtube.com/vi/${firstVideo.youtubeId}/hqdefault.jpg" alt="${safeTitle}" loading="lazy" onerror="this.src='https://i.ibb.co/S49HKqjW/Picsart-25-09-27-12-30-45-516.jpg'">
                    </div>
                    <div class="course-content">
                        <span class="course-category">${getCategoryName(course.category)}</span>
                        <h3 class="course-title">${safeTitle}</h3>
                        <div class="course-instructor">
                            <img src="${instructorAvatar}" alt="${safeInstructor}" class="instructor-avatar">
                            <span class="instructor-name">${safeInstructor}</span>
                        </div>
                        <div class="course-meta">
                            <span><i class="far fa-clock"></i> ${course.duration}</span>
                            <span><i class="fas fa-signal"></i> ${course.level}</span>
                            <span><i class="fas fa-user-graduate"></i> ${formattedStudents}</span>
                            ${course.rating ? `<span><i class="fas fa-star" style="color: #ffc107;"></i> ${course.rating}/5</span>` : ''}
                        </div>
                        ${isEnrolled && progressPercentage > 0 ? `
                        <div class="progress-bar" style="margin-top: 10px;">
                            <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-top: 5px; color: var(--text-light);">
                            <span>${progressPercentage}% مكتمل</span>
                            <span>${courseProgress.completedVideos.length}/${courseProgress.totalVideos} فيديو</span>
                        </div>
                        ` : ''}
                        ${isCourseCompleted ? `
                        <div style="background: rgba(16, 185, 129, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px; border: 1px solid var(--success);">
                            <div style="display: flex; align-items: center; gap: 8px; color: var(--success);">
                                <i class="fas fa-check-circle"></i>
                                <span>مكتملة - جاهزة للشهادة</span>
                            </div>
                        </div>
                        ` : ''}
                        ${hasCertificate ? `
                        <div style="background: rgba(var(--accent-rgb), 0.1); padding: 10px; border-radius: 8px; margin-top: 10px; border: 1px solid var(--accent);">
                            <div style="display: flex; align-items: center; gap: 8px; color: var(--accent);">
                                <i class="fas fa-certificate"></i>
                                <span>لديك شهادة لهذه الدورة</span>
                            </div>
                        </div>
                        ` : ''}
                        <div class="course-actions">
                            ${isEnrolled ? 
                                `<button class="btn btn-success view-course-details" data-course-id="${course.id}">
                                    <i class="fas fa-play"></i> ${progressPercentage > 0 ? 'واصل التعلم' : 'ابدأ التعلم'}
                                </button>` :
                                `<button class="btn btn-primary enroll-course" data-course-id="${course.id}">
                                    <i class="fas fa-user-plus"></i> سجل في الدورة
                                </button>`
                            }
                            <button class="btn btn-outline watch-trailer" data-youtube-id="${firstVideo.youtubeId}">
                                <i class="fas fa-eye"></i> شاهد المقدمة
                            </button>
                        </div>
                    </div>
                </div>
                `;
            }
            
            container.innerHTML = coursesHTML;
            setupCourseEventListeners();
            
            // تحديث إحصائيات الدورات
            document.getElementById('courses-count').textContent = formatNumber(coursesData.length);
        }

        // عرض الدورات المسجلة في صفحة "دوراتي"
        async function renderMyCourses() {
            const container = document.getElementById('my-courses-container');
            const emptyState = document.getElementById('empty-my-courses');
            
            const coursesData = await fetchCoursesFromSupabase();
            const enrolledCourses = coursesData.filter(course => 
                userManager.isEnrolled(course.id)
            );
            
            if (enrolledCourses.length === 0) {
                container.innerHTML = '';
                emptyState.style.display = 'block';
                return;
            }
            
            emptyState.style.display = 'none';
            
            let coursesHTML = '';
            
            for (const course of enrolledCourses) {
                const videos = await fetchPlaylistVideos(course.playlist_id);
                const firstVideo = videos[0];
                
                if (!firstVideo) continue;
                
                const progressPercentage = progressSystem.getProgressPercentage(course.id);
                const courseProgress = progressSystem.getCourseProgress(course.id);
                const isCourseCompleted = progressSystem.isCourseCompleted(course.id);
                const hasCertificate = certificateManager.hasCertificateForCourse(course.id);
                
                const safeTitle = escapeHtml(course.title);
                const safeInstructor = escapeHtml(course.provider || "Skillzoy Academy");
                const instructorAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(course.provider || "المدرب")}&background=3b82f6&color=fff`;
                
                // تنسيق عدد الطلاب بالفاصلة
                const formattedStudents = formatNumber(course.students);
                
                coursesHTML += `
                <div class="course-card" data-course-id="${course.id}">
                    <div class="course-video-container">
                        <img src="https://img.youtube.com/vi/${firstVideo.youtubeId}/hqdefault.jpg" alt="${safeTitle}" loading="lazy" onerror="this.src='https://i.ibb.co/S49HKqjW/Picsart-25-09-27-12-30-45-516.jpg'">
                    </div>
                    <div class="course-content">
                        <span class="course-category">${getCategoryName(course.category)}</span>
                        <h3 class="course-title">${safeTitle}</h3>
                        <div class="course-instructor">
                            <img src="${instructorAvatar}" alt="${safeInstructor}" class="instructor-avatar">
                            <span class="instructor-name">${safeInstructor}</span>
                        </div>
                        <div class="course-meta">
                            <span><i class="far fa-clock"></i> ${course.duration}</span>
                            <span><i class="fas fa-signal"></i> ${course.level}</span>
                            <span><i class="fas fa-user-graduate"></i> ${formattedStudents}</span>
                        </div>
                        <div class="progress-bar" style="margin-top: 10px;">
                            <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-top: 5px; color: var(--text-light);">
                            <span>${progressPercentage}% مكتمل</span>
                            <span>${courseProgress.completedVideos.length}/${courseProgress.totalVideos} فيديو</span>
                        </div>
                        ${isCourseCompleted ? `
                        <div style="background: rgba(16, 185, 129, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px; border: 1px solid var(--success);">
                            <div style="display: flex; align-items: center; gap: 8px; color: var(--success);">
                                <i class="fas fa-check-circle"></i>
                                <span>مكتملة - جاهزة للشهادة</span>
                            </div>
                        </div>
                        ` : ''}
                        ${hasCertificate ? `
                        <div style="background: rgba(var(--accent-rgb), 0.1); padding: 10px; border-radius: 8px; margin-top: 10px; border: 1px solid var(--accent);">
                            <div style="display: flex; align-items: center; gap: 8px; color: var(--accent);">
                                <i class="fas fa-certificate"></i>
                                <span>لديك شهادة لهذه الدورة</span>
                            </div>
                        </div>
                        ` : ''}
                        <div class="course-actions">
                            <button class="btn btn-success view-course-details" data-course-id="${course.id}">
                                <i class="fas fa-play"></i> ${progressPercentage > 0 ? 'واصل التعلم' : 'ابدأ التعلم'}
                            </button>
                            <button class="btn btn-danger unenroll-course" data-course-id="${course.id}">
                                <i class="fas fa-times"></i> إلغاء التسجيل
                            </button>
                        </div>
                    </div>
                </div>
                `;
            }
            
            container.innerHTML = coursesHTML;
            setupCourseEventListeners();
        }

        // عرض صفحة تفاصيل الدورة - محسنة
        async function renderCourseDetails(courseId) {
            console.log('renderCourseDetails called with courseId:', courseId);
            
            const coursesData = await fetchCoursesFromSupabase();
            const course = coursesData.find(c => c.id === courseId);
            
            if (!course) {
                console.error('Course not found:', courseId);
                showNotification('خطأ', 'الدورة غير موجودة', 'error');
                return;
            }
            
            console.log('Found course:', course);
            
            const videos = await fetchPlaylistVideos(course.playlist_id);
            
            // تحديث عدد الفيديوهات الإجمالي
            progressSystem.setTotalVideos(courseId, videos.length);
            
            const safeTitle = escapeHtml(course.title);
            const safeDescription = escapeHtml(course.description);
            const safeInstructor = escapeHtml(course.provider || "Skillzoy Academy");
            
            document.getElementById('course-details-title').textContent = safeTitle;
            document.getElementById('course-details-description').textContent = safeDescription;
            document.getElementById('course-total-duration').textContent = course.duration;
            document.getElementById('course-level-text').textContent = course.level;
            document.getElementById('course-instructor').textContent = safeInstructor;
            document.getElementById('course-videos-text').textContent = `${videos.length} فيديو`;
            
            // تحديث قسم معلومات الدورة
            document.getElementById('course-videos-count').textContent = videos.length;
            document.getElementById('course-total-hours').textContent = course.duration.split(' ')[0]; // استخراج عدد الساعات فقط
            document.getElementById('course-level').textContent = course.level;

            const videosContainer = document.getElementById('course-videos-container');
            
            let videosHTML = '';
            videos.forEach((video, index) => {
                const isCompleted = progressSystem.isVideoCompleted(courseId, video.id);
                const safeVideoTitle = escapeHtml(video.title);
                
                videosHTML += `
                <div class="video-item">
                    <div class="video-thumbnail" data-youtube-id="${video.youtubeId}" data-video-id="${video.id}">
                        <img src="https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg" alt="${safeVideoTitle}" loading="lazy" onerror="this.src='https://i.ibb.co/S49HKqjW/Picsart-25-09-27-12-30-45-516.jpg'">
                        <span class="video-duration">${video.duration}</span>
                        <div class="video-play-icon">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <div class="video-info">
                        <div class="video-title">${safeVideoTitle}</div>
                        <div class="video-meta">
                            <span>مدة الفيديو: ${video.duration}</span>
                            <button class="btn ${isCompleted ? 'btn-success' : 'btn-primary'} watch-video-btn" 
                                    data-youtube-id="${video.youtubeId}" 
                                    data-video-id="${video.id}"
                                    data-video-title="${safeVideoTitle}"
                                    data-course-id="${courseId}">
                                <i class="fas ${isCompleted ? 'fa-check' : 'fa-play'}"></i> ${isCompleted ? 'تم المشاهدة' : 'شاهد'}
                            </button>
                        </div>
                    </div>
                </div>
                `;
            });
            
            videosContainer.innerHTML = videosHTML;
            setupVideoEventListeners();
            
            // التحقق مما إذا كانت الدورة مكتملة وعرض قسم الشهادة
            const isCourseCompleted = progressSystem.isCourseCompleted(courseId);
            const hasCertificate = certificateManager.hasCertificateForCourse(courseId);
            const certificateSection = document.getElementById('certificate-section');
            
            if (isCourseCompleted) {
                certificateSection.style.display = 'block';
                
                // تحديث زر الحصول على الشهادة المجانية
                const getFreeCertificateBtn = document.getElementById('get-free-certificate-btn');
                
                if (hasCertificate) {
                    getFreeCertificateBtn.innerHTML = '<i class="fas fa-certificate"></i> عرض الشهادة';
                    getFreeCertificateBtn.onclick = () => {
                        const certificate = certificateManager.getUserCertificates().find(cert => cert.courseId === courseId);
                        if (certificate) {
                            certificateManager.displayCertificate(certificate);
                        }
                    };
                } else {
                    getFreeCertificateBtn.innerHTML = '<i class="fas fa-certificate"></i> احصل على شهادة مجانية';
                    getFreeCertificateBtn.onclick = () => {
                        showCertificateForm(courseId, course.title);
                    };
                }
            } else {
                certificateSection.style.display = 'none';
            }
            
            // إظهار صفحة التفاصيل وإخفاء الآخرين
            document.querySelector('.home-page').style.display = 'none';
            document.querySelector('.my-courses-page').style.display = 'none';
            document.querySelector('.progress-page').style.display = 'none';
            document.querySelector('.certificates-page').style.display = 'none';
            document.querySelector('.settings-page').style.display = 'none';
            document.getElementById('course-details').style.display = 'block';
            
            console.log('Course details page rendered successfully');
        }

        // عرض صفحة التقدم
        async function renderProgressPage() {
            const statsContainer = document.getElementById('progress-stats');
            const coursesContainer = document.getElementById('progress-courses-container');
            
            const coursesData = await fetchCoursesFromSupabase();
            const enrolledCourses = coursesData.filter(course => 
                userManager.isEnrolled(course.id)
            );
            
            const stats = progressSystem.getOverallStats();
            
            statsContainer.innerHTML = `
                <div class="progress-stat-card">
                    <div class="progress-stat-icon">
                        <i class="fas fa-trophy"></i>
                    </div>
                    <div class="progress-stat-number">${stats.overallProgress}%</div>
                    <div class="progress-stat-label">التقدم الإجمالي</div>
                </div>
                <div class="progress-stat-card">
                    <div class="progress-stat-icon">
                        <i class="fas fa-book"></i>
                    </div>
                    <div class="progress-stat-number">${stats.totalCourses}</div>
                    <div class="progress-stat-label">الدورات المسجلة</div>
                </div>
                <div class="progress-stat-card">
                    <div class="progress-stat-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="progress-stat-number">${stats.completedCourses}</div>
                    <div class="progress-stat-label">الدورات المكتملة</div>
                </div>
                <div class="progress-stat-card">
                    <div class="progress-stat-icon">
                        <i class="fas fa-play-circle"></i>
                    </div>
                    <div class="progress-stat-number">${stats.completedVideos}/${stats.totalVideos}</div>
                    <div class="progress-stat-label">الفيديوهات المشاهدة</div>
                </div>
            `;
            
            // عرض تقدم الدورات
            let coursesHTML = '';
            
            enrolledCourses.forEach(course => {
                const progressPercentage = progressSystem.getProgressPercentage(course.id);
                const courseProgress = progressSystem.getCourseProgress(course.id);
                const isCourseCompleted = progressSystem.isCourseCompleted(course.id);
                
                coursesHTML += `
                <div class="progress-course-card">
                    <div class="progress-course-title">${escapeHtml(course.title)}</div>
                    <div class="progress-course-bar">
                        <div class="progress-course-fill" style="width: ${progressPercentage}%"></div>
                    </div>
                    <div class="progress-course-percentage">
                        ${progressPercentage}% مكتمل (${courseProgress.completedVideos.length}/${courseProgress.totalVideos} فيديو)
                        ${isCourseCompleted ? ' - <span style="color: var(--success);">مكتملة</span>' : ''}
                    </div>
                </div>
                `;
            });
            
            coursesContainer.innerHTML = coursesHTML;
        }

        // عرض صفحة الشهادات
        function renderCertificatesPage() {
            const container = document.getElementById('certificates-container');
            const emptyState = document.getElementById('empty-certificates');
            
            const certificates = certificateManager.getUserCertificates();
            
            if (certificates.length === 0) {
                container.innerHTML = '';
                emptyState.style.display = 'block';
                return;
            }
            
            emptyState.style.display = 'none';
            
            let certificatesHTML = '';
            
            certificates.forEach(certificate => {
                certificatesHTML += `
                <div class="course-card">
                    <div class="course-content">
                        <span class="course-category">شهادة</span>
                        <h3 class="course-title">${escapeHtml(certificate.courseTitle)}</h3>
                        <div class="course-instructor">
                            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(certificate.studentName)}&background=3b82f6&color=fff" 
                                 alt="${escapeHtml(certificate.studentName)}" class="instructor-avatar">
                            <span class="instructor-name">${escapeHtml(certificate.studentName)}</span>
                        </div>
                        <div class="course-meta">
                            <span><i class="fas fa-calendar"></i> ${certificate.issueDate}</span>
                            <span><i class="fas fa-id-card"></i> ${certificate.id}</span>
                        </div>
                        <div class="course-actions">
                            <button class="btn btn-success view-certificate" data-certificate-id="${certificate.id}">
                                <i class="fas fa-eye"></i> عرض الشهادة
                            </button>
                            <button class="btn btn-primary download-certificate" data-certificate-id="${certificate.id}">
                                <i class="fas fa-download"></i> تحميل
                            </button>
                        </div>
                    </div>
                </div>
                `;
            });
            
            container.innerHTML = certificatesHTML;
            
            // إضافة مستمعي الأحداث للشهادات
            document.querySelectorAll('.view-certificate').forEach(button => {
                button.addEventListener('click', (e) => {
                    const certificateId = e.target.getAttribute('data-certificate-id');
                    const certificate = certificateManager.getCertificate(certificateId);
                    if (certificate) {
                        certificateManager.displayCertificate(certificate);
                    }
                });
            });
            
            document.querySelectorAll('.download-certificate').forEach(button => {
                button.addEventListener('click', (e) => {
                    const certificateId = e.target.getAttribute('data-certificate-id');
                    const certificate = certificateManager.getCertificate(certificateId);
                    if (certificate) {
                        certificateManager.displayCertificate(certificate);
                        // سيتم تحميلها من خلال أزرار التحميل في نافذة العرض
                    }
                });
            });
        }

        // ===== إدارة الثيم =====
        function toggleTheme() {
            themeManager.toggleMode();
        }

        function loadTheme() {
            themeManager.init();
        }

        // ===== إدارة الصفحات =====
        function showHomePage() {
            document.querySelector('.home-page').style.display = 'block';
            document.querySelector('.my-courses-page').style.display = 'none';
            document.querySelector('.progress-page').style.display = 'none';
            document.querySelector('.certificates-page').style.display = 'none';
            document.querySelector('.settings-page').style.display = 'none';
            document.getElementById('course-details').style.display = 'none';
            
            // تحديث النشط في الشريط الجانبي
            updateActiveNavLink('home');
        }

        function showMyCoursesPage() {
            document.querySelector('.home-page').style.display = 'none';
            document.querySelector('.my-courses-page').style.display = 'block';
            document.querySelector('.progress-page').style.display = 'none';
            document.querySelector('.certificates-page').style.display = 'none';
            document.querySelector('.settings-page').style.display = 'none';
            document.getElementById('course-details').style.display = 'none';
            renderMyCourses();
            
            // تحديث النشط في الشريط الجانبي
            updateActiveNavLink('my-courses');
        }

        function showProgressPage() {
            document.querySelector('.home-page').style.display = 'none';
            document.querySelector('.my-courses-page').style.display = 'none';
            document.querySelector('.progress-page').style.display = 'block';
            document.querySelector('.certificates-page').style.display = 'none';
            document.querySelector('.settings-page').style.display = 'none';
            document.getElementById('course-details').style.display = 'none';
            renderProgressPage();
            
            // تحديث النشط في الشريط الجانبي
            updateActiveNavLink('progress');
        }

        function showCertificatesPage() {
            document.querySelector('.home-page').style.display = 'none';
            document.querySelector('.my-courses-page').style.display = 'none';
            document.querySelector('.progress-page').style.display = 'none';
            document.querySelector('.certificates-page').style.display = 'block';
            document.querySelector('.settings-page').style.display = 'none';
            document.getElementById('course-details').style.display = 'none';
            renderCertificatesPage();
            
            // تحديث النشط في الشريط الجانبي
            updateActiveNavLink('certificates');
        }

        function showSettingsPage() {
            document.querySelector('.home-page').style.display = 'none';
            document.querySelector('.my-courses-page').style.display = 'none';
            document.querySelector('.progress-page').style.display = 'none';
            document.querySelector('.certificates-page').style.display = 'none';
            document.querySelector('.settings-page').style.display = 'block';
            document.getElementById('course-details').style.display = 'none';
            
            // تحديث النشط في الشريط الجانبي
            updateActiveNavLink('settings');
        }

        // تحديث العنصر النشط في الشريط الجانبي
        function updateActiveNavLink(page) {
            // إزالة الفئة النشطة من جميع الروابط
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            // إضافة الفئة النشطة للرابط المحدد
            const activeLink = document.querySelector(`.nav-link[data-page="${page}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }

        // ===== إدارة الفيديو =====
        function openVideoPlayer(youtubeId, videoTitle) {
            const videoPlayer = document.getElementById('video-player');
            const videoFrame = document.getElementById('video-frame');
            
            videoFrame.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`;
            videoPlayer.style.display = 'flex';
            
            document.body.style.overflow = 'hidden';
        }

        function closeVideoPlayer() {
            const videoPlayer = document.getElementById('video-player');
            const videoFrame = document.getElementById('video-frame');
            
            videoPlayer.style.display = 'none';
            videoFrame.src = '';
            
            document.body.style.overflow = 'auto';
        }

        // ===== إدارة الشهادات =====
        function showCertificateForm(courseId, courseTitle) {
            document.getElementById('certificate-form-container').style.display = 'flex';
            
            // حفظ بيانات الدورة مؤقتاً
            document.getElementById('certificate-form-container').dataset.courseId = courseId;
            document.getElementById('certificate-form-container').dataset.courseTitle = courseTitle;
        }

        function closeCertificateForm() {
            document.getElementById('certificate-form-container').style.display = 'none';
            document.getElementById('student-name').value = '';
        }

        function closeCertificate() {
            document.getElementById('certificate-container').style.display = 'none';
        }

        async function generateCertificate() {
            const studentName = document.getElementById('student-name').value.trim();
            const courseId = document.getElementById('certificate-form-container').dataset.courseId;
            const courseTitle = document.getElementById('certificate-form-container').dataset.courseTitle;
            
            if (!studentName) {
                showNotification('خطأ', 'يرجى إدخال اسمك الكامل', 'error');
                return;
            }
            
            // إنشاء الشهادة
            const certificate = certificateManager.createCertificate(courseId, courseTitle, studentName);
            
            // عرض الشهادة
            certificateManager.displayCertificate(certificate);
            
            // إغلاق نموذج الإدخال
            closeCertificateForm();
            
            showNotification('مبروك!', 'تم إنشاء شهادتك بنجاح', 'success');
            
            // تحديث صفحة الشهادات إذا كانت مفتوحة
            if (document.querySelector('.certificates-page').style.display === 'block') {
                renderCertificatesPage();
            }
            
            // تحديث صفحة تفاصيل الدورة إذا كانت مفتوحة
            if (document.getElementById('course-details').style.display === 'block') {
                renderCourseDetails(courseId);
            }
        }

        // ===== إعداد مستمعي الأحداث =====
        function setupCourseEventListeners() {
            document.querySelectorAll('.enroll-course').forEach(button => {
                button.addEventListener('click', (e) => {
                    const courseId = parseInt(e.target.getAttribute('data-course-id'));
                    if (userManager.enrollInCourse(courseId)) {
                        showNotification('تم التسجيل بنجاح', 'تم تسجيلك في الدورة بنجاح!', 'success');
                        renderCourses();
                    } else {
                        showNotification('معلومة', 'أنت مسجل بالفعل في هذه الدورة.', 'warning');
                    }
                });
            });

            document.querySelectorAll('.unenroll-course').forEach(button => {
                button.addEventListener('click', (e) => {
                    const courseId = parseInt(e.target.getAttribute('data-course-id'));
                    if (userManager.unenrollFromCourse(courseId)) {
                        showNotification('تم إلغاء التسجيل', 'تم إلغاء تسجيلك من الدورة.', 'info');
                        renderMyCourses();
                        renderCourses();
                    }
                });
            });

            document.querySelectorAll('.view-course-details').forEach(button => {
                button.addEventListener('click', (e) => {
                    const courseId = parseInt(e.target.getAttribute('data-course-id'));
                    renderCourseDetails(courseId);
                });
            });

            document.querySelectorAll('.watch-trailer').forEach(button => {
                button.addEventListener('click', (e) => {
                    const youtubeId = e.target.getAttribute('data-youtube-id');
                    openVideoPlayer(youtubeId, 'مقدمة الدورة');
                });
            });
        }

        function setupVideoEventListeners() {
            document.querySelectorAll('.watch-video-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const youtubeId = e.target.getAttribute('data-youtube-id');
                    const videoId = e.target.getAttribute('data-video-id');
                    const videoTitle = e.target.getAttribute('data-video-title');
                    const courseId = parseInt(e.target.getAttribute('data-course-id'));
                    
                    openVideoPlayer(youtubeId, videoTitle);
                    
                    // بدء تتبع مشاهدة الفيديو
                    progressSystem.startVideoTracking(courseId, videoId);
                    
                    // عند إغلاق الفيديو، إيقاف التتبع وتسجيل الفيديو كمكتمل
                    const closeVideo = document.getElementById('close-video');
                    const videoPlayer = document.getElementById('video-player');
                    
                    const closeHandler = () => {
                        progressSystem.stopVideoTracking(courseId, videoId);
                        progressSystem.markVideoCompleted(courseId, videoId);
                        
                        // تحديث الواجهة
                        const watchBtn = document.querySelector(`.watch-video-btn[data-video-id="${videoId}"]`);
                        if (watchBtn) {
                            watchBtn.innerHTML = '<i class="fas fa-check"></i> تم المشاهدة';
                            watchBtn.classList.remove('btn-primary');
                            watchBtn.classList.add('btn-success');
                        }
                        
                        // إعادة تحميل صفحات التقدم إذا كانت مفتوحة
                        if (document.querySelector('.progress-page').style.display === 'block') {
                            renderProgressPage();
                        }
                        if (document.querySelector('.my-courses-page').style.display === 'block') {
                            renderMyCourses();
                        }
                        
                        // التحقق مما إذا كانت الدورة اكتملت
                        if (progressSystem.isCourseCompleted(courseId)) {
                            // تحديث صفحة تفاصيل الدورة إذا كانت مفتوحة
                            if (document.getElementById('course-details').style.display === 'block') {
                                renderCourseDetails(courseId);
                            }
                        }
                        
                        closeVideo.removeEventListener('click', closeHandler);
                        videoPlayer.removeEventListener('click', outsideHandler);
                    };
                    
                    const outsideHandler = (e) => {
                        if (e.target.id === 'video-player') {
                            progressSystem.stopVideoTracking(courseId, videoId);
                            progressSystem.markVideoCompleted(courseId, videoId);
                            
                            // تحديث الواجهة
                            const watchBtn = document.querySelector(`.watch-video-btn[data-video-id="${videoId}"]`);
                            if (watchBtn) {
                                watchBtn.innerHTML = '<i class="fas fa-check"></i> تم المشاهدة';
                                watchBtn.classList.remove('btn-primary');
                                watchBtn.classList.add('btn-success');
                            }
                            
                            // إعادة تحميل صفحات التقدم إذا كانت مفتوحة
                            if (document.querySelector('.progress-page').style.display === 'block') {
                                renderProgressPage();
                            }
                            if (document.querySelector('.my-courses-page').style.display === 'block') {
                                renderMyCourses();
                            }
                            
                            // التحقق مما إذا كانت الدورة اكتملت
                            if (progressSystem.isCourseCompleted(courseId)) {
                                // تحديث صفحة تفاصيل الدورة إذا كانت مفتوحة
                                if (document.getElementById('course-details').style.display === 'block') {
                                    renderCourseDetails(courseId);
                                }
                            }
                            
                            closeVideo.removeEventListener('click', closeHandler);
                            videoPlayer.removeEventListener('click', outsideHandler);
                        }
                    };
                    
                    closeVideo.addEventListener('click', closeHandler);
                    videoPlayer.addEventListener('click', outsideHandler);
                });
            });

            document.getElementById('back-to-courses').addEventListener('click', (e) => {
                e.preventDefault();
                showHomePage();
            });
        }

        function setupCategoryFilters() {
            document.querySelectorAll('.category-filter').forEach(filter => {
                filter.addEventListener('click', (e) => {
                    document.querySelectorAll('.category-filter').forEach(f => {
                        f.classList.remove('active');
                    });
                    
                    e.target.classList.add('active');
                    
                    const category = e.target.getAttribute('data-category');
                    renderCourses(category);
                });
            });
        }

        function setupSettingsEventListeners() {
            // إعدادات الثيم
            document.getElementById('dark-mode-toggle').addEventListener('change', (e) => {
                if (e.target.checked) {
                    document.body.classList.add('light-theme');
                    document.getElementById('theme-icon').classList.remove('fa-toggle-off');
                    document.getElementById('theme-icon').classList.add('fa-toggle-on');
                    localStorage.setItem('mode', 'light');
                } else {
                    document.body.classList.remove('light-theme');
                    document.getElementById('theme-icon').classList.remove('fa-toggle-on');
                    document.getElementById('theme-icon').classList.add('fa-toggle-off');
                    localStorage.setItem('mode', 'dark');
                }
            });

            // إعدادات اللغة
            document.getElementById('language-select').addEventListener('change', (e) => {
                const selectedLanguage = e.target.value;
                languageManager.changeLanguage(selectedLanguage);
            });

            // زر تسجيل الخروج
            document.getElementById('logout-btn').addEventListener('click', () => {
                if(confirm('هل تريد تسجيل الخروج؟')) {
                    showNotification('تم تسجيل الخروج', 'تم تسجيل خروجك بنجاح', 'info');
                }
            });
        }

        function setupLanguageToggle() {
            document.getElementById('language-toggle').addEventListener('click', () => {
                const currentLang = languageManager.getCurrentLanguage();
                const newLang = currentLang === 'ar' ? 'en' : 'ar';
                languageManager.changeLanguage(newLang);
            });
        }

        function setupColorThemeButtons() {
            document.querySelectorAll('.color-theme-option').forEach(button => {
                button.addEventListener('click', (e) => {
                    const theme = e.currentTarget.getAttribute('data-theme');
                    themeManager.changeTheme(theme);
                });
            });
        }

        function setupStatsAnimation() {
            const studentsCount = document.getElementById('students-count');
            const coursesCount = document.getElementById('courses-count');
            const certificatesCount = document.getElementById('certificates-count');
            const instructorsCount = document.getElementById('instructors-count');
            
            const targetStudents = 789279;
            const targetCourses = 4; // سيتم تحديثها ديناميكياً
            const targetCertificates = 8500;
            const targetInstructors = 1249;
            
            let currentStudents = 0;
            let currentCourses = 0;
            let currentCertificates = 0;
            let currentInstructors = 0;
            
            const duration = 2000;
            const interval = 20;
            const steps = duration / interval;
            
            const studentsStep = targetStudents / steps;
            const certificatesStep = targetCertificates / steps;
            const instructorsStep = targetInstructors / steps;
            
            const timer = setInterval(() => {
                currentStudents += studentsStep;
                currentCertificates += certificatesStep;
                currentInstructors += instructorsStep;
                
                if (currentStudents >= targetStudents) {
                    currentStudents = targetStudents;
                    currentCertificates = targetCertificates;
                    currentInstructors = targetInstructors;
                    clearInterval(timer);
                }
                
                studentsCount.textContent = formatNumber(Math.floor(currentStudents));
                certificatesCount.textContent = formatNumber(Math.floor(currentCertificates));
                instructorsCount.textContent = formatNumber(Math.floor(currentInstructors));
            }, interval);
        }

        // ===== تهيئة التطبيق =====
        document.addEventListener('DOMContentLoaded', () => {
            loadTheme();
            languageManager.init();
            createCategoryFilters();
            renderCourses();
            setupStatsAnimation();
            setupSettingsEventListeners();
            setupLanguageToggle();
            setupColorThemeButtons();
            
            // إعداد الشريط الجانبي
            document.querySelector('.mobile-menu-btn').addEventListener('click', () => {
                document.querySelector('.sidebar').classList.toggle('active');
            });
            
            document.getElementById('close-video').addEventListener('click', closeVideoPlayer);
            
            document.getElementById('video-player').addEventListener('click', (e) => {
                if (e.target.id === 'video-player') {
                    closeVideoPlayer();
                }
            });

            document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

            // التنقل في الشريط الجانبي - محسن
            document.querySelectorAll('.nav-link[data-page]').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    const page = e.currentTarget.getAttribute('data-page');
                    
                    if (page === 'home') {
                        showHomePage();
                    } else if (page === 'my-courses') {
                        showMyCoursesPage();
                    } else if (page === 'progress') {
                        showProgressPage();
                    } else if (page === 'certificates') {
                        showCertificatesPage();
                    } else if (page === 'settings') {
                        showSettingsPage();
                    }
                    
                    if (window.innerWidth <= 992) {
                        document.querySelector('.sidebar').classList.remove('active');
                    }
                });
            });

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

            // إعداد الأزرار الإضافية
            document.getElementById('browse-courses-btn').addEventListener('click', () => {
                showHomePage();
            });

            document.getElementById('browse-my-courses-btn').addEventListener('click', () => {
                showMyCoursesPage();
            });
            
            // إعداد الشهادات
            document.getElementById('cancel-certificate').addEventListener('click', closeCertificateForm);
            document.getElementById('generate-certificate').addEventListener('click', generateCertificate);
            document.getElementById('close-certificate').addEventListener('click', closeCertificate);
            document.getElementById('download-certificate-png').addEventListener('click', () => {
                certificateManager.downloadAsImage();
            });
            document.getElementById('download-certificate-pdf').addEventListener('click', () => {
                certificateManager.downloadAsPDF();
            });
            
            // تحميل إعدادات المستخدم
            const savedLanguage = localStorage.getItem('language');
            if (savedLanguage) {
                document.getElementById('language-select').value = savedLanguage;
            }
            
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                themeManager.changeTheme(savedTheme);
            }
            
            const savedMode = localStorage.getItem('mode');
            if (savedMode === 'light') {
                document.getElementById('dark-mode-toggle').checked = true;
            }
            
            console.log('✅ Skillzoy Academy System Initialized Successfully');
            console.log('📊 Courses will be loaded from Supabase or fallback data');
            console.log('👤 Current User:', currentUser);
            console.log('📝 Certificate Manager:', certificateManager);
            console.log('🌐 Language Manager:', languageManager);
            console.log('🎨 Theme Manager:', themeManager);
            console.log('🔄 Category Carousel:', categoryCarousel);
        });
    </script>
