<script type="module">
  import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

  // استبدل هذه القيم ببيانات مشروعك من Supabase
  const supabase = createClient(
    'https://<YOUR-PROJECT-REF>.supabase.co',
    '<YOUR-ANON-KEY>'
  );

  document.getElementById('google-login').addEventListener('click', async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://skillzoyacademy.netlify.app'
      }
    });

    if (error) {
      console.error('Login error:', error.message);
      alert('حدث خطأ أثناء تسجيل الدخول');
    }
  });
</script>
