import cron from 'node-cron'
import { GET_DB } from '~/config/mongodb'
import { notificationModel } from '~/models/notificationModel'
import { userModel } from '~/models/userModel'
import { BrevoProvider } from '~/providers/BrevoProvider'

// Hằng số cảnh báo trước deadline (5 phút)
const WARNING_THRESHOLD_MS = 5 * 60 * 1000

const formatDateTime = (dateVal) => {
  return new Date(dateVal).toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const startDeadlineCron = () => {
  cron.schedule('*/5 * * * *', async () => {
    try {
      const now = new Date()
      
      const cards = await GET_DB().collection('cards').find({
        deadline: { $ne: null },
        isDone: false,
        isDeadlineSent: { $ne: true },
        _destroy: false
      }).toArray()

      for (const card of cards) {
        const deadlineDate = new Date(card.deadline)
        const diffMs = deadlineDate - now

        if (diffMs <= WARNING_THRESHOLD_MS) {
          // Bỏ qua nếu card không có thành viên nào được gán (theo yêu cầu của user)
          if (!card.memberIds || card.memberIds.length === 0) {
            continue
          }

          // Duyệt qua tất cả các member được gán vào card để gửi thông báo
          for (const memberId of card.memberIds) {
            const user = await userModel.findOneById(memberId.toString())
            if (!user) continue

            // 1. Tạo thông báo in-app (Trong database)
            const notificationPayload = {
              senderId: card.ownerIds?.[0]?.toString() || memberId.toString(), // Sender mặc định là chủ card hoặc chính user
              recipientId: memberId.toString(),
              type: 'CARD_DEADLINE_WARNING',
              boardId: card.boardId.toString(),
              cardId: card._id.toString(),
              title: 'Cảnh báo hạn chót (Deadline)',
              message: `Thẻ "${card.title}" sắp đến hạn deadline vào lúc ${formatDateTime(card.deadline)}`
            }

            const createdNotification = await notificationModel.createNew(notificationPayload)
            const savedNotification = await notificationModel.findOneById(createdNotification.insertedId)

            // 2. Bắn socket realtime nếu user đang online
            if (global.io && savedNotification) {
              global.io.to(`user_${memberId}`).emit('BE_NEW_NOTIFICATION', {
                ...savedNotification,
                sender: {
                  displayName: 'Hệ thống'
                }
              })
            }

            // 3. Gửi email thông báo qua Brevo (Gmail)
            const emailSubject = `[Trello] Cảnh báo: Thẻ "${card.title}" sắp đến hạn deadline!`
            const emailHtml = `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                <h2 style="color: #e74c3c; margin-top: 0;">Cảnh báo Hạn chót (Deadline)</h2>
                <p>Xin chào <strong>${user.displayName || 'Thành viên'}</strong>,</p>
                <p>Thẻ công việc được giao cho bạn trên Trello sắp đến hạn hoàn thành:</p>
                <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #e74c3c; margin: 20px 0;">
                  <p style="margin: 0; font-size: 16px;"><strong>Tên thẻ:</strong> ${card.title}</p>
                  <p style="margin: 5px 0 0 0; font-size: 16px;"><strong>Hạn chót:</strong> <span style="color: #e74c3c; font-weight: bold;">${formatDateTime(card.deadline)}</span></p>
                </div>
                <p>Vui lòng truy cập hệ thống để kiểm tra và hoàn thành công việc đúng tiến độ.</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                <p style="font-size: 12px; color: #7f8c8d; text-align: center;">Đây là email tự động từ hệ thống Trello MERN Stack.</p>
              </div>
            `
            
            try {
              await BrevoProvider.sendEmail(user.email, emailSubject, emailHtml)
            } catch (emailErr) {
              console.error(`Failed to send deadline email to ${user.email}:`, emailErr)
            }
          }

          // Đánh dấu thẻ này đã gửi thông báo deadline để không quét lại nữa
          await GET_DB().collection('cards').updateOne(
            { _id: card._id },
            { $set: { isDeadlineSent: true } }
          )
        }
      }
    } catch (error) {
      console.error('Error running startDeadlineCron:', error)
    }
  })
}
