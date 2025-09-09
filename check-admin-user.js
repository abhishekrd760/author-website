const { createClient } = require('@supabase/supabase-js');

// Hardcode the values for testing
const supabaseUrl = 'https://zsqrkausciflkzyddkhk.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzcXJrYXVzY2lmbGt6eWRka2hrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Njk1MjQwMCwiZXhwIjoyMDcyNTI4NDAwfQ.3HBLldPZzKjpjOeKgkMR6ec93iMDQWufi9Hfcg23GvA';

console.log('🔧 Testing Supabase connection...');
console.log('URL:', supabaseUrl);
console.log('Service Key preview:', supabaseServiceKey?.substring(0, 20) + '...');

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkAdminUser() {
    try {
        console.log('\n🔍 Checking admin user in database...');
        
        const { data: adminUser, error } = await supabase
            .from('admin_users')
            .select('*')
            .eq('username', 'admin')
            .single();

        if (error) {
            console.error('❌ Database error:', error);
            return;
        }

        if (!adminUser) {
            console.log('❌ No admin user found with username "admin"');
            return;
        }

        console.log('✅ Admin user found:');
        console.log('ID:', adminUser.id);
        console.log('Username:', adminUser.username);
        console.log('Full Name:', adminUser.full_name);
        console.log('Role:', adminUser.role);
        console.log('Password Hash:', adminUser.password_hash);
        console.log('Created At:', adminUser.created_at);
        console.log('Last Login:', adminUser.last_login);

        // Test password verification
        const bcrypt = require('bcryptjs');
        const isValid = bcrypt.compareSync('admin123', adminUser.password_hash);
        console.log('\n🔑 Password verification test:');
        console.log('Is "admin123" valid for this hash?', isValid);

    } catch (error) {
        console.error('❌ Error checking admin user:', error);
    }
}

checkAdminUser();
