import Link from 'next/link'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Author Info */}
                    <div className="md:col-span-2">
                        <h3 className="text-2xl font-bold mb-4">Kazutoshi Yoshida</h3>
                        <p className="text-gray-300 mb-4 max-w-md">
                            Bestselling author of captivating fiction novels. Follow my journey and discover stories that will touch your heart.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://twitter.com" className="text-gray-300 hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </a>
                            <a href="https://instagram.com" className="text-gray-300 hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.324-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.324c.896-.896 2.047-1.386 3.324-1.386s2.448.49 3.324 1.297c.807.807 1.297 1.958 1.297 3.255s-.49 2.448-1.297 3.324c-.876.807-2.027 1.297-3.324 1.297zm7.908-8.015c-.807 0-1.297-.49-1.297-1.297S15.55 6.379 16.357 6.379s1.297.49 1.297 1.297-.49 1.297-1.297 1.297z" />
                                </svg>
                            </a>
                            <a href="https://goodreads.com" className="text-gray-300 hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6 9h-5v5h5v-5z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
                            <li><Link href="/books" className="text-gray-300 hover:text-white transition-colors">Books</Link></li>
                            <li><Link href="/reviews" className="text-gray-300 hover:text-white transition-colors">Reviews</Link></li>
                            <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
                        <div className="space-y-2 text-gray-300">
                            <p>📧 jane@janedoeauthor.com</p>
                            <p>📍 New York, NY</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Kazutoshi Yoshida. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
