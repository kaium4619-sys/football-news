const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://ojkemwxpklpnydjcyluf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qa2Vtd3hwa2xwbnlkamN5bHVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMzQzOTcsImV4cCI6MjA5MzgxMDM5N30.CGjrDvJ8FVFfuc9abEPifuSQTocJFFQrA_CKcDt-WGc'
);

(async () => {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email: 'testanon@example.com' }])
      .select()
      .single();
    console.log('result', { data, error: error ? error.message : null });
    if (error) {
      console.log('error object', error);
    }
  } catch (err) {
    console.error('caught', err);
  }
})();
