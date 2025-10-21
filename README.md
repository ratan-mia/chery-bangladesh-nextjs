# Chery Bangladesh - Official Website

A modern, responsive website for Chery Automobiles Bangladesh built with Next.js 15, featuring interactive car showcases, advanced animations, and comprehensive vehicle information.

## 🚗 Current Features

### **Core Website Features**

- **Hero Slider**: Dynamic homepage banner with latest vehicle showcases
- **Vehicle Models**: Dedicated pages for Tiggo 8 Pro, Tiggo 9 Pro, and Tiggo Cross
- **Interactive Hotspots**: 360° vehicle exploration with clickable feature highlights
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **SEO Optimized**: Meta tags, sitemap, and search engine optimization

### **Vehicle Showcase**

- **Detailed Specifications**: Comprehensive vehicle data with animations
- **Image Galleries**: High-quality vehicle photography and videos
- **Feature Presentations**: Interactive sliders and animated showcases
- **3D Visualizations**: Hotspot components for exterior/interior exploration
- **Color Variations**: Multiple color options with visual previews

### **User Engagement**

- **Test Drive Booking**: Online test drive scheduling system
- **Service Booking**: Appointment scheduling for vehicle maintenance
- **Brochure Downloads**: Digital brochure request and download system
- **Contact Forms**: Multiple contact points with validation
- **Emergency Assistance**: Roadside assistance request system

### **Content Management**

- **News Section**: Latest automotive news and announcements
- **About Pages**: Company information, CEO message, operations
- **Career Section**: Job opportunities and application system
- **Social Responsibility**: Environmental and community initiatives

### **Technical Features**

- **Zoho CRM Integration**: Lead management and customer data collection
- **Email Automation**: Nodemailer integration for notifications
- **MongoDB Database**: Data storage for inquiries and bookings
- **Google Analytics**: Visitor tracking and behavior analysis
- **Meta Pixel**: Facebook advertising pixel integration
- **Cookie Consent**: GDPR compliant cookie management

### **Animation & UX**

- **GSAP Animations**: Smooth, professional animations throughout
- **Framer Motion**: Page transitions and interactive elements
- **Swiper.js**: Touch-friendly sliders and carousels
- **Loading States**: Custom Chery-branded loading animations
- **Scroll Animations**: Parallax and scroll-triggered effects

## 🚀 Suggested Feature Enhancements

### **1. E-Commerce & Pricing Features**

- **💰 Price Calculator**: Interactive vehicle pricing with options and financing
- **🛒 Online Reservation**: Vehicle booking with deposit system
- **💳 Payment Gateway**: Integrate local payment methods (bKash, Rocket, Nagad)
- **📊 Financing Calculator**: EMI calculator with bank partnerships
- **🏷️ Promotional Offers**: Dynamic pricing and special deals management

### **2. Customer Experience Enhancements**

- **👥 Customer Portal**: Account creation for service history and bookings
- **📱 Mobile App Integration**: PWA features for app-like experience
- **🔔 Push Notifications**: Service reminders and promotional alerts
- **⭐ Review System**: Customer reviews and testimonials management
- **🎯 Personalization**: Recommended vehicles based on user preferences

### **3. Advanced Vehicle Features**

- **🔍 Advanced Search**: Filter by price, features, fuel type, etc.
- **📋 Comparison Tool**: Side-by-side vehicle comparison
- **🚗 Virtual Showroom**: 360° virtual tour of dealerships
- **📱 AR Experience**: Augmented reality vehicle visualization
- **🎨 Vehicle Configurator**: Custom color and feature selection

### **4. Service & Support Improvements**

- **📅 Service Scheduler**: Real-time slot booking with calendar integration
- **📍 Service Locator**: Interactive map with nearest service centers
- **📞 Live Chat**: Real-time customer support integration
- **📚 Knowledge Base**: FAQ, tutorials, and troubleshooting guides
- **🔧 Maintenance Reminders**: Automated service reminder system

### **5. Content & Marketing Features**

- **📰 Blog System**: SEO-optimized automotive blog
- **🎥 Video Gallery**: YouTube integration for promotional videos
- **📸 Customer Gallery**: User-generated content showcase
- **🏆 Awards Section**: Company achievements and recognitions
- **📈 Analytics Dashboard**: Admin panel with visitor insights

