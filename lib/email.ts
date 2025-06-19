import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number.parseInt(process.env.EMAIL_SERVER_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

export async function sendVisitorNotification(
  hostEmail: string,
  hostName: string,
  visitorData: {
    fullName: string
    company?: string
    purpose: string
    checkInTime: string
  },
  visitorId: string,
) {
  const approvalUrl = `${process.env.NEXTAUTH_URL}/api/visitors/${visitorId}/approve`
  const rejectUrl = `${process.env.NEXTAUTH_URL}/api/visitors/${visitorId}/reject`

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: hostEmail,
    subject: `Visitor Approval Required - ${visitorData.fullName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Visitor Approval Required</h2>
        <p>Hello ${hostName},</p>
        <p>A visitor is waiting for your approval:</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Visitor Details</h3>
          <p><strong>Name:</strong> ${visitorData.fullName}</p>
          <p><strong>Company:</strong> ${visitorData.company || "Not specified"}</p>
          <p><strong>Purpose:</strong> ${visitorData.purpose}</p>
          <p><strong>Check-in Time:</strong> ${new Date(visitorData.checkInTime).toLocaleString()}</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${approvalUrl}" style="background-color: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-right: 10px;">Approve Visit</a>
          <a href="${rejectUrl}" style="background-color: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Reject Visit</a>
        </div>
        
        <p style="color: #666; font-size: 14px;">
          You can also manage this visitor through the <a href="${process.env.NEXTAUTH_URL}/dashboard">dashboard</a>.
        </p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log("Visitor notification email sent successfully")
  } catch (error) {
    console.error("Error sending visitor notification email:", error)
    throw error
  }
}

export async function sendPreRegistrationEmail(
  visitorEmail: string,
  visitorData: {
    fullName: string
    visitDate: string
    hostName: string
    qrCode: string
  },
) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: visitorEmail,
    subject: "Your Visit is Pre-Approved",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Visit Pre-Approved</h2>
        <p>Hello ${visitorData.fullName},</p>
        <p>Your visit has been pre-approved for ${new Date(visitorData.visitDate).toLocaleDateString()}.</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Visit Details</h3>
          <p><strong>Host:</strong> ${visitorData.hostName}</p>
          <p><strong>Date:</strong> ${new Date(visitorData.visitDate).toLocaleDateString()}</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <p>Please show this QR code at reception:</p>
          <div style="background-color: white; padding: 20px; border-radius: 8px; display: inline-block;">
            <img src="data:image/png;base64,${visitorData.qrCode}" alt="QR Code" style="width: 200px; height: 200px;" />
          </div>
        </div>
        
        <p style="color: #666; font-size: 14px;">
          Please arrive on time for your scheduled visit. If you need to reschedule, please contact your host.
        </p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log("Pre-registration email sent successfully")
  } catch (error) {
    console.error("Error sending pre-registration email:", error)
    throw error
  }
}
