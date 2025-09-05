import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
    try {
        const { name, email, message } = await request.json()

        // Validate input
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            )
        }

        // Create transporter (configure based on your email provider)
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        })

        // Email to author
        const authorMailOptions = {
            from: process.env.SMTP_USER,
            to: process.env.AUTHOR_EMAIL,
            subject: `New Contact Form Message from ${name}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #007bff;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            This message was sent from your author website contact form.
          </p>
        </div>
      `,
        }

        // Auto-reply to sender
        const replyMailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Thank you for your message - Jane Doe',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank you for reaching out!</h2>
          
          <p>Dear ${name},</p>
          
          <p>Thank you for taking the time to contact me through my website. I truly appreciate your message and will get back to you as soon as possible, usually within 24-48 hours.</p>
          
          <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Your message:</strong></p>
            <div style="font-style: italic; color: #555;">
              "${message}"
            </div>
          </div>
          
          <p>In the meantime, feel free to:</p>
          <ul>
            <li>Check out my <a href="${process.env.NEXT_PUBLIC_SITE_URL}/books" style="color: #007bff;">latest books</a></li>
            <li>Read what other readers are saying in the <a href="${process.env.NEXT_PUBLIC_SITE_URL}/reviews" style="color: #007bff;">reviews section</a></li>
            <li>Follow me on social media for updates and behind-the-scenes content</li>
          </ul>
          
          <p>Best regards,<br>
          <strong>Jane Doe</strong><br>
          <em>Author</em></p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">
            This is an automated response. Please do not reply to this email. 
            If you need immediate assistance, please visit <a href="${process.env.NEXT_PUBLIC_SITE_URL}" style="color: #007bff;">my website</a>.
          </p>
        </div>
      `,
        }

        // Send emails
        try {
            await transporter.sendMail(authorMailOptions)
            await transporter.sendMail(replyMailOptions)
        } catch (emailError) {
            console.error('Email sending failed:', emailError)
            // Don't fail the request if email fails - the contact form submission should still succeed
        }

        return NextResponse.json(
            { message: 'Message sent successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Contact form error:', error)
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        )
    }
}