### **6. Localization & Accessibility**

- **🌐 Multi-language**: Bengali and English language support
- **♿ Accessibility**: WCAG 2.1 compliance for disabled users
- **🌙 Dark Mode**: Dark theme option for better user experience
- **📱 Offline Support**: PWA with offline functionality
- **🔍 Voice Search**: Voice-enabled search functionality

### **7. Business Intelligence Features**

- **📊 Lead Scoring**: AI-powered lead qualification system
- **📈 Sales Analytics**: Comprehensive sales and inquiry tracking
- **🎯 Marketing Automation**: Email campaigns and drip sequences
- **📱 CRM Integration**: Enhanced Zoho CRM features
- **💼 Dealer Portal**: Multi-dealer management system

### **8. Technical Improvements**

- **⚡ Performance**: Image optimization and lazy loading enhancements
- **🔒 Security**: Enhanced form validation and data protection
- **📱 PWA Features**: Push notifications and offline capabilities
- **🧪 A/B Testing**: Conversion optimization testing
- **📊 Monitoring**: Error tracking and performance monitoring

## 🛠️ Technology Stack

### **Frontend**

- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **GSAP**: Professional animation suite
- **Swiper.js**: Touch slider library

### **Backend & Database**

- **Next.js API Routes**: Serverless API endpoints
- **MongoDB**: NoSQL database with Mongoose ODM
- **Nodemailer**: Email sending service
- **Zoho CRM API**: Customer relationship management

### **Development Tools**

- **Turbopack**: Next.js development bundler
- **Prettier**: Code formatting
- **ESLint**: Code linting
- **Lucide React**: Icon library

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- MongoDB database
- Zoho CRM account
- Gmail SMTP credentials

### Installation

```bash
# Clone the repository
git clone https://github.com/ratan-mia/chery-bangladesh-nextjs.git

# Navigate to project directory
cd chery-bangladesh-nextjs

# Install dependencies
npm install

# Set up environment variables
cp envlocalzoho.txt .env.local

# Run development server
npm run dev
```

### Environment Variables

```env
# Zoho CRM Configuration
ZOHO_CLIENT_ID=your_zoho_client_id
ZOHO_CLIENT_SECRET=your_zoho_client_secret
ZOHO_ACCESS_TOKEN=your_access_token
ZOHO_REFRESH_TOKEN=your_refresh_token

# Email Configuration
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_app_password

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/cherybd
```

## 📱 API Endpoints

- `POST /api/test-drive` - Test drive booking
- `POST /api/book-service` - Service appointment booking
- `POST /api/contact` - General contact form
- `POST /api/send-brochure-request` - Brochure download request
- `POST /api/emergency-assistance` - Emergency roadside assistance
- `POST /api/roadside-assistance` - General roadside assistance
- `POST /api/send-application` - Career application submission

## 🎯 Priority Implementation Roadmap

### **Phase 1 (Immediate - 1-2 months)**

1. Price Calculator with EMI options
2. Enhanced Customer Portal
3. Mobile App (PWA) features
4. Advanced Search & Filters

### **Phase 2 (Short-term - 3-4 months)**

1. Payment Gateway Integration
2. Live Chat Support
3. Bengali Language Support
4. Service Scheduler Enhancement

### **Phase 3 (Medium-term - 6 months)**

1. AR Vehicle Visualization
2. Advanced Analytics Dashboard
3. Marketing Automation
4. Dealer Portal System

### **Phase 4 (Long-term - 12 months)**

1. AI-powered Recommendations
2. Voice Search Integration
3. Advanced CRM Features
4. Full E-commerce Platform

## 📄 License

This project is proprietary software owned by Asian MotorspeX Limited - the official distributor of Chery Automobiles in Bangladesh.

## 📞 Contact

- **Website**: [www.cherybd.com](http://www.cherybd.com)
- **Phone**: 09639-119977
- **WhatsApp**: 014099-60306
- **Email**: info@cherybd.com
- **Facebook**: [fb.com/CheryBDofficial](http://fb.com/CheryBDofficial)

---

**"ONE STEP AHEAD"** - Chery Bangladesh

_Built with ❤️ for the automotive future of Bangladesh_
