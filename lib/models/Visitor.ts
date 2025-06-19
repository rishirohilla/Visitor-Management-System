import mongoose from "mongoose"

export interface IVisitor extends mongoose.Document {
  fullName: string
  email: string
  phone: string
  company?: string
  purpose: string
  hostEmail: string
  hostName?: string
  hostDepartment: string
  photoUrl?: string
  photoData?: string
  status: "pending" | "approved" | "rejected" | "checked-out"
  checkInTime: Date
  checkOutTime?: Date
  approvedBy?: mongoose.Types.ObjectId
  approvedAt?: Date
  rejectedBy?: mongoose.Types.ObjectId
  rejectedAt?: Date
  rejectionReason?: string
  qrCode?: string
  isPreRegistered: boolean
  preRegisteredBy?: mongoose.Types.ObjectId
  visitDate?: Date
  visitStartTime?: string
  visitEndTime?: string
  createdAt: Date
  updatedAt: Date
}

const VisitorSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    purpose: {
      type: String,
      required: [true, "Purpose of visit is required"],
      trim: true,
    },
    hostEmail: {
      type: String,
      required: [true, "Host email is required"],
      lowercase: true,
      trim: true,
    },
    hostName: {
      type: String,
      trim: true,
    },
    hostDepartment: {
      type: String,
      required: [true, "Host department is required"],
      enum: ["hr", "it", "finance", "marketing", "operations", "sales", "security"],
    },
    photoUrl: {
      type: String,
    },
    photoData: {
      type: String, // Base64 encoded image data
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "checked-out"],
      default: "pending",
    },
    checkInTime: {
      type: Date,
      default: Date.now,
    },
    checkOutTime: {
      type: Date,
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    approvedAt: {
      type: Date,
    },
    rejectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rejectedAt: {
      type: Date,
    },
    rejectionReason: {
      type: String,
      trim: true,
    },
    qrCode: {
      type: String,
    },
    isPreRegistered: {
      type: Boolean,
      default: false,
    },
    preRegisteredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    visitDate: {
      type: Date,
    },
    visitStartTime: {
      type: String,
    },
    visitEndTime: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

// Index for better query performance
VisitorSchema.index({ hostEmail: 1, status: 1 })
VisitorSchema.index({ checkInTime: -1 })
VisitorSchema.index({ email: 1, checkInTime: -1 })

export default mongoose.models.Visitor || mongoose.model<IVisitor>("Visitor", VisitorSchema)
