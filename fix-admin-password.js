const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zsqrkausciflkzyddkhk.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzcXJrYXVzY2lmbGt6eWRka2hrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Njk1MjQwMCwiZXhwIjoyMDcyNTI4NDAwfQ.3HBLldPZzKjpjOeKgkMR6ec93iMDQWufi9Hfcg23GvA';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixAdminPassword() {
    try {
        console.log('🔧 Fixing admin password...');

        // Generate new hash for 'admin123'
        const newPasswordHash = bcrypt.hashSync('admin123', 10);
        console.log('🔑 New password hash:', newPasswordHash);

        // Update the admin user with correct password hash
        const { data, error } = await supabase
            .from('admin_users')
            .update({
                password_hash: newPasswordHash,
                full_name: 'Kazutoshi Yoshida'
            })
            .eq('username', 'admin')
            .select();

        if (error) {
            console.error('❌ Error updating admin password:', error);
        } else {
            console.log('✅ Admin password updated successfully:', data);
        }

        // Verify the update
        const { data: adminUser, error: fetchError } = await supabase
            .from('admin_users')
            .select('*')
            .eq('username', 'admin')
            .single();

        if (fetchError) {
            console.error('❌ Error fetching admin user:', fetchError);
        } else {
            console.log('📊 Current admin user:', adminUser);

            // Test password verification
            const isValid = bcrypt.compareSync('admin123', adminUser.password_hash);
            console.log('🔐 Password verification test:', isValid ? '✅ SUCCESS' : '❌ FAILED');
        }

    } catch (error) {
        console.error('💥 Script error:', error);
    }
}

fixAdminPassword();
