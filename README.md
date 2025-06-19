# Visitor Management System

A comprehensive visitor management system built with Next.js, MongoDB, and TypeScript. This system provides secure visitor tracking, approval workflows, and pre-registration capabilities for workplace security and compliance.

## Features

### 🔐 Authentication & Authorization
- Secure employee authentication with NextAuth.js
- Role-based access control (Admin, Employee, Security)
- Session management and protected routes

### 👥 Visitor Registration
- Complete visitor information capture
- Mandatory photo capture using webcam
- Real-time host notification system
- QR code generation for approved visitors

### ✅ Approval Workflow
- Instant email notifications to host employees
- Quick approve/reject functionality
- Dashboard-based visitor management
- Automated status tracking

### 📅 Pre-Registration System
- Schedule visitors in advance
- Time-window based access control
- Email notifications with QR codes
- Streamlined check-in process

### 📊 Analytics & Reporting
- Real-time visitor statistics
- Daily, weekly, and monthly reports
- Visitor traffic analytics
- Export capabilities

### 🔒 Security Features
- Photo verification for all visitors
- Audit trails for all actions
- Secure data encryption
- Access control management

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **UI Components**: Shadcn/UI, Tailwind CSS
- **Email**: Nodemailer
- **QR Codes**: qrcode library
- **Photo Capture**: react-webcam

## Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd visitor-management-system
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Fill in your environment variables:
   \`\`\`env
   # Database
   MONGODB_URI=mongodb://localhost:27017/visitor-management
   
   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   
   # Email Configuration
   EMAIL_SERVER_HOST=smtp.gmail.com
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER=your-email@gmail.com
   EMAIL_SERVER_PASSWORD=your-app-password
   EMAIL_FROM=your-email@gmail.com
   \`\`\`

4. **Set up MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Update the MONGODB_URI in your .env.local file

5. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### For Employees

1. **Register an Account**
   - Go to `/register` to create an employee account
   - Provide your name, email, department, and password

2. **Login**
   - Use `/login` to access your dashboard
   - View pending visitor approvals and manage visitors

3. **Pre-register Visitors**
   - Use the dashboard to schedule visitors in advance
   - Visitors receive email notifications with QR codes

### For Visitors

1. **Check-in Process**
   - Visit the main page and click "Visitor Check-in"
   - Fill out the registration form
   - Capture your photo using the webcam
   - Wait for host approval

2. **Pre-registered Visitors**
   - Use the QR code received via email
   - Quick check-in process at reception

### For Administrators

1. **Dashboard Access**
   - Full visibility of all visitors across departments
   - Advanced analytics and reporting
   - User management capabilities

2. **Security Features**
   - Monitor all visitor activities
   - Generate compliance reports
   - Manage system settings

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new employee
- `POST /api/auth/[...nextauth]` - NextAuth endpoints

### Visitors
- `GET /api/visitors` - Get visitors list
- `POST /api/visitors` - Create new visitor
- `GET /api/visitors/[id]` - Get visitor details
- `PUT /api/visitors/[id]` - Update visitor
- `DELETE /api/visitors/[id]` - Delete visitor
- `POST /api/visitors/[id]/approve` - Approve visitor
- `POST /api/visitors/[id]/reject` - Reject visitor
- `PUT /api/visitors/[id]/checkout` - Check out visitor


### Pre-registration
- `POST /api/pre-register` - Pre-register visitor

## Database Schema

### User Model
\`\`\`typescript
{
  name: string
  email: string (unique)
  password: string (hashed)
  department: enum
  role: enum ['admin', 'employee', 'security']
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
\`\`\`

### Visitor Model
\`\`\`typescript
{
  fullName: string
  email: string
  phone: string
  company?: string
  purpose: string
  hostEmail: string
  hostName?: string
  hostDepartment: string
  photoData?: string
  status: enum ['pending', 'approved', 'rejected', 'checked-out']
  checkInTime: Date
  checkOutTime?: Date
  approvedBy?: ObjectId
  rejectedBy?: ObjectId
  qrCode?: string
  isPreRegistered: boolean
  visitDate?: Date
  createdAt: Date
  updatedAt: Date
}
\`\`\`

## Security Considerations

1. **Data Protection**
   - All passwords are hashed using bcrypt
   - Sensitive data is encrypted in transit
   - Photo data is stored securely

2. **Access Control**
   - Role-based permissions
   - Protected API routes
   - Session-based authentication

3. **Audit Trail**
   - All visitor actions are logged
   - Approval/rejection tracking
   - Time-stamped records

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository or contact the development team.
