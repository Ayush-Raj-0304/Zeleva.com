# Email Setup Guide for Zeleva E-commerce

## 🚨 Current Issue
Password recovery and email receipts are not working because EmailJS is not properly configured or is only sending to your email.

## 📧 EmailJS Setup (Recommended for receipts)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Create a new service (Gmail/Outlook/Yahoo)

### Step 2: Create Email Template
Create a template with these variables:
```
Subject: Your Zeleva Order Confirmation #{{order_id}}

Hello {{customer_name}},

Thank you for your order! Your payment has been processed successfully.

Order Details:
- Order ID: {{order_id}}
- Total: {{order_total}}
- Date: {{order_date}}

Items:
{{items_list}}

Best regards,
Zeleva Team
```

### Step 3: Get Configuration Values
1. Service ID: From EmailJS dashboard > Services
2. Template ID: From EmailJS dashboard > Templates
3. User ID: From EmailJS dashboard > Account > API Keys

### Step 4: Add to .env file
```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_your_id
VITE_EMAILJS_TEMPLATE_ID=template_your_id
VITE_EMAILJS_USER_ID=user_your_id
```

## 🔥 Firebase Password Recovery Setup

### Step 1: Check Firebase Console
1. Go to Firebase Console > Authentication > Settings
2. Ensure your domain is authorized
3. Check if email/password sign-in is enabled

### Step 2: Verify Email Templates
1. Go to Firebase Console > Authentication > Templates
2. Customize the password reset email template
3. Ensure the sender email is verified

## 🧪 Testing

### Test Password Recovery:
1. Use a real email address (not test@zeleva.com)
2. Check browser console for detailed logs
3. Check spam folder for Firebase emails

### Test Email Receipts:
1. Check browser console for EmailJS logs
2. Verify EmailJS template variables match
3. Test with actual purchase

## 🔧 Debug Commands

```bash
# Check environment variables are loaded
console.log(import.meta.env.VITE_EMAILJS_SERVICE_ID);

# Check Firebase auth state
console.log(firebase.auth().currentUser);
```

## 📝 Notes
- EmailJS free plan has limited emails per month
- Firebase emails may go to spam initially
- Use real email addresses for testing
- Check browser console for detailed error logs

## 🆘 Common Issues

1. **EmailJS only sends to your email**: Check service configuration
2. **Password reset fails**: Verify Firebase domain authorization
3. **Emails go to spam**: Add Firebase/EmailJS to trusted senders
4. **Template variables empty**: Check variable names match exactly 