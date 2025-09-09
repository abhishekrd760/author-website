// Test a simple API route to see if any API routes work
async function testSimpleAPI() {
    const url = 'https://lucent-elf-3dc4cd.netlify.app/api/books';

    console.log('🧪 Testing simple API route...');
    console.log('URL:', url);

    try {
        const response = await fetch(url);
        console.log('\n📊 Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));

        if (response.ok) {
            const data = await response.json();
            console.log('Response data:', data);
        } else {
            const text = await response.text();
            console.log('Response text:', text.substring(0, 200) + '...');
        }

    } catch (error) {
        console.error('❌ Error testing API:', error);
    }
}

testSimpleAPI();
