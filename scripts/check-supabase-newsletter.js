const { createClient } = require('@supabase/supabase-js');
const url = 'https://ojkemwxpklpnydjcyluf.supabase.co';
const anon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qa2Vtd3hwa2xwbnlkamN5bHVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMzQzOTcsImV4cCI6MjA5MzgxMDM5N30.CGjrDvJ8FVFfuc9abEPifuSQTocJFFQrA_CKcDt-WGc';
const supabase = createClient(url, anon);
(async () => {
  const posts = await supabase.from('posts').select('id').limit(1);
  console.log('posts', posts.error ? posts.error.message : 'ok', posts.data?.length);
  const newsletter = await supabase.from('newsletter_subscribers').select('id,email').limit(1);
  console.log('newsletter', newsletter.error ? newsletter.error.message : 'ok', newsletter.data?.length);
})();
