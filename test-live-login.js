// Test the live admin login API
async function testLiveLogin() {
    const url = 'https://lucent-elf-3dc4cd.netlify.app/api/admin/login';
    const credentials = {
        username: 'admin',
        password: 'admin123'
    };

    console.log('🔐 Testing live admin login API...');
    console.log('URL:', url);
    console.log('Credentials:', credentials);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });

        console.log('\n📊 Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));

        const data = await response.json();
        console.log('Response data:', data);

    } catch (error) {
        console.error('❌ Error testing login:', error);
    }
}

testLiveLogin();
